if (Meteor.isClient) {

  Template.entryList.helpers({
    entries: function() {
      return Entries.find({}, {sort: {createdAt: -1}, limit: 10});
    }
  });

  Template.entryList.events({
    'click #load-more': function(event) {
      // Not working yet, maybe use meteor-pages plugin?
    }
  });

}
