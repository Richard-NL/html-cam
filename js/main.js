var ScreenShotApplication = new Class({
	localMediaStream: null,

	initialize: function () {
		this.getUserMedia({ video: true },
			this.streamToVideoElement.bind(this),
			this.errorCallback
		);

		this.setElementListeners();
	},

	getUserMedia: function () {
		if ( typeof arguments !== 'object' && arguments.length !== 3) {
			throw 'Tree params required for this method';
		}
		
		var getUserMediaFunction = Modernizr.prefixed( 'getUserMedia', navigator);

		getUserMediaFunction.bind(this);

		getUserMediaFunction(arguments[0], arguments[1], arguments[2]);
	},

	streamToVideoElement: function ( localMediaStream ) {
		var video = document.querySelector('video');
		video.src = window.URL.createObjectURL( localMediaStream );
		this.localMediaStream = localMediaStream;
	},

	errorCallback: function ( event ) {
		alert( 'Error access to cam denied' );

	},
	setElementListeners: function () {
		$('capture').addEvent( 'click', this.makePicture.bind( this ) );
	},
	makePicture: function () {
		var canvas = document.querySelector('canvas'),
			ctx = canvas.getContext('2d'),
			video = document.querySelector('video');
		$$('canvas').setProperty('height', 600);
		$$('canvas').setProperty('width', 600);

		if ( this.localMediaStream ) {
			ctx.drawImage(video, 0, 0);
			var image = new Image();
			image.src = canvas.toDataURL('image/webp');
		}
	} 
});
window.addEvent('domready', function() {
	new ScreenShotApplication();
});
