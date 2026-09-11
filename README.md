# Plate Pal MVP

Plate Pal tests social meal discovery for college students and recent graduates.

## Public demo

Open **[Plate Pal](https://asalomon715.github.io/Venture-MVP/)**. This replaces the previous MVP at the same address. On GitHub Pages, photos and posts save in each visitor’s browser; they do not sync between people. The shared-feed server is included for same-Wi-Fi group tests. An internet-wide shared feed requires separate backend hosting.

## Run it

- **Personal mode:** open `index.html` in a browser.
- **Group mode:** double-click `Start_Group_Test.command` on a Mac, or run `python3 server.py --host 0.0.0.0` from this folder. Share the group link printed in Terminal with testers on the same Wi-Fi.

See [GROUP_TESTING.md](GROUP_TESTING.md) for instructions, supported photos, and data storage details. This version includes a local shared-feed server, not internet hosting.

## Features

- Post a meal with a display name, a photo preview, and a short description. Ingredients and cooking steps are optional.
- Report calories, protein, carbs, and fat per serving. Unknown values remain blank, and all reported nutrition is labeled self-reported.
- Upload JPG, PNG, or WebP photos up to 15 MB; the app resizes and compresses them before saving.
- Use **Our posts** to browse your creations or your group’s shared meals without the sample posts.
- Search meal names, descriptions, and ingredients. Save favorite meals and join communities.
- Add recipe ingredients to a grocery checklist.
- Use Escape or the backdrop to close dialogs; keyboard focus stays inside an open dialog.

Group posts and photos persist on the host computer in SQLite. Personal-mode posts and photos persist in browser storage. Saving, community choices, groceries, feedback, and event logs are local to each tester’s browser. Earlier personal posts are not automatically uploaded when joining group mode. Use **Refresh group feed** to fetch teammates’ new posts.

## Core hypothesis and decision rule

At least 40% of target users who visit the MVP will complete at least one core action: open a recipe/post, save a meal, join a community, or share a meal.

If at least 40% of 10+ target users complete one or more core actions, continue developing the social meal-discovery concept. Otherwise revise the value proposition or primary user flow before adding premium grocery features.

## Collect test evidence

Use **Export Test Data** in the footer to download each tester’s browser event log. A `visit` is a page load, not a unique tester. Collect and reconcile each tester’s export separately; don’t calculate unique-user conversion from raw page visits. Use a separate browser/profile for each tester.

## Checks

Run `python3 tests/test_group_server.py` for server integration checks. On a Mac with Chrome installed, run `python3 tests/run_browser_checks.py` for photo, nutrition, storage-failure, and cross-browser sharing checks. These use temporary data and disposable browser profiles.
