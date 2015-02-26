Users = new Mongo.Collection("users");

if (Meteor.isClient) {
  Session.setDefault("page", "landing");
  Session.setDefault("loggedUser", null);

  Template.main.helpers({
    page: function () {
      return Session.get("page");
    },
    pageIs: function(page) {
      console.log("page_is "+page+"?");
      return Session.get("page") == page;
    },
    isLogged: function() {
      return Session.get("loggedUser") != null;
    }
  });


  Template.debug.helpers({
    users: function() {
      return Users.find();
    },
    currentPage: function() {
      return Session.get("page");
    },
    loggedUser: function() {
      return Session.get("loggedUser");
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
