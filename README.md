# AutoYTPlaylist
google app script for spread sheet to add videos to YT playlsit automatically
features:
* specify channels
* scan for all your subscribed channels
* filtering by keywords

## How to use
1. create a google spreadsheet
2. note the column name in the cells A1:D1 as
    Channel Name | Channel ID | Playlist ID | Search Query
    -- | -- | -- | --
3. **`extensions`**>**`App Script****>this should open a new tab
4. click the [+] on the right of [service] around left-side of the page
5. scroll down and select Youtube Data API v3 > [add]
6. click the [+] on the right of [file] around left-top of the page
7. copy-paste the content of `timeTrigger.gs` to replace the template in the editor
- a. if you would like to get videos from all your subscribbed channels
  1. again, click the [+] on the right of [file] around left-top of the page
  2. copy-paste the content of `manualTrigger.gs` to replace the template in the editor
  3. click 🖬(save) icon 
  4. in the droplist next to **`debug`**, select `getSubscribedChannels`
  5. click ▶️**`run`** (now you have a channelID list of your subscribed channels in the column B)
  6. select `getChannelName` in the droplist and run (now the corresponding channel names in the column A)
  7. switch to **`code4sheet1.gs`** from the file list on left
- b. if you would like to choose the channels by yourself

8. you should found 2 appearence of "シート1" in the code, change them to your sheet name (ex: sheet1, 工作表1...)
9. select `getChannelName` in the droplist and run
10. create/open a YT playlist and copy the part of URL **after** "https://www.youtube.com/playlist?list="
11. paste below **`Playlist ID`** (cell C2) in spreadsheet
12. decide your keywords for all the channels listed at col(A), put them in col(D)
13. back to app script windwon, select `addNewVideosToPlaylist2` in the droplist and run

* you should met some warning and request for authority to access your spreadsheet and YT account during your first runs, please accept them 

## How to run automatically

1. In the Google Apps Script editor, click on the "Triggers" icon (clock-shaped) on the left sidebar.
2. Click on the "Add Trigger" button at the bottom right corner of the page.
3. In the dialog that appears, configure the trigger as follows:
    * Choose the addNewVideosToPlaylist2 function from the "Run" dropdown menu.
    * Select the event source as "Time-driven."
    * Choose the time interval you prefer (e.g., every day, every hour, etc.).
    * Click the "Save" button to create the trigger.
4. You might be asked to authorize the script and grant necessary permissions. Follow the prompts to provide the required permissions.
