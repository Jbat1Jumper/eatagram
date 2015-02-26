
if (Meteor.isClient) {

  	Template.home.events({
    	'click #logout': function () {
    		console.log("Logging out");
      		Session.set("loggedUser", null);
      		Session.set("page", "landing")
      		Session.set("advancedOptions", false);
		},
		'click #advanced': function() {
			Session.set("advancedOptions", ! Session.get("advancedOptions"));
		},
		'click #delete': function() {
			console.log("Are you trying to delete me?");

			Users.remove({
				_id:Session.get("loggedUser")._id
			});

      		Session.set("loggedUser", null);
      		Session.set("page", "landing")
      		Session.set("advancedOptions", false);
		}
	});

	Template.home.helpers({
		advanced: function() {
			return Session.get("advancedOptions") == true;
		}
	})
}
