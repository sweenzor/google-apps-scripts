/**
 * Retrieves all inbox threads and tags them.
 * That way, when you accidentally archive something, you can figure out what it was!
 * Requires a label called "system/inbox-today"
 * Runs every minute.
 */
function auditLogInboxToday() {
  var batch = 100
  var threads = GmailApp.getInboxThreads();
  var label_today = GmailApp.getUserLabelByName("system/inbox-today");
  for (var i = 0; i < threads.length; i+=batch) {
    label_today.addToThreads(threads.slice(i, i+batch));
  }
  Logger.log("Added inbox-today labels to %s threads", threads.length);
};

/**
 * Tags everything labeled "inbox-today" with "inbox-audit-log".
 * Keep a univerial audit log, even with today/yesterday juggling.
 * Runs every 30 minutes.
 */
function auditLogInbox() {
  var batch = 100
  var label_today = GmailApp.getUserLabelByName("system/inbox-today");
  var label_audit_log = GmailApp.getUserLabelByName("system/inbox-audit-log");
  var label_yesterday = GmailApp.getUserLabelByName("system/inbox-yesterday");
  var threads = label_today.getThreads();
  for (var i = 0; i < threads.length; i+=batch) {
    label_audit_log.addToThreads(threads.slice(i, i+batch));
    label_yesterday.removeFromThreads(threads.slice(i, i+batch));
  }
  Logger.log("Added inbox-audit-log labels to %s threads", threads.length);

};

/**
 * Process the record of everything that was in the inbox in the last 24 hours.
 * Includes stale threads from weeks ago that you finally archived, etc.
 * Runs once daily
 * Removes the "inbox-yesterday" tags from everything
 * Things tagged "inbox-today" which are no longer in the inbox
 * > Get the "inbox-today" tag removed
 * > Get added to "inbox-yesterday"
 */
function auditLogCleanup() {
  var batch = 100
  var label_yesterday = GmailApp.getUserLabelByName("system/inbox-yesterday");
  var label_today = GmailApp.getUserLabelByName("system/inbox-today");
  var label_audit_log = GmailApp.getUserLabelByName("system/inbox-audit-log");

  var threads = label_yesterday.getThreads();
  Logger.log("Clearing %s threads from inbox-yesterday", threads.length);
  for (var i = 0; i < threads.length; i+=batch) {
    label_yesterday.removeFromThreads(threads.slice(i, i+batch));
    label_audit_log.addToThreads(threads.slice(i, i+batch));
  }
  
  var threads = label_today.getThreads();
  Logger.log("Moving %s threads from inbox-today to inbox-yesterday", threads.length);
  for (var i = 0; i < threads.length; i+=batch) {
    label_yesterday.addToThreads(threads.slice(i, i+batch));
    label_today.removeFromThreads(threads.slice(i, i+batch));
    label_audit_log.addToThreads(threads.slice(i, i+batch));
  }
};
