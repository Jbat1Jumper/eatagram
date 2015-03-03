/**
 *  Esta plantilla espera que se asigne un objeto de contexto con las siguientes propiedades
 *    image: Donde se asignará un objeto Images.Image (lib/images.js) una vez que esté cargado.
 *    state: String que indicará el progreso de la subida de imagen.
 *      Created     Just created
 *      Loading     Upload sent
 *      Error       Upload returned with an error
 *      Done        Upload returned OK
 *  Ambas propiedades deben ser reactivas (ReactiveVar)
 *  Además, proveerá de un metodo clear() que se encargará de limpiar la imagen.
 */

var logged = [];
function log (message) {
    console.log("Upload >" + message)
    logged.push({
        message: message
    });
    Session.set('upload-logs',logged.slice(-5));
}

Template.upload.created = function () {
    this.image = new Images.Image();
    var self = this;
    this.data.clear = function () {
        var oldimg = self.image
        self.image = new Images.Image();
        log('Pushed that creepy image');
        oldimg.state.set('TMP');
    }
};

Template.upload.events({
    'change #upload': function (evt) {
        var instance = Template.instance();
        var fileReader = new FileReader ();
        var file = evt.target.files[0];
    
        fileReader.onprogress = function (evt){};
        fileReader.onload = function(evt){
            log('Loaded file {name}, size: {size}, type: {type}'
                .replace('{name}', file.name)
                .replace('{size}', file.size)
                .replace('{type}', file.type));
            
            var imageData = btoa(fileReader.result); // Convierte a base64
            instance.image.upload (imageData);
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
        var instance = Template.instance();
        var link = instance.image.link.get();
        var state = instance.image.state.get();
        if (!link) {
            if (state === 'Created')
                return 'photo-stub.png';
            if (state === 'Loading')
                return 'photo-loading.png';
            if (state === 'Error')
                return 'photo-broken.png';
            log('imagestate seems to be Ok ($state) but there is no link!'.replace('$state', state))
        }
        // Dirty dirty me: AddEntry pasa un objeto de contexto, y aca lo pisamos suciamente.
        instance.data.image.set(instance.image.unreact());
        instance.data.state.set(state)
        return link;
    },
    logs: function() {
        return Session.get('upload-logs');
    }
});