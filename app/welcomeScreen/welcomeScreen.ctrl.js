/**
 * Created by Manjeet  on 22/09/15.
 */

angular.module('carrus').controller('welcomeScreenCtrl',['$scope','$state','$http','CONSTANT', function($scope,$state,$http,CONSTANT){
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
    $scope.userName='';
    $scope.userPassword='';
    $scope.forgotEmail='';
    $scope.authMsg='';

    /*console.log(CONSTANT);
    console.log(CONSTANT.apiURL);*/


        //console.log("welcomeScreen");

        $scope.showLogin = function()
        {   $scope.authMsg='';
            $('#loginModal').modal('show');
            $('body').on('wheel.modal mousewheel.modal', function () {
                return false;
            });
        };
        $scope.forgotPassword = function(){
            $scope.authMsg='';
            $('#forgot_passowrd').modal(options);
            $('#loginModal').modal('hide');
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



        $scope.loginFn=function(){
            $http.post('http://52.25.204.93:8080/api/v1/shipper/login', {email: $scope.userName, password: $scope.userPassword})
                .success(function (data, status) {
                    $scope.userName='';
                    $scope.userPassword='';
                    var someSessionObj = {'accessToken': data.data.accessToken};
                    console.log(someSessionObj);
                    $cookieStore.put('obj', someSessionObj);
                    $('#loginModal').modal('hide');
                    $scope.closeModal();
                    $state.go('customer.home');
                })
                .error(function (data, status) {
                    $scope.loading=false;
                    $scope.userName='';
                    $scope.userPassword='';
                    if (status == 400)
                    {
                        $scope.authMsg="Please enter a valid email id and password";
                        console.log($scope.authMsg);
                        /*alert("Bad Request");
                        $state.reload();*/}
                    if (status == 401)
                    {   $scope.authMsg="Email is not registered";
                        console.log($scope.authMsg);
                       // alert("Email is not registered");
                        //$state.reload();
                        }
                    if (status == 404)
                    {   /*alert("Admin not Found");
                        $state.reload();*/}
                    if (status == 500)
                    {   /*alert("Error occurred , try again");
                        $state.reload();
                        $scope.$apply();*/}
                    if(status==417){
                       /* alert("Wrong password, try again");
                        $state.reload();*/
                    }
                   /* $('#loginModal').modal('hide');
                    $scope.closeModal();*/
                   /* $state.go('customer.home');*/
                });

        };
        $scope.forgotPwd=function(){
            /*$http.put('http://52.25.204.93:8080/api/v1/shipper/forgotPassword', {email: $scope.forgotEmail})*/
            var form = new FormData();
            form.append("email",$scope.forgotEmail);
            $http({

                url:'http://52.25.204.93:8080/api/v1/shipper/forgotPassword',
                method: 'PUT',
                data:form,
                headers: {'Content-Type': undefined}
            })
                .success(function (data, status) {
                    $scope.forgotEmail='';
                })
                .error(function (data, status) {
                    $scope.loading=false;
                    $scope.forgotEmail='';
                    if (status == 400)
                    {  $scope.authMsg="Please enter a valid email id";}
                    if (status == 401)
                    {
                        $scope.authMsg="Email is not registered";}
                    if (status == 404)
                    {  }
                    if (status == 500)
                    {  }
                    if(status==417){

                    }
                    /*$state.go('customer');*/
                });

        };


}]);


