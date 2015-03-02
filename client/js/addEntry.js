
if (Meteor.isClient) {

  Template.addEntry.events({
    'submit #add-entry': function (event) {
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
      return false;
    }
  })

  Template.addEntry.created = function () {
    this.context = {
      ready: ReactiveVar(false),
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
      if (! context.ready.get())
        return 'disabled';
      return '';
    }
  });
}
