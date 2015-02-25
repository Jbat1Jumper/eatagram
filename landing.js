if (Meteor.isClient) {
  Template.landing_page.events({
    'click #login_btn': function () {
      console.log("Imma trying to login?");
      console.log(Session);
      Session.set("page", "login");
    },
    'click #register_btn': function () {
      console.log("Registar, yeah, try if you can");
      Session.set("page", "register");
    }
  });
}