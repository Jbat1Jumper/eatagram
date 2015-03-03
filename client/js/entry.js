Template.entry.helpers({
  comments: function() {
    return Template.currentData().comments;
  },
  imageurl: function() {
  	var data = Template.currentData();
  	var link;
  	try{
  	  link = data.image.link;
  	} catch (e) {}
  	if (!link)
  		return 'photo-broken.png';
  	return link;
  }
})
