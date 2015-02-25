Users = new Mongo.Collection("users");

if (Meteor.isClient) {
  Session.setDefault("page", "landing");
  Session.setDefault("logged_user", null);

  Template.main.helpers({
    page: function () {
      return Session.get("page");
    },
    page_is: function(page) {
      console.log("page_is "+page+"?");
      return Session.get("page") == page;
    },
    is_logged: function() {
      return Session.get("logged_user") != null;
    }
  });


  Template.debug.helpers({
    users: function() {
      return Users.find();
    },
    current_page: function() {
      return Session.get("page");
    },
    logged_user: function() {
      return Session.get("logged_user");
    }
  })

  Template.debug.events({
    "click #gotolanding": function() {
      Session.set("page", "landing");
    }
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
