"""Export private interest records on the host computer; never serve these publicly."""
import argparse
import json
from pathlib import Path
import sqlite3

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--data-dir', type=Path, default=Path(__file__).resolve().parent / '.group-data')
args = parser.parse_args()
database = args.data_dir / 'meals.sqlite3'
if not database.exists():
    parser.exit(message='No group database yet. Start the server and collect a signup first.\n')
with sqlite3.connect(database) as conn:
    exists = conn.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='interests'").fetchone()
    rows = conn.execute('SELECT body FROM interests ORDER BY rowid DESC').fetchall() if exists else []
output = args.data_dir / 'interest-export.json'
output.write_text(json.dumps([json.loads(row[0]) for row in rows], indent=2))
output.chmod(0o600)
print(f'Exported {len(rows)} signup(s) to {output}. Keep this file private.')
