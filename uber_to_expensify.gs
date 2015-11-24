function forwardToExpensify() {

  // Get threads that match query
  var query = 'subject:"trip with uber" from:*uber.com business is:unread';
  var threads = GmailApp.search(query);

  for (i = 0; i < threads.length; i++) {

    var thread = threads[i]
    Logger.log(thread.getFirstMessageSubject());

    // Forward any messages that are unread, and haven't already been forwarded
    if (thread.getMessageCount() == 1) {
      var message = thread.getMessages()[0];
      message.forward('receipts@expensify.com');
      thread.markRead()
      thread.moveToArchive()
    }

  }

}
