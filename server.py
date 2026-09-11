#!/usr/bin/env python3
"""Small, private-Wi-Fi Plate Pal test server. Python standard library only."""
import argparse
import base64
import binascii
import hmac
import json
import math
import os
from pathlib import Path
import secrets
import socket
import sqlite3
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent
STATIC = {'/': ('index.html', 'text/html; charset=utf-8'),
          '/index.html': ('index.html', 'text/html; charset=utf-8'),
          '/script.js': ('script.js', 'text/javascript; charset=utf-8'),
          '/style.css': ('style.css', 'text/css; charset=utf-8')}
TAGS = {'college': 'College Meal', 'protein': 'High Protein', 'quick': 'Quick Dinner'}


def validate_meal(value):
    if not isinstance(value, dict):
        raise ValueError('A meal must be a JSON object.')
    def text(name, limit, required=False):
        result = value.get(name, '')
        if not isinstance(result, str) or len(result) > limit or (required and not result.strip()):
            raise ValueError(f'Please check the {name} field.')
        return result.strip()
    meal = {name: text(name, limit, required) for name, limit, required in
            [('id', 100, True), ('title', 100, True), ('description', 600, True),
             ('user', 40, True), ('serving', 80, False)]}
    if not meal['id'].startswith('local-'):
        raise ValueError('Invalid post identifier.')
    for name, maximum in [('ingredients', 1500), ('instructions', 4000)]:
        items = value.get(name, [])
        if not isinstance(items, list) or len(items) > 100 or any(not isinstance(x, str) for x in items):
            raise ValueError(f'Please check the {name}.')
        if sum(len(x) for x in items) > maximum:
            raise ValueError(f'The {name} are too long.')
        meal[name] = [x.strip() for x in items if x.strip()]
    tag = value.get('tag')
    if not isinstance(tag, str) or tag not in TAGS:
        raise ValueError('Choose a valid community.')
    meal.update(tag=tag, tagLabel=TAGS[tag], location='Our group')
    macros = value.get('macros', {})
    if not isinstance(macros, dict):
        raise ValueError('Please check the nutrition fields.')
    meal['macros'] = {}
    for name in ['calories', 'protein', 'carbs', 'fat']:
        number = macros.get(name)
        if number is not None and (type(number) not in (int, float) or not math.isfinite(number)
                                   or not 0 <= number <= (10000 if name == 'calories' else 1000)):
            raise ValueError(f'Please enter a valid {name} value or leave it blank.')
        meal['macros'][name] = number
    photo = value.get('image', '')
    if not isinstance(photo, str) or len(photo) > 900000:
        raise ValueError('Choose a smaller photo.')
    if photo:
        if not photo.startswith('data:image/jpeg;base64,'):
            raise ValueError('The photo must be processed by the upload form.')
        try:
            raw = base64.b64decode(photo.split(',', 1)[1], validate=True)
        except (binascii.Error, ValueError):
            raise ValueError('The photo could not be read.')
        if not raw.startswith(b'\xff\xd8\xff') or not raw.endswith(b'\xff\xd9'):
            raise ValueError('The photo could not be read.')
    meal['image'] = photo
    return meal


