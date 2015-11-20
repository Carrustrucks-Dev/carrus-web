/**
 * Created by nightshifttushar on 11/18/15.
 */
angular.module('carrus').controller('pastShipmentCtrl',['$scope','$location','$http','$cookieStore',function($scope,$location,$http,$cookieStore) {
    $scope.crnNum = "";
    $scope.rate = 1;
    $scope.max = 5;
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
    $scope.contactAdmin = function(){
        $('#contactAdmin').modal(options);
    };
    $scope.viewPODModal = function(){
        $('#viewPODModal').modal(options);
    };
}]);