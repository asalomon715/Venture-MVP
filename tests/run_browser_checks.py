"""Real Chrome checks with disposable profiles, a temporary database, and no user data."""
import importlib.util
import base64
import os
from pathlib import Path
import shutil
import signal
import sqlite3
import subprocess
import tempfile
import threading
import time
import json
from urllib.request import urlopen
from chrome_driver import ChromeDriver

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('plate_server', ROOT / 'server.py')
app = importlib.util.module_from_spec(spec)
spec.loader.exec_module(app)
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

with tempfile.TemporaryDirectory(prefix='plate-pal-browser-') as temp:
    temp = Path(temp)
    for name in ['index.html', 'script.js', 'style.css']:
        shutil.copy(ROOT / name, temp / name)
    shutil.copy(ROOT / 'tests/browser-check.js', temp / 'check.js')
    page = temp / 'index.html'
    page.write_text(page.read_text().replace('</body>', '<script src="check.js"></script></body>'))
    app.ROOT = temp
    app.STATIC['/check.js'] = ('check.js', 'text/javascript; charset=utf-8')
    database = temp / 'test.sqlite3'
    with sqlite3.connect(database) as conn:
        conn.execute('CREATE TABLE meals (id TEXT PRIMARY KEY, body TEXT NOT NULL)')
    server = app.ThreadingHTTPServer(('127.0.0.1', 0), app.make_handler(database, 'test-key'))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    try:
        for mode in ['personal', 'writer', 'reader']:
            url = page.as_uri() if mode == 'personal' else f'http://127.0.0.1:{server.server_port}/?test={mode}#group=test-key'
            profile = temp / mode
            command = [CHROME, '--headless', '--no-sandbox', '--disable-gpu', '--disable-background-networking',
                       '--disable-component-update', '--no-first-run', '--no-default-browser-check',
                       '--host-resolver-rules=MAP images.unsplash.com ~NOTFOUND', '--remote-debugging-port=0',
                       f'--user-data-dir={profile}', url]
            proc = subprocess.Popen(command, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
            driver = None
            try:
                deadline = time.monotonic() + 45
                while not (profile / 'DevToolsActivePort').exists():
                    if time.monotonic() > deadline: raise RuntimeError('Chrome did not start')
                    time.sleep(.1)
                port = (profile / 'DevToolsActivePort').read_text().splitlines()[0]
                while True:
                    with urlopen(f'http://127.0.0.1:{port}/json') as response:
                        targets = json.load(response)
                    pages = [x for x in targets if x.get('type') == 'page']
                    if pages: break
                    if time.monotonic() > deadline: raise RuntimeError('Chrome page did not start')
                    time.sleep(.1)
                driver = ChromeDriver(pages[0]['webSocketDebuggerUrl'])
                result = None
                while not result and time.monotonic() < deadline:
                    result = driver.evaluate('window.plateTestResult || null')
                    if not result: time.sleep(.2)
                output = driver.evaluate('document.documentElement.outerHTML')
                (Path('/tmp') / f'plate-pal-{mode}-checks.html').write_text(output)
                if not result: raise RuntimeError(f'{mode}: checks did not finish')
                print(mode + ':\n' + result, flush=True)
                if mode == 'personal' and 'FAIL ' not in result:
                    driver.call('Page.navigate', {'url': (ROOT / 'index.html').as_uri()})
                    for _ in range(100):
                        if driver.evaluate("document.readyState === 'complete' && !window.plateTestResult && typeof showModal === 'function'"): break
                        time.sleep(.05)
                    driver.call('Emulation.setDeviceMetricsOverride', {'width':390, 'height':844, 'deviceScaleFactor':1, 'mobile':True})
                    driver.evaluate("showModal('shareModal')")
                    if driver.evaluate('document.documentElement.scrollWidth > innerWidth'):
                        raise RuntimeError('Mobile page overflows horizontally')
                    image = driver.call('Page.captureScreenshot', {'format':'png'})
                    Path('/tmp/plate-pal-photo-form-mobile.png').write_bytes(base64.b64decode(image['data']))
                    driver.evaluate("document.querySelector('#shareModal .modal-card').scrollTop = 900")
                    image = driver.call('Page.captureScreenshot', {'format':'png'})
                    Path('/tmp/plate-pal-macros-mobile.png').write_bytes(base64.b64decode(image['data']))

            finally:
                if driver: driver.close()
                os.killpg(proc.pid, signal.SIGTERM)
                proc.wait(timeout=5)
            if 'FAIL ' in result:
                raise RuntimeError(mode + ' checks failed')
    finally:
        server.shutdown(); server.server_close(); thread.join()
