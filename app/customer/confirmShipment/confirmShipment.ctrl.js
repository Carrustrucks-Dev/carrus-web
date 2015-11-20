/**
 * Created by nightshifttushar on 11/17/15.
 */
angular.module('carrus').controller('confirmShipmentCtrl',['$scope','$location','$http','$cookieStore',function($scope,$location,$http,$cookieStore) {
    $scope.crnNum = "";
    $scope.rate = 1;
    $scope.max = 5;
    $scope.promo="";
    $scope.amount=0;
}]);