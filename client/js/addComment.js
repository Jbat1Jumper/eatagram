if (Meteor.isClient) {

  Template.addComment.events({
    'submit #addComment': function(event) {

      Entries.update({ _id: Template.currentData()._id}, {$push: {
        comments: {
          text: event.target.text.value,
          author: Meteor.user().profile.name,
          createdAt: new Date(),
          authorId: Meteor.userId()
        }
      }});

      event.target.text.value = '';
      return false;
    }
  })

}
