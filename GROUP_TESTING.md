# Test Plate Pal with your group

## Public GitHub link

The demo is at https://asalomon715.github.io/Venture-MVP/. Anyone can open it to try photo posting and nutrition fields. Those posts stay in that person’s browser. For everyone to see each other’s posts, use the shared server below; GitHub Pages cannot run it.

## Shared feed on the same Wi-Fi

1. On the host Mac, double-click **Start_Group_Test.command**. Alternatively, open Terminal in this folder and run `python3 server.py --host 0.0.0.0`. Python 3 is required.
2. Keep the Terminal window open. Copy the **Group link (same Wi-Fi)** it prints, including the `#group=...` part, and send it to your group.
3. Everyone connects to the same Wi-Fi and opens that full link in their browser. If macOS asks whether Python can accept incoming connections, allow it for this test.
4. Select **Share a Meal**, enter a display name, upload a food picture, and add a title and description. Ingredients, steps, serving size, calories, protein, carbs, and fat are optional.
5. Post the meal. Other testers select **Refresh group feed** to see it. **Our posts** hides the sample recipes.
6. Try saving a teammate’s meal, opening the photo and nutrition details, and submitting feedback. Each tester can use **Export Test Data** to download their browser’s action log.
7. Press **Control-C** in the host’s Terminal to stop. Restarting the server keeps the group’s posts.

The host computer must stay awake and connected. Some campus/guest networks block connections between devices; use a private Wi-Fi network or hotspot that permits device-to-device connections if the link won’t open. A localhost link works only on the host computer. This is a local group test, not an internet-hosted app; it does not work across different networks.

## Photos and nutrition

- JPG, PNG, and WebP photos up to 15 MB are supported. Export HEIC photos as JPG before selecting them.
- Photos are resized to at most 960 pixels on the longest side and re-encoded as JPEG before saving. The original file is unchanged.
- Macro values describe **one serving**. Zero is a real value; leaving a field blank means it was not reported.
- Nutrition is entered by the poster and labeled **self-reported**. The app does not estimate nutrition from pictures.
- Recipe ingredients and steps are optional for quick food-photo posts.

## Where the data goes

Shared posts, compressed photos, and nutrition are stored in `.group-data/meals.sqlite3` on the host computer. Only the app assets are served; the database and group key file cannot be downloaded through the server. The group link is the shared access key: anyone who has it and can reach the host can read and add posts. Display names are not verified accounts. Use a trusted local network; the test server uses HTTP.

Saved meals, community selections, grocery checklists, feedback, and event logs remain in each tester’s browser. Photos posted in personal/file mode do not automatically upload to the group. This avoids sharing earlier drafts unexpectedly.

The server allows up to 200 posts per test. Stop the server and move `.group-data` to a separate backup location to start a fresh feed and generate a fresh link. Back up that folder to preserve the old feed. Don’t include it when sharing the app’s ZIP.

## Personal testing

Open `index.html` directly for a solo test. Photos and posts save in that browser’s local storage. If storage is full or unavailable, the app keeps the draft and explains that saving failed. Use the group server for longer testing sessions.
