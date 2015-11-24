var query = 'label:logs older_than:15d';

function purgeLogs() {

  // Check how many threads match query
  var threads = GmailApp.search(query);
  Logger.log(threads.length);
  
  // Delete in batches of 100
  while (threads.length > 0) {
    var threads = GmailApp.search(query, 0, 100);
    GmailApp.moveThreadsToTrash(threads);
    Logger.log(threads.length);
  }

}
