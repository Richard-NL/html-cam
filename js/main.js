var app = angular.module('Snapstar', []);

app.run(function($rootScope) {

});

app.controller('PictureController', ['$scope', function( $scope ) {
	$scope.video = document.querySelector('video');
	$scope.canvas = document.querySelector('canvas');
	$scope.ctx =  $scope.canvas.getContext('2d')
	$scope.userMediaService = new UserMediaService();


	$scope.startCamera = function () {
		$scope.userMediaService.startVideoStream( $scope.video );
	};

	
	$scope.createPicture = function () {
		if ( $scope.userMediaService.getLocalMediaStream ) {
			$scope.ctx.drawImage($scope.video, 0, 0);
			var image = new Image();
			image.src = $scope.canvas.toDataURL('image/webp');
			return;
		}
	};
}]);

