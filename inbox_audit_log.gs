/**
 * Retrieves all inbox threads and tags them
 * that way, when you accidentally archive something,
 * you can figure out what it was!
 * Requires a label called "☃"
 */
function auditLogInbox() {
  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i++) {
    var label = GmailApp.getUserLabelByName("☃");
    label.addToThread(threads[i]);
  }
};
