/**
 * Created by tushar on 28/10/2015.
 */
angular.module('carrus').controller('profileShipperCtrl',['$scope','$location','$http','$cookieStore',function($scope,$location,$http,$cookieStore){

    $scope.personalDetails={};
    $scope.getCurrentPath = function()
    {
        return $location.path();
    };

    $http.get("http://52.25.204.93:8080/api/v1/shipper/profile",{headers:{'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function(data,status){
            console.log(data);
            var details=data.data.getShipper[0];
            $scope.personalDetails=details;
            console.log($scope.personalDetails);
        })
}]);