/**
 * Created by tushar on 28/10/2015.
 */

angular.module('carrus').controller('contactCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){
    $scope.ds={};
    $scope.ds.fullName="";
    $scope.ds.email="";
    $scope.ds.phoneNumber="";
    $scope.ds.comment="";
    $scope.authErrorMssg="";
    $scope.authMsg="";
    $scope.removeAuth=function(){
        if($scope.authMsg!=""){
            $scope.authMsg="";
        }
        if($scope.authErrorMssg!=""){
            $scope.authErrorMssg="";
        }

    };
    $scope.Contact=function(){
        console.log($scope.ds.fullName);
        console.log($scope.ds.phoneNumber);
        console.log($scope.ds.email);
        console.log($scope.ds.comment);

        if($scope.ds.fullName!=""&&$scope.ds.phoneNumber!=""&&$scope.ds.email!=""&&$scope.ds.comment!=""){
            $http.post('http://52.25.204.93:8080/api/v1/contact', {
                "fullName": $scope.ds.fullName,
                "email": $scope.ds.email,
                "phoneNumber": $scope.ds.phoneNumber,
                "comment": $scope.ds.comment
            })
                .success(function (data, status) {
                    console.log(data);
                    console.log("Lucky");
                    $scope.authMsg = "Message Sent successfully";
                    $scope.authErrorMssg="";
                })
                .error(function (data, status) {
                    console.log("Not so Lucky");
                    /*if(data.message=="No Fleet Owner for this pick up location.")
                        $scope.authErrorMsg="No Fleet Owner for this pick up location.";
                    if (status == 401) {
                        alert("Your credentials have expired , try logging in again.");
                    }
                    if(data.message="Cannot create booking of past.")
                        $scope.authErrorMsg="Cannot create booking of past."*/
                });
        }
        else {
            if ($scope.ds.fullName == "") {
                $scope.authErrorMssg = "Name should not be empty";
            }
            else if ($scope.ds.email == "") {
                $scope.authErrorMssg = "Email should not be empty";
            }
            else if ($scope.ds.phoneNumber == "") {
                $scope.authErrorMssg = "Phone Number should not be empty";
            }
            else if ($scope.ds.comment == "") {
                $scope.authErrorMssg = "Comment should not be empty";
            }

        }
    };
    $scope.ValidateEmail =function(object){   /*
     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
     */
        if (/^([_a-zA-Z0-9-+]+)(\.[_a-zA-Z0-9-+]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/.test($scope.ds.email))
        {
            console.log("Perfect");

            return (true)
        }
        console.log("You have entered an invalid email address!");
        $scope.ds.email="";

        return (false)
    };

    $scope.lengthCheck=function (object) {
        console.log($scope.ds.phoneNumber);
        console.log(typeof $scope.ds.phoneNumber);
        console.log($scope.ds.phoneNumber.length);

        if (parseInt($scope.ds.phoneNumber)<6999999999) {
            $scope.ds.phoneNumber="";
        }
        else{

        }
    }



}]);