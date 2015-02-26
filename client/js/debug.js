
if (Meteor.isClient) {

  Template.debug.helpers({
    users: function() {
      return Users.find();
    },
    currentPage: function() {
      return Session.get("page");
    },
  });

  Template.debug.events({
    "click #gotolanding": function() {
      Session.set("page", "landing");
    }
  });

}
