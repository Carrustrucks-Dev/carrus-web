/**
 * Created by Manjeet  on 22/09/15.
 */

angular.module('carrus').controller('welcomeScreenCtrl',['$scope',
    function($scope){

        //console.log("welcomeScreen");


        $scope.showLogin = function()
        {
            $('#myModal').modal('show');
        },
        $scope.forgotPassword = function(){
            $('#forgot_passowrd').modal('show');
            $('#myModal').modal('hide');
        },
            $scope.SignUp = function(){
                $('#SignUp').modal('show');
            }


    }]);
