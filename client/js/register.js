if (Meteor.isClient) {
  Template.register.events({
    'click #goback': function () {
      Session.set("page", "landing");
    },
    'click #createjuan': function () {
      var result = Users.find({
        username: "juan"
      })
      if(result.count() > 0){
        console.log("Ya existe un Juan aqui");
        return;
      }
      Users.insert({
        username: "juan",
        password: "123123"
      });
    }
  });
}
