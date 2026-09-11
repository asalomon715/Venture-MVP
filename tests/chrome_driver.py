"""Minimal local Chrome DevTools client; no third-party test dependencies."""
import base64
import json
import os
import socket
import struct
from urllib.parse import urlsplit

class ChromeDriver:
    def __init__(self, url):
        parsed = urlsplit(url)
        self.sock = socket.create_connection((parsed.hostname, parsed.port), timeout=5)
        nonce = base64.b64encode(os.urandom(16)).decode()
        request = f'GET {parsed.path} HTTP/1.1\r\nHost: {parsed.netloc}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {nonce}\r\nSec-WebSocket-Version: 13\r\n\r\n'
        self.sock.sendall(request.encode())
        header = b''
        while not header.endswith(b'\r\n\r\n'):
            header += self.exact(1)
        if not header.startswith(b'HTTP/1.1 101'):
            raise RuntimeError('Chrome websocket upgrade failed')
        self.request_id = 0

    def exact(self, count):
        result = b''
        while len(result) < count:
            chunk = self.sock.recv(count - len(result))
            if not chunk:
                raise RuntimeError('Chrome closed the connection')
            result += chunk
        return result

    def send(self, payload, opcode=1):
        mask = os.urandom(4)
        length = len(payload)
        header = bytes([0x80 | opcode])
        if length < 126:
            header += bytes([0x80 | length])
        elif length < 65536:
            header += bytes([0x80 | 126]) + struct.pack('!H', length)
        else:
            header += bytes([0x80 | 127]) + struct.pack('!Q', length)
        self.sock.sendall(header + mask + bytes(b ^ mask[i % 4] for i, b in enumerate(payload)))

    def receive(self):
        message = b''
        while True:
            first, second = self.exact(2)
            length = second & 127
            if length == 126:
                length = struct.unpack('!H', self.exact(2))[0]
            elif length == 127:
                length = struct.unpack('!Q', self.exact(8))[0]
            mask = self.exact(4) if second & 128 else None
            payload = self.exact(length)
            if mask:
                payload = bytes(b ^ mask[i % 4] for i, b in enumerate(payload))
            opcode = first & 15
            if opcode == 9:
                self.send(payload, 10)
                continue
            if opcode == 8:
                raise RuntimeError('Chrome websocket closed')
            message += payload
            if first & 128:
                return json.loads(message)

    def call(self, method, params=None):
        self.request_id += 1
        self.send(json.dumps({'id':self.request_id, 'method':method, 'params':params or {}}).encode())
        while True:
            response = self.receive()
            if response.get('id') == self.request_id:
                if 'error' in response:
                    raise RuntimeError(str(response['error']))
                return response.get('result', {})

    def evaluate(self, expression):
        response = self.call('Runtime.evaluate', {'expression':expression, 'returnByValue':True})
        if 'exceptionDetails' in response:
            raise RuntimeError(str(response['exceptionDetails']))
        return response.get('result', {}).get('value')

    def close(self):
        self.sock.close()
