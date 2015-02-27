if (Meteor.isClient) {

  Template.entryList.helpers({
    entries: function() {
      return Entries.find({});
    }
  });

}
