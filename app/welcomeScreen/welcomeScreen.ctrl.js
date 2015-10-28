/**
 * Created by Manjeet  on 22/09/15.
 */

angular.module('carrus').controller('welcomeScreenCtrl',['$scope','$state','$http','$cookieStore','CONSTANT', function($scope,$state,$http,$cookieStore,CONSTANT){
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
    $scope.userName='';
    $scope.userPassword='';
    $scope.forgotEmail='';
    $scope.authMsg='';
    $scope.otpNumber='';
    $scope.signUp={};
    $scope.signUp.partnershipName="Type of Company";

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
            $http.post('http://52.25.204.93:8080/api/v1/shipper/login', {email: $scope.userName, password: $scope.userPassword,"deviceType": "WEB","deviceName": "Mac","deviceToken": "12345"})
                .success(function (data, status) {
                    $scope.userName='';
                    $scope.userPassword='';
                    $('#loginModal').modal('hide');
                    $scope.closeModal();

                    var Obj = {'accessToken': data.data.accessToken};
                    console.log(Obj);
                    $cookieStore.put('obj',Obj);
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

    $scope.getOTP=function(){
        $http.post('http://52.25.204.93:8080/api/v1/phoneVerification/generate', {
            "phoneNumber": $scope.signUp.mobilenumber,
            "email":$scope.signUp.userName,
            "userType": "SHIPPER",
            "duringRegister": true
        }).success(function (data, status) {

        }).error(function (data, status) {
            $scope.loading=false;
            $scope.forgotEmail='';
            if (status == 400)
            { if(data.message=="phoneNumber length must be 10 characters long")
                alert("Phone Number length must be 10.");
              else if (data.message=="Wrong parameter.")alert("Wrong parameter.");
                else if(data.message=="email must be a valid email")alert("Email must be valid");
                else if(data.message=="Invalid email.")alert("Invalid email.");

            }
            if (status == 404)
            {  }
            if (status == 500)
            {  }
            if(status==417){

            }

        });

    };

    $scope.verifyOTP=function(){
        $http.post('http://52.25.204.93:8080/api/v1/phoneVerification/verify', {
            "phoneNumber": $scope.signUp.mobilenumber,
            "OTP":$scope.otpNumber,
            "userType": "SHIPPER",
            "duringRegister": true
        }).success(function (data, status) {
                $scope.signUP();
        }).error(function (data, status) {
            $scope.loading=false;
            $scope.forgotEmail='';
            if (status == 400)
            { if(data.message=="phoneNumber length must be 10 characters long")
                alert("Phone Number length must be 10.");
            else if (data.message=="Wrong parameter.")alert("Wrong parameter.");
            else if(data.message=="email must be a valid email")alert("Email must be valid");
            else if(data.message=="Invalid email.")alert("Invalid email.");

            }
            if (status == 404)
            {  }
            if (status == 500)
            {  }
            if(status==417){

            }

        });

    };
/*
 for(i=0;i<arr.length;i++){
 file=arr[i];
 formData.append("otherImages", file, file.name);
 }

 $scope.files_to_upload = function (Files) {
 console.log(Files);
 arr=Files;
 };



 $scope.file_to_upload = function (File) {
 $scope.model.icon_image = File[0];
 console.log($scope.model.icon_image);
 };



* */
    var arr = [];
    $scope.files_pan = function (Files) {
        console.log(Files);
        arr=Files;

    };



    $scope.file_tin = function (File) {
        $scope.signUp.tin_name = File[0].name;
        $scope.signUp.tin = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.signUp.tin);
    };
    $scope.file_pan = function (File) {
        $scope.signUp.pan_name = File[0].name;
        $scope.signUp.pan = File[0];
        $("#pan").focus();
        $("#pan").blur();
        console.log($scope.signUp.pan);
    };
    $scope.file_tax = function (File) {
        $scope.signUp.taxreg_name = File[0].name;
        $scope.signUp.taxreg = File[0];
        $("#tax").focus();
        $("#tax").blur();
        console.log($scope.signUp.taxreg);
    };
    $scope.file_excisereg = function (File) {
        $scope.signUp.excisereg_name = File[0].name;
        $scope.signUp.excisereg = File[0];
        $("#excisereg").focus();
        $("#excisereg").blur();
        console.log($scope.signUp.excisereg);
    };
    $http.get("http://52.25.204.93:8080/api/v1/partnership").success(function(data,status){
        var partnershipArray = [];   //initially empty
        // data = JSON.parse(data);
        var dat = data.data;
        dat.forEach(function (column) {
            var h = {
                _id: "",
                partnershipName: ""
            };
            h._id = column._id;
            h.partnershipName = column.partnershipName;
            partnershipArray.push(h);
            $scope.partnershipArray = partnershipArray;
            console.log($scope.partnershipArray)
        });
});
    $scope.partner=function(id,name){
      $scope.signUp.partnershipID=id;
      $scope.signUp.partnershipName=name;
        console.log($scope.signUp.partnershipID);
  };
    $scope.signUP=function(){
        /*: ,
         "email": $scope.signUp.userName,
         "firstName":$scope.signUp.fname,
         "lastName": $scope.signUp.lname,
         "password": $scope.signUp.,
         "phoneNumber": $scope.signUp.mobilenumber,
         "companyName": $scope.signUp.companyname,
         "partnership": $scope.signUp.partnershipName,
         "excise": $scope.signUp.excisereg,
         "exciseRegistration": $scope.signUp.excisereg,
         "privateCopyOfCertificate": {},
         "declaration": {},
         "validity": "date",
         "cin": "",
         "limitedCopyOfCertificate": {},
        "address": $scope.signUp.address,
            "city": $scope.signUp.cityTown,
            "state": $scope.signUp.state,
            "pinCode": $scope.signUp.zipcode,
            "country": "India",
            "panCard":$scope.signUp.pan ,
            "tin": $scope.signUp.tin,
            "serviceTax": $scope.signUp.taxreg,
            "exciseRegistrationDoc": $scope.signUp.excisereg,
            "deviceType": "WEB",
            "deviceName": "Mac",
            "deviceToken": "12345"*/




        var formData = new FormData();

        formData.append("userType", "SHIPPER");
        formData.append("email", $scope.signUp.userName);
        formData.append("firstName", $scope.signUp.fname);
        formData.append("lastName", $scope.signUp.lname);
        formData.append("password", $scope.signUp.pass);
        formData.append("phoneNumber", $scope.signUp.mobilenumber);
        formData.append("companyName", $scope.signUp.companyname);
        /*formData.append("partnership", $scope.signUp.partnershipName);*/
        formData.append("excise", 10);
        /*formData.append("exciseRegistration", $scope.signUp.excisereg);*/
        formData.append("address", $scope.signUp.address);
        formData.append("city", $scope.signUp.city);
        formData.append("state", $scope.signUp.state);
        formData.append("pinCode", $scope.signUp.zipcode);
        formData.append("country", "India");
        formData.append("panCard", $scope.signUp.pan);
        formData.append("tin", $scope.signUp.tin);
        formData.append("serviceTax", $scope.signUp.taxreg);
        formData.append("exciseRegistrationDoc", $scope.signUp.excisereg);
        formData.append("deviceType","WEB");
        formData.append("deviceName", "Mac");
        formData.append("deviceToken", "12345");
        /*for(i=0;i<arr.length;i++){
            file=arr[i];
            formData.append("panCard", file, file.name);
            /!*formData.append(, $scope.signUp.pan);*!/
        }*/
        var partnershipArray;
        for(i=0;i<$scope.partnershipArray.length;i++){
            partnershipArray =$scope.partnershipArray[i]._id;
         formData.append("partnership", partnershipArray);
         /*formData.append(, $scope.signUp.pan);*/
         }





        $http.post('http://52.25.204.93:8080/api/v1/shipper', formData,{headers: {'Content-Type': undefined}}).success(function (data, status) {

        }).error(function (data, status) {
            $scope.loading=false;
            $scope.forgotEmail='';
            if (status == 400)
            { if(data.message=="phoneNumber length must be 10 characters long")
                alert("Phone Number length must be 10.");
            else if (data.message=="Wrong parameter.")alert("Wrong parameter.");
            else if(data.message=="email must be a valid email")alert("Email must be valid");
            else if(data.message=="Invalid email.")alert("Invalid email.");

            }
            if (status == 404)
            {  }
            if (status == 500)
            {  }
            if(status==417){

            }if(status==415){
                alert("Unsupported Media Type")
            }

        });

    }

}]);


