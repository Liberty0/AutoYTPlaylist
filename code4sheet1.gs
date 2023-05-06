function getChannelName() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1")
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  for (var i = 1; i < data.length; i++) {
    // get channel name from channelID recorded in column B
    var channelId = data[i][1];

    var channelResponse = YouTube.Channels.list('snippet', { id: channelId });
    var channelName = channelResponse.items[0].snippet.title;
    Logger.log(channelName)

    // Update the channelName in the spreadsheet column A
    sheet.getRange(i+1, 1, 1, 1).setValue(channelName);
  }
}

function addNewVideosToPlaylist2() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート1")
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var playlistId = data[1][2]; // activate if playlist to add is fixed
  Logger.log(playlistId)

  for (var i = 1; i < data.length; i++) {
    var channelId = data[i][1];
    //var playlistId = data[i][2]; // activate if playlist to add is changing
    var searchQuery = data[i][3];

    // get channel name from channelID
    var channelResponse = YouTube.Channels.list('snippet', { id: channelId });
    var channelName = channelResponse.items[0].snippet.title;
    Logger.log(channelName)

    // get videos uploaded in recent [NDays] days
    var NDays = 1;
    var now = new Date();
    var NDaysAgo = new Date(now.getTime() - (NDays * 24 * 60 * 60 * 1000));
    var searchResponse = YouTube.Search.list('id,snippet', {
      channelId: channelId,
      type: 'video',
      order: 'date',
      publishedAfter: NDaysAgo.toISOString(),
      maxResults: 15
    });

    var videoIds = [];
    for (var j = 0; j < searchResponse.items.length; j++) {
      var videoTitle = searchResponse.items[j].snippet.title.toLowerCase();
      if (videoTitle.includes(searchQuery.toLowerCase())) {
        var videoId = searchResponse.items[j].id.videoId;
        videoIds.push(videoId);
      }
    }

    var part = 'snippet'

    for (var k = 0; k < videoIds.length; k++) {
      var resource = {
        'snippet': {
          playlistId: playlistId,
          resourceId: {
            kind: 'youtube#video',
            videoId: videoIds[k]
          },
          position: 0
        }
      };

      Logger.log(videoIds[k])

      if (videoIds.length > 0) { // check if videoIds is not empty
        YouTube.PlaylistItems.insert(resource, part);
      }
    }
  }
}
