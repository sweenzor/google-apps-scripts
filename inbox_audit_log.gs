/**
 * Retrieves all inbox threads and tags them
 * that way, when you accidentally archive something,
 * you can figure out what it was!
 * Requires a label called "☃"
 */
function auditLogInbox() {
  var batch = 100
  var threads = GmailApp.getInboxThreads();
  for (var i = 0; i < threads.length; i+=batch) {
    var label = GmailApp.getUserLabelByName("☃");
    label.addToThreads(threads.slice(i, i+batch));
  }
};
