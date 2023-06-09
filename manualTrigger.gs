function getSubscribedChannels() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('シート2');
  var channelIds = [];
  var pageToken = '';

  // retrieve all pages of subscribed channels
  do {
    var subscriptionResponse = YouTube.Subscriptions.list('snippet', {
      mine: true,
      //order: 'alphabetical',
      maxResults: 50,
      pageToken: pageToken
    });
    var subscriptions = subscriptionResponse.items;
    for (var i = 0; i < subscriptions.length; i++) {
      var subscription = subscriptions[i];
      var resourceId = subscription.snippet.resourceId;
      if (resourceId.kind == 'youtube#channel') {
        var channelId = resourceId.channelId;
        channelIds.push([channelId]);
      }
    }
    pageToken = subscriptionResponse.nextPageToken;
  } while (pageToken);

  var range = sheet.getRange(2, 2, channelIds.length, 1); // Start writing from cell B2
  range.setValues(channelIds);
}

function getChannelName() {
  var sheet = SpreadsheetApp.getActiveSheet()
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var channelIds = [];
  for (var i = 1; i < data.length; i++) {
    // get channel name from channelID recorded in column B
    var channelId = data[i][1];

    var channelResponse = YouTube.Channels.list('snippet', { id: channelId });
    var channelName = channelResponse.items[0].snippet.title;
    Logger.log(channelName)

    // Update the channelName in the spreadsheet column A
    sheet.getRange(i + 1, 1, 1, 1).setValue(channelName);

    channelIds.push([channelId])
  }
}

function getChannelNameBatch() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("シート2");
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();

  var channelIds = [];
  for (var i = 1; i < data.length; i++) {
    channelIds.push(data[i][1]);
  }
  Logger.log(channelIds)
  var channelNames = [];
  var batchSize = 50; // Maximum batch size is 50
  for (var i = 0; i < channelIds.length; i += batchSize) {
    var batchIds = channelIds.slice(i, i + batchSize).join(",");
    var channelResponse = YouTube.Channels.list('snippet', { id: batchIds });
    for (var j = 0; j < channelResponse.items.length; j++) {
      channelNames.push(channelResponse.items[j].snippet.title);
    }
  }
  Logger.log(channelNames)

  // Update the channel names in the spreadsheet
  for (var i = 0; i < channelNames.length; i++) {
    sheet.getRange(i + 1, 1, 1, 1).setValue(channelNames[i]);
  }
}