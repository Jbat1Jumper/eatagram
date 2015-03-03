
if (Meteor.isClient) {

  Template.addEntry.events({
    'submit #add-entry': function (event) {
      event.preventDefault();
      var instance = Template.instance();

      Entries.insert({
        summary: event.target.summary.value,
        createdAt: new Date(),
        userId: Meteor.userId(),
        userName: Meteor.user().profile.name,
        comments: [],
        image: instance.context.image.get()
      });

      event.target.summary.value = '';
      instance.context.clear();
      return false;
    }
  })

  Template.addEntry.created = function () {
    this.context = {
      state: ReactiveVar(false),
      image: ReactiveVar({})
    }
  };

  Template.addEntry.helpers({
    ctx: function () {
      var instance = Template.instance ();
      return instance.context;
    },
    disabled: function(){
      var context = Template.instance ().context;
      var state = context.state.get();
      if (state === 'Done'){
        /* Los input se bloquean por la existencia
        de un atributo disabled, ignoran su valor */
        return '';
      }
      return 'disabled';
    }
  });
}
