/**
 * Created by tushar on 28/10/2015.
 */
angular.module('carrus').controller('profileShipperCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){
    $scope.change={};
    $scope.authMsg='';
    console.log("Profile");
    $scope.changePass = function()
    {   $scope.authMsg='';
        $('#changePswdModal').modal('show');
        $('body').on('wheel.modal mousewheel.modal', function () {
            return false;
        });
    };
    $scope.closeModal=function(){
        $('body').off('wheel.modal mousewheel.modal');
    };
    $scope.changePswd=function(){
       if($scope.change.newPass==$scope.confirmPass) {
           $http.put("http://52.25.204.93:8080/api/v1/shipper/changePassword", {
               "newPassword": $scope.change.newPass,
               "oldPassword": $scope.change.oldPass
           }, {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
               .success(function (data, status) {
                   $scope.change = {};
                   alert("Password Changed Successfully");
                   $('#changePswdModal').modal('hide');
                   $scope.closeModal();

               }).error(function (data, status) {

               })
       }
        else{ $scope.authMsg="Passwords don't match";
       $scope.change={};
       }
    }

}]);