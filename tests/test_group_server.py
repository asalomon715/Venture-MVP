"""Run with python3 tests/test_group_server.py. Uses only temporary data."""
import importlib.util
import json
from pathlib import Path
import sqlite3
import tempfile
import threading
import unittest
from urllib.error import HTTPError
from urllib.request import Request, urlopen

spec = importlib.util.spec_from_file_location('plate_server', Path(__file__).resolve().parents[1] / 'server.py')
app = importlib.util.module_from_spec(spec)
spec.loader.exec_module(app)

class GroupTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.database = Path(self.temp.name) / 'meals.sqlite3'
        with sqlite3.connect(self.database) as conn:
            conn.execute('CREATE TABLE meals (id TEXT PRIMARY KEY, body TEXT NOT NULL)')
        self.server = app.ThreadingHTTPServer(('127.0.0.1', 0), app.make_handler(self.database, 'test-key'))
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.url = 'http://127.0.0.1:' + str(self.server.server_port)
        self.meal = {'id':'local-test', 'title':'Lunch', 'description':'Rice bowl', 'user':'Tester', 'tag':'college', 'ingredients':[], 'instructions':[], 'macros':{'protein':0, 'carbs':None, 'fat':12.5}, 'serving':'1 bowl', 'image':''}

    def tearDown(self):
        self.server.shutdown(); self.server.server_close(); self.thread.join(); self.temp.cleanup()

    def request(self, path='/api/meals', body=None, key='test-key'):
        req = Request(self.url + path, data=json.dumps(body).encode() if body is not None else None,
                      headers={'X-Group-Key': key, 'Content-Type':'application/json'})
        try:
            with urlopen(req, timeout=3) as response:
                return response.status, json.load(response)
        except HTTPError as error:
            return error.code, json.load(error)

    def test_shared_post_persists_and_retry_is_idempotent(self):
        self.assertEqual(self.request(body=self.meal)[0], 201)
        self.assertEqual(self.request(body=self.meal)[0], 200)
        posts = self.request()[1]['meals']
        self.assertEqual(len(posts), 1)
        self.assertEqual(posts[0]['macros']['protein'], 0)
        self.assertIsNone(posts[0]['macros']['carbs'])
        with sqlite3.connect(self.database) as conn:
            self.assertEqual(conn.execute('SELECT count(*) FROM meals').fetchone()[0], 1)

    def test_read_and_write_require_group_key(self):
        self.assertEqual(self.request(key='wrong')[0], 401)
        self.assertEqual(self.request(body=self.meal, key='wrong')[0], 401)

    def test_database_and_paths_are_not_served(self):
        for path in ['/.group-data/meals.sqlite3', '/server.py', '/../server.py', '/%2e%2e/server.py']:
            self.assertEqual(self.request(path)[0], 404)

    def test_macro_validation(self):
        for value in [-1, 1001, '3', True, float('nan'), float('inf')]:
            self.meal['macros']['protein'] = value
            self.assertEqual(self.request(body=self.meal)[0], 400)

    def test_image_validation(self):
        for image in ['https://example.com/x.jpg', 'data:image/jpeg;base64,AAAA', 'data:image/svg+xml;base64,AAAA', 'x'*900001]:
            self.meal['image'] = image
            self.assertEqual(self.request(body=self.meal)[0], 400)

    def test_required_fields_and_payload_shape(self):
        for body in [[], {}, dict(self.meal, user=' '), dict(self.meal, tag=[]), dict(self.meal, instructions=[3])]:
            self.assertEqual(self.request(body=body)[0], 400)

if __name__ == '__main__':
    unittest.main()
