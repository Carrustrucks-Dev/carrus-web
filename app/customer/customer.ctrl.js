/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module('carrus').controller('customerCtrl',['$scope','$http','$cookieStore','$state',function($scope,$http,$cookieStore,$state){

    console.log("customer");

    $scope.logout=function(){
        $.ajax({
            url:"http://52.25.204.93:8080/api/v1/shipper/logout",
            method:"PUT",
            headers: {'Authorization': $cookieStore.get('obj').accessToken},
            success:function(data,status){
                console.log("logged out");
                alert("Logged out successfully");
                $state.go("welcomeScreen");
            },
            error:function(data,status){
                alert("Error");
            }
    })
    }


}]);
