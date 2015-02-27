var image = new Images.Image();
var logged = [];
function log (message) {
    console.log("Upload >" + message)
    logged.push({
        message: message
    });
    Session.set('upload-logs',logged.slice(-5));
}

Template.upload.events({
    'change #fileinput': function (evt) {
        var fileReader = new FileReader ();
        var file = evt.target.files[0];
    
        fileReader.onprogress = function (evt){};
        fileReader.onload = function(evt){
            log('Loaded file {name}, size: {size}, type: {type}'
                .replace('{name}', file.name)
                .replace('{size}', file.size)
                .replace('{type}', file.type));
            
            var imageData = btoa(fileReader.result); // Convierte a base64
            image.upload (imageData);
            log('Upload request sent');
        };
        fileReader.onerror = function(evt){
            log('Something went wrong with file {name}'.replace('{name}',name));
        };
    
        fileReader.readAsBinaryString(file);
        return false;
    }
})

Template.upload.helpers({
    image: function() {
        var link = image.link.get();
        var state = image.state.get();
        if (!link) {
            if (state == 'Created')
                return 'photo-stub.png';
            if (state == 'Loading')
                return 'photo-loading.png';
            if (state == 'Error')
                return 'photo-broken.png';
            log('imagestate seems to be Ok ($state) but there is no link!'.replace('$state', state))
        }
        return link;
    },
    logs: function() {
        return Session.get('upload-logs');
    }
});