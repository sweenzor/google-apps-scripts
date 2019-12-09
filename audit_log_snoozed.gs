/**
 * Retrieves all snoozed threads and tags them
 * Tracking what you snoozed
 * Requires a label called "system/snooze-audit-log"
 */
function auditLogSnoozed() {
  var query = 'in:snoozed';
  var batch = 100
  var threads = GmailApp.search(query);
  for (var i = 0; i < threads.length; i+=batch) {
    var label = GmailApp.getUserLabelByName("system/snooze-audit-log");
    label.addToThreads(threads.slice(i, i+batch));
  }
};
