if (Meteor.isClient) {

  Template.addComment.events({
    'submit #addComment': function(event) {
      event.preventDefault();
      var context = Template.instance().context;
      var image = context.image.get();

      Entries.update({ _id: Template.currentData()._id}, {$push: {
        comments: {
          text: event.target.text.value,
          author: Meteor.user().profile.name,
          createdAt: new Date(),
          authorId: Meteor.userId(),
          image: image
        }
      }});

      event.target.text.value = '';
      context.clear();
      return false;
    }
  });

  Template.addComment.created = function () {
    this.context = {
      state: ReactiveVar(false),
      image: ReactiveVar({})
    }
  };

  Template.addComment.helpers({
    ctx: function () {
      var instance = Template.instance ();
      return instance.context;
    },
    disabled: function(){
      var context = Template.instance ().context;
      var state = context.state.get();
      if ( state === 'Done' || state === 'Created' ) {
        /* Los input se bloquean por la existencia
        de un atributo disabled, ignoran su valor */
        return '';
      }
      return 'disabled';
    }
  });

}
