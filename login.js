if (Meteor.isClient) {

  var loginUser = function(uname, pass) {
      console.log("Your username is: " + uname);
      console.log("And your password is: " + pass);

      // do some mithical validations

      var result = Users.find({
        username: uname,
        password: pass
      })

      if(result.count() < 1){
        // Mostrar esto de alguna forma en el html, como un popup o algo
        console.log("Usuario o password incorrecta");
        return;
      }
      console.log("Successfully logged");
      Session.set("loggedUser", result.fetch()[0])
      Session.set("page", "home");
  }

  Template.login_page.events({
    'click #goback_btn': function () {
      Session.set("page", "landing");
    },
    'click #confirm_btn': function (event, template) {
      var uname = template.find("#username_input").value;
      var pass = template.find("#password_input").value;
      console.log("Yeah, give me your money you fkn button clicker");
      loginUser(uname, pass);
    },
    'keypress #password_input': function(event, template) {
      if(event.charCode != 13)
        return;
      var uname = template.find("#username_input").value;
      var pass = template.find("#password_input").value;
      console.log("You pressed the fucking enter");
      loginUser(uname, pass);
    }
  });
}
