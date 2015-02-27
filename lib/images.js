imgur = {
    obtain : function(id, success, error) {
        var method = "GET";
        var url ="https://api.imgur.com/3/image/{id}".replace("{id}",id);
    
        this._send (method, url, {}, success, error);
    },
    delete : function(deletehash, success, error) {
        var method = "DELETE";
        var url ="https://api.imgur.com/3/image/{id}".replace("{id}",deletehash);
    
        this._send (method, url, {}, success, error);
    },
    upload : function(data, success, error) {
        var method = "POST";
        var url = "https://api.imgur.com/3/image"; // Alternative url: https://api.imgur.com/3/upload
        var options = {
            'data':{
                image: data
            }
        };
    
        this._send (method, url, options, success, error);
    },
    _send : function(method, url, opts, ondone, onerror){
        if (!opts) 
            opts = {};

        opts.headers = {
            Authorization: "Client-ID {id}".replace("{id}",this.clientId)
        };

        var asyncCallback = function asyncCallback (error,result) {
            if (error){
                onerror (error,result);
            } else {
                ondone (result);
            }
        }

        HTTP.call (method, url, opts, asyncCallback);
    }
}

ImgurWrapper = Object.create (imgur,{
    clientId : { value: '15c3f14835e51d7' }
});

Images = Object.create({
    Image: function () {
        /**
         * States:
         *  Created Just created
         *  Loading Upload sent
         *  Error   Upload returned with an error
         *  Done    Upload returned OK
         */
        this.state = new ReactiveVar('Created');
        this.link = new ReactiveVar('');
        this.id = new ReactiveVar('');
        this.deletehash = new ReactiveVar('');
    
        /** 
         * Uploads the specified imageData. Sets its link, id, deletehash properties.
         * @this {Image}
         * @param {string} imageData A base64 string which represents the image to be uploaded
         * @return {undefined}
         */
        this.upload = function upload (imageData){
            var self = this;
            ImgurWrapper.upload ( imageData,
                function(result){
                    var content = result.data.data;
                    self.link.set( content.link );
                    self.id.set( content.id );
                    self.deletehash.set( content.deletehash );
                    self.state.set('Done');
                },
                function(error, result){
                    self.error = error;
                    self.link.set ( 'photo-broken.png' );
                    self.state.set('Error');
                }
            );
            this.state.set('Loading');
        }
    }
});