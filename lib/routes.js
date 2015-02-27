

Router.configure({
  'layoutTemplate': 'mainLayout'
});


Router.map(function (argument) {
  this.route('landing', {
    path: '/'
  });
  this.route('home');
  this.route('login');
  this.route('register');
  this.route('upload');
});


Router.onBeforeAction(function() {
  if (Meteor.userId())
    this.render('home');
  else this.next();
}, {only: ['login']});

Router.onBeforeAction(function() {
  if (!(Meteor.userId() || Meteor.loggingIn()))
    this.render('login');
  else this.next();
}, {except: ['landing']});
