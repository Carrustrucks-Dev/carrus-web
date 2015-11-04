/**
 * Created by nightshifttushar on 10/29/15.
 */
angular.module('carrus').controller('pendingctrl',['$scope','$location','$http','CONSTANT','$cookieStore', function($scope,$location,$http,CONSTANT,$cookieStore){

    $scope.getCurrentPath = function()
    {
        return $location.path();
    };

    $http.get(CONSTANT.apiURL+"api/v1/shipper/allBid",{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function(data,status){
            console.log(data);

        })
        .error(function(data,status){
            console.log("Error");


        });


}]);