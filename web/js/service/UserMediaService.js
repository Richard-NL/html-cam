var UserMediaService = new Class({
	localMediaStream: null,
	videoElement: null,
	initialize: function () {
		
	},
	
	startVideoStream: function( videoElement ) {
		this.videoElement = videoElement;
		this.getUserMedia({ video: true },
			this.streamToVideoElementAndCreateLocalMediaStream.bind( this ),
			this.errorCallback
		);

	},
	getUserMedia: function () {
		if ( typeof arguments !== 'object' && arguments.length !== 3) {
			throw 'Tree params required for this method';
		}

		var getUserMediaFunction = Modernizr.prefixed( 'getUserMedia', navigator);
		getUserMediaFunction(arguments[0], arguments[1], arguments[2]);
	},

	streamToVideoElementAndCreateLocalMediaStream: function ( localMediaStream ) {
		try {
			this.videoElement.src = window.URL.createObjectURL( localMediaStream );
		} catch( exception ) {
			throw exception;
		}
		this.localMediaStream = localMediaStream;
	},

	errorCallback: function () {
		alert( 'Error access to camera device denied' );
	},
	
	getLocalMediaStream: function () {
		return this.localMediaStream;
	}
});