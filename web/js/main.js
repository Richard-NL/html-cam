var app = angular.module('Snapstar', []);

app.run(function($rootScope) {

});

app.controller('PictureController', ['$scope','$http', function( $scope, $http ) {
	$scope.video = document.querySelector('video');
	
	$scope.canvas = document.querySelector('canvas');
	
	$scope.ctx =  $scope.canvas.getContext('2d')
	
	$scope.userMediaService = new UserMediaService();

	$scope.showVideo = false;
	
	$scope.showPicture = false;

	$scope.rawFile = null;
	
	

	$scope.startCamera = function () {
		$scope.userMediaService.startVideoStream( $scope.video );
		$scope.showVideo = true;
		$scope.showPicture = false;
	};

	
	$scope.createPicture = function () {
		if ( $scope.userMediaService.getLocalMediaStream ) {
			$scope.ctx.drawImage($scope.video, 0, 0);
			var image = new Image();
			image.src = $scope.canvas.toDataURL('image/webp');
			$scope.rawFile = $scope.canvas.toDataURL('image/jpeg');

			$scope.showPicture = true;
			$scope.showVideo = false;
			return;
		}
	};

	$scope.postPicture = function () {

		
		var fileData = new FormData();
		fileData.append('file', $scope.rawFile);
		$http.post('/', fileData, {
			transformRequest: angular.identity,
			headers: {'Content-Type': undefined }
		})
		.success( function () {
		})
			
		.error( function () {
		});
	};
}]);

