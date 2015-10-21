/**
 * Created by Manjeet  on 22/09/15.
 */

angular.module('carrus').controller('welcomeScreenCtrl',['$scope','$state', function($scope,$state){
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
        //console.log("welcomeScreen");

        $scope.showLogin = function()
        {
            $('#myModal').modal('show');
            $('body').on('wheel.modal mousewheel.modal', function () {
                return false;
            });
        };
        $scope.forgotPassword = function(){

            $('#forgot_passowrd').modal(options);
            $('#myModal').modal('hide');
            $('body').on('wheel.modal mousewheel.modal', function () {
                return false;
            });
        };
        $scope.SignUp = function(){

                $('#SignUp').modal(options);
            $('body').on('wheel.modal mousewheel.modal', function () {
                return false;
            });
        };
        $scope.checkOTP = function(){
                $('#otp_modal').modal(options);
            $('body').on('wheel.modal mousewheel.modal', function () {
                return false;
            });

        };
    $scope.closeModal=function(){
                    $('body').off('wheel.modal mousewheel.modal');
                };


    }]);