def make_handler(database, group_key, group_origin=None):
    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *_):
            pass

        def respond(self, status, data, content_type='application/json'):
            if isinstance(data, (dict, list)):
                data = json.dumps(data, allow_nan=False).encode()
            self.send_response(status)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(data)))
            self.send_header('Cache-Control', 'no-store')
            self.send_header('X-Content-Type-Options', 'nosniff')
            self.send_header('Referrer-Policy', 'no-referrer')
            self.send_header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://images.unsplash.com; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'")
            self.end_headers()
            self.wfile.write(data)

        def authorized(self):
            candidate = self.headers.get('X-Group-Key', '')
            if not hmac.compare_digest(candidate.encode(), group_key.encode()):
                self.respond(401, {'error': 'Use the full group link printed by the host’s server.'})
                return False
            return True

        def do_GET(self):
            path = urlsplit(self.path).path
            if path == '/api/status':
                return self.respond(200, {'groupServer': True, 'groupOrigin': group_origin})
            if path == '/api/meals':
                if not self.authorized():
                    return
                with sqlite3.connect(database) as connection:
                    rows = connection.execute('SELECT body FROM meals ORDER BY rowid DESC').fetchall()
                return self.respond(200, {'meals': [json.loads(row[0]) for row in rows]})
            if path in STATIC:
                name, mime = STATIC[path]
                return self.respond(200, (ROOT / name).read_bytes(), mime)
            self.respond(404, {'error': 'Not found.'})

        def do_POST(self):
            if urlsplit(self.path).path != '/api/meals':
                return self.respond(404, {'error': 'Not found.'})
            if not self.authorized():
                return
            if self.headers.get('Content-Type', '').split(';')[0] != 'application/json':
                return self.respond(415, {'error': 'Expected a JSON post.'})
            try:
                size = int(self.headers.get('Content-Length', '0'))
                if not 0 < size <= 1000000:
                    return self.respond(413, {'error': 'The post is too large. Choose a smaller photo.'})
                self.connection.settimeout(15)
                meal = validate_meal(json.loads(self.rfile.read(size)))
                with sqlite3.connect(database, timeout=15) as connection:
                    connection.execute('BEGIN IMMEDIATE')
                    existing = connection.execute('SELECT body FROM meals WHERE id = ?', (meal['id'],)).fetchone()
                    if existing:
                        return self.respond(200, {'meal': json.loads(existing[0])})
                    if connection.execute('SELECT count(*) FROM meals').fetchone()[0] >= 200:
                        return self.respond(409, {'error': 'This test feed has reached its 200-post limit. Ask your host to start a new test.'})
                    connection.execute('INSERT INTO meals (id, body) VALUES (?, ?)',
                                       (meal['id'], json.dumps(meal, allow_nan=False)))
                self.respond(201, {'meal': meal})
            except (ValueError, UnicodeError) as error:
                self.respond(400, {'error': str(error) or 'Please check your post.'})
            except (sqlite3.Error, OSError):
                self.respond(503, {'error': 'The server could not save your post. Keep your draft and try again.'})
    return Handler


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--host', default='127.0.0.1')
    parser.add_argument('--port', type=int, default=8765)
    parser.add_argument('--data-dir', type=Path, default=ROOT / '.group-data')
    args = parser.parse_args()
    args.data_dir.mkdir(mode=0o700, parents=True, exist_ok=True)
    key_file = args.data_dir / 'group-key.txt'
    if not key_file.exists():
        key_file.write_text(secrets.token_urlsafe(24))
        os.chmod(key_file, 0o600)
    key = key_file.read_text().strip()
    database = args.data_dir / 'meals.sqlite3'
    with sqlite3.connect(database) as connection:
        connection.execute('CREATE TABLE IF NOT EXISTS meals (id TEXT PRIMARY KEY, body TEXT NOT NULL)')
    group_origin = None
    if args.host == '0.0.0.0':
        try:
            with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
                sock.connect(('192.0.2.1', 80))
                address = sock.getsockname()[0]
            group_origin = f'http://{address}:{args.port}'
        except OSError:
            pass
    server = ThreadingHTTPServer((args.host, args.port), make_handler(database, key, group_origin))
    print(f'Plate Pal is running. Keep this window open. Stop with Control-C.\nOn this computer: http://localhost:{args.port}/#group={key}', flush=True)
    if group_origin:
        print(f'Group link (same Wi-Fi): {group_origin}/#group={key}', flush=True)
    elif args.host == '0.0.0.0':
        print(f'Use your computer’s Wi-Fi IP address with port {args.port} and the same #group key.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\nPlate Pal stopped. Posts are saved for next time.')
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
