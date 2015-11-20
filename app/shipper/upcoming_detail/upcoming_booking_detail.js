/**
 * Created by clicklabs08 on 11/19/15.
 */
/**
 * Created by nightshifttushar on 11/19/15.
 */
angular.module('carrus').controller('upcoming_booking_detail',['$scope','$location','$http','$cookieStore','$rootScope',function($scope,$location,$http,$cookieStore,$rootScope) {
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
        initialLocation = new google.maps.LatLng(30.75,76.78);
        map.setCenter(initialLocation);
        var marker = new google.maps.Marker({
            position: initialLocation,
            map: map
        });

    }
    //initialize();
    console.log($rootScope.upcoming_detail);
    //$rootScope.upcoming_detail=$scope.$apply($rootScope.upcoming_detail);



}]);