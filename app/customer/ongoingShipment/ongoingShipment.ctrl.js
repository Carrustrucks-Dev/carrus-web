/**
 * Created by nightshifttushar on 11/19/15.
 */
angular.module('carrus').controller('ongoingShipmentCtrl',['$scope','$location','$http','$cookieStore',function($scope,$location,$http,$cookieStore) {
    $scope.crnNum = "";
    $scope.rate = 1;
    $scope.max = 5;
    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {
            center: new google.maps.LatLng(30.75, 76.78),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel:false
        };
        var map = new google.maps.Map(mapCanvas, mapOptions);
        initialLocation = new google.maps.LatLng($scope.mainData.pickUp.coordinates.pickUpLat,$scope.mainData.pickUp.coordinates.pickUpLat);
        map.setCenter(initialLocation);
        var image = 'img/icon.png';
        var marker = new google.maps.Marker({
            position: initialLocation,
            icon: image,
            map: map
        });

    }
    initialize();
}]);