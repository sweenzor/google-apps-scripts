/**
 * Retrieves all inbox threads and tags them
 * that way, when you accidentally archive something,
 * you can figure out what it was!
 */
function auditLogInbox() {
  var threads = GmailApp.getInboxThreads();
  var label = GmailApp.getUserLabelByName("☃");
  label.addToThreads(threads);
};
