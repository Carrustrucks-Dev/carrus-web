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
            var options = {
                show     : 'true',
                backdrop : 'static'
            }
            $('#forgot_passowrd').modal(options);
            $('#myModal').modal('hide');
            $('body').addClass('modal-open')
        },
            $scope.SignUp = function(){
                var options = {
                    show     : 'true',
                    backdrop : 'static'
                }
                $('#SignUp').modal(options);
            },
            $scope.checkOTP = function(){
                var options = {
                    show     : 'true',
                    backdrop : 'static'
                }
                $('#otp_modal').modal(options);

            }


    }]);


