
if (Meteor.isClient) {

  Template.addEntry.events({
    'submit #add-entry': function (event) {

      Entries.insert({
        summary: event.target.summary.value,
        createdAt: new Date(),
        userId: Meteor.userId()
      });

      event.target.summary.value = '';
      return false;
    }
  })

}
