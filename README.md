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

Group posts and photos persist on the host computer in SQLite. Personal-mode posts and photos persist in browser storage. Saving, community choices, groceries and event logs are local to each tester’s browser. Earlier personal posts are not automatically uploaded when joining group mode. Use **Refresh group feed** to fetch teammates’ new posts.

## Core hypothesis and decision rule

At least 40% of target users who visit the MVP will complete at least one core action: open a recipe/post, save a meal, join a community, or share a meal.

If at least 40% of 10+ target users complete one or more core actions, continue developing the social meal-discovery concept. Otherwise revise the value proposition or primary user flow before adding premium grocery features.

## Collect test evidence

Open `admin.html` directly and use **Export this browser’s test activity** to download each tester’s browser event log. A `visit` is a page load, not a unique tester. Collect and reconcile each tester’s export separately; don’t calculate unique-user conversion from raw page visits. Use a separate browser/profile for each tester.

## Checks

Run `python3 tests/test_group_server.py` for server integration checks. On a Mac with Chrome installed, run `python3 tests/run_browser_checks.py` for photo, nutrition, storage-failure, and cross-browser sharing checks. These use temporary data and disposable browser profiles.

## New discovery and grocery features

Nine sample meals, including six source-linked Plate Pal adaptations inspired by Good Food and Budget Bytes. High Protein is a protein-centered ingredient category, not a verified nutrition claim; Quick Dinners are estimated at 30 minutes or less; Budget Friendly emphasizes pantry staples without claiming live prices. Categories overlap. Adaptations are short cooking outlines; source links provide full quantities and nutrition.

**Scan → grocery list** reads a meal's existing ingredient array (not AI photo recognition). It skips exact case-insensitive duplicates. Check off ingredients and use Clear checked items to remove them from the saved grocery list. Shared posts without ingredients cannot be scanned.

## Private interest collection and GitHub Pages

The customer form records name, email, free/premium interest, contact consent, page URL (excluding the group key), optional `?ref=class` campaign, and a server timestamp in local group mode. The host stores one record per email in SQLite. Run `python3 export_interest.py` on the host to export private JSON inside `.group-data/`; that directory is ignored by Git and never served. There is no public endpoint for reading signups. The group server remains intended for private Wi-Fi testing.

For the public GitHub Pages site:

1. Create a form in your form provider (the client supports Formspree's JSON submission interface).
2. Put its HTTPS form endpoint into `interestEndpoint` in `config.js`. This is a public submission URL, never a private API key.
3. Publish `index.html`, `style.css`, `script.js`, `config.js`, `admin.html`, and `admin.js` together at the site's root. This edit does not publish to GitHub automatically.
4. Submit a test signup and check the provider's private dashboard. Enable the provider's domain/spam controls.

Until an endpoint is configured, public visitors receive an explicit unavailable message; the app does not pretend their email was collected. No names or emails are stored in public GitHub files. `admin.html` is a separate owner-tools page, not an authenticated dashboard; it only exports activity stored in the current browser and explains where private signup records live.

## Premium shopping demo and sponsored feature

The interface assumes a Plate Pal Plus member. **My groceries** jumps to the saved list; **Shop with Instacart** opens a simulated store selector for ALDI, Kroger, Target and Whole Foods. Unchecked ingredients appear in the basket, and removal updates the saved list. Store selection and basket confirmation are mock interactions: no retailer API, payment, product pricing or order is involved. Store names are illustrative, not verified availability or affiliations.

The top sponsored section uses fictional Harvest Table branding and an original 12-second animated cooking video (`featured-demo.webm`). Native controls support playback and seeking. View recipe, save meal and shop ingredients connect to the existing chicken-and-hummus recipe and saved groceries. Video plays, featured saves and basket actions appear in the existing local event log. This demonstrates paid restaurant/brand placement; it does not sell or charge for an advertising slot.

Include `featured-demo.webm` with the static files when publishing. A real partner can replace the animation with a licensed cooking video and update the HTML source and sponsor copy. No price-interest CTA or coming-soon grocery message is displayed.
