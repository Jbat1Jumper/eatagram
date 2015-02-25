
if (Meteor.isClient) {

  	Template.home.events({
    	'click #logout': function () {
    		console.log("Logging out");
      		Session.set("logged_user", null);
      		Session.set("page", "landing")
      		Session.set("home_advanced_options_are_dmnd_enabled", false);
		},
		'click #advanced': function() {
			Session.set("home_advanced_options_are_dmnd_enabled", ! Session.get("home_advanced_options_are_dmnd_enabled"));
		},
		'click #delete': function() {
			console.log("Are you trying to delete me?");

			Users.remove({
				_id:Session.get("logged_user")._id
			});

      		Session.set("logged_user", null);
      		Session.set("page", "landing")
      		Session.set("home_advanced_options_are_dmnd_enabled", false);
		}
	});

	Template.home.helpers({
		advanced: function() {
			return Session.get("home_advanced_options_are_dmnd_enabled") == true;
		}
	})
}