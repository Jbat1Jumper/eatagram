
if (Meteor.isClient) {

  Template.addEntry.events({
    'submit #add-entry': function (event) {

      Entries.insert({
        summary: event.target.summary.value,
        createdAt: new Date(),
        userId: Meteor.userId(),
        userName: Meteor.user().profile.name,
        comments: []
      });

      event.target.summary.value = '';
      return false;
    }
  })

}
