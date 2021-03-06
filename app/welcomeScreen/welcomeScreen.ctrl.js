

/**
 * Created by Manjeet  on 22/09/15.
 */
angular.module('carrus').controller('welcomeScreenCtrl',['$scope','$rootScope','$state','$http','$cookieStore','CONSTANT','$filter', function($scope,$rootScope,$state,$http,$cookieStore,CONSTANT,$filter){

    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*----------------------------------------------Shipper Related Functions- Tushar-----------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/

    var try1 = [];
    var try2 = [];
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
    $scope.userName='';
    $scope.userPassword='';
    $scope.forgotEmail='';
    $scope.authMsg='';
    $scope.authErrorMsg='';
    $scope.otpNumber='';

    function initSignUp() {
        $scope.signUp = {
            state: "0",
            userType: "SHIPPER",
            zipcode: "",
            userName: "",
            fname: "",
            lname: "",
            companyname: "",
            partnershipName: "",
            confmpass: "",
            pass: "",
            address: "",
            cityTown: "",
            mobilenumber: "",
            excise:0

        };
    }
    initSignUp();
    $scope.loading=false;
    $scope.num = Math.floor(Math.random() * 900000) + 100000;
    $scope.signUp.partnershipName="Type of Company";
    $scope.show=function(id){
        if(id=="Yes"){
            $("#No").css("display","none");
            $("#Yes").css("display","");
        }
        else if(id=="No"){
            $("#Yes").css("display","none");
            $("#No").css("display","");
        }
    };
        $scope.showLoginShipper = function()
        {   $scope.authMsg='';
            $('#loginModal').modal('show');
            $("#Email").focus();
            $('body').on('wheel.modal mousewheel.modal', function () {
                return false;
            });
        };
        $scope.forgotPasswordShipper = function(){
            $scope.authMsg='';
            $('#forgot_passwordShipper').modal(options);
            $('#loginModal').modal('hide');
            $('body').on('wheel.modal mousewheel.modal', function () {
                return false;
            });
        };
        $scope.SignUpShipper = function(){
            $scope.num+=100;
            $scope.signUp.panCardNumber= $scope.num;
            $scope.signUp.tinNumber= $scope.num+6;
            $scope.signUp.serviceTaxNumber= $scope.num+12;
            $scope.signUp.exciseRegistrationNumber= $scope.num+18;

            /*console.log($scope.signUp.panCardNumber);
            console.log($scope.signUp.tinNumber);
            console.log($scope.signUp.serviceTaxNumber);
            console.log($scope.signUp.exciseRegistrationNumber);*/
            $scope.partnershipList();
            $('#SignUpShipper').modal(options);

        };
        $scope.checkOTPShipper = function(){
            $scope.authErrorMsg="";
            if($scope.signUp.userName!=''&&$scope.signUp.userType!=''&&$scope.signUp.fname!=''&&$scope.signUp.lname!=''&&$scope.signUp.companyname!=''&&$scope.signUp.partnershipName!=''&&$scope.signUp.confmpass!=''&&$scope.signUp.pass!=''
                &&$scope.signUp.address!=''&&$scope.signUp.cityTown!=''&&$scope.signUp.state!='0'&&$scope.signUp.mobilenumber!=""&&typeof $scope.signUp.mobilenumber!="undefined"&&$scope.signUp.zipcode!=''&&typeof $scope.signUp.zipcode!="undefined"&&$scope.signUp.confmpass==$scope.signUp.pass) {
                console.log($scope.signUp);

                $scope.getOTP();
                $('#otp_modalShipper').modal(options);
                /*$('body').on('wheel.modal mousewheel.modal', function () {
                    return false;
                });*/
            }
            else if ($scope.signUp.userName!=''&&$scope.signUp.userType!=''&&$scope.signUp.fname!=''&&$scope.signUp.lname!=''&&$scope.signUp.companyname!=''&&$scope.signUp.partnershipName!=''&&$scope.signUp.confmpass!=''&&$scope.signUp.pass!=''&&
                $scope.signUp.address!=''&&$scope.signUp.cityTown!=''&&$scope.signUp.state!='0'&&$scope.signUp.mobilenumber!=""&&$scope.signUp.zipcode!=''&&$scope.signUp.confmpass!=$scope.signUp.pass)$scope.authErrorMsg="Password Mismatch";
            else if(($scope.signUp.zipcode==""&&$scope.signUp.mobilenumber=="")&&($scope.signUp.userName!=''&&$scope.signUp.userType!=''&&$scope.signUp.fname!=''&&$scope.signUp.lname!=''&&$scope.signUp.companyname!=''&&$scope.signUp.partnershipName!=''&&$scope.signUp.confmpass!=''&&$scope.signUp.pass!=''&&
                $scope.signUp.address!=''&&$scope.signUp.cityTown!=''&&$scope.signUp.state!='0'&&$scope.signUp.confmpass==$scope.signUp.pass)){
                console.log($scope.signUp.mobilenumber);
                console.log($scope.signUp.zipcode);
                $("#Error").hide();
                $scope.authErrorMsg="Enter your Zip Code and your Mobile number";
                $scope.signUp.mobilenumber="";
                $scope.signUp.zipcode="";

            }
            else if((typeof $scope.signUp.zipcode=="undefined"&&typeof $scope.signUp.mobilenumber=="undefined")&&($scope.signUp.userName!=''&&$scope.signUp.userType!=''&&$scope.signUp.fname!=''&&$scope.signUp.lname!=''&&$scope.signUp.companyname!=''&&$scope.signUp.partnershipName!=''&&$scope.signUp.confmpass!=''&&$scope.signUp.pass!=''&&
                $scope.signUp.address!=''&&$scope.signUp.cityTown!=''&&$scope.signUp.state!='0'&&$scope.signUp.confmpass==$scope.signUp.pass)){
                console.log($scope.signUp.mobilenumber);
                console.log($scope.signUp.zipcode);
                $("#Error").hide();
                $scope.authErrorMsg="Enter your Zip Code and your Mobile number";
                $scope.signUp.mobilenumber="";
                $scope.signUp.zipcode="";

            }

            else if($scope.signUp.zipcode==""&&($scope.signUp.mobilenumber!=""&&$scope.signUp.userName!=''&&$scope.signUp.userType!=''&&$scope.signUp.fname!=''&&$scope.signUp.lname!=''&&$scope.signUp.companyname!=''&&$scope.signUp.partnershipName!=''&&$scope.signUp.confmpass!=''&&$scope.signUp.pass!=''&&
                $scope.signUp.address!=''&&$scope.signUp.cityTown!=''&&$scope.signUp.state!='0'&&$scope.signUp.confmpass==$scope.signUp.pass)){

                console.log($scope.signUp.mobilenumber);
                console.log($scope.signUp.zipcode);
                $("#Error").hide();
                $scope.authErrorMsg="Enter your Zip Code";
                $scope.signUp.zipcode="";

            }
            else if(typeof $scope.signUp.zipcode=="undefined"&&($scope.signUp.mobilenumber!=""&&$scope.signUp.userName!=''&&$scope.signUp.userType!=''&&$scope.signUp.fname!=''&&$scope.signUp.lname!=''&&$scope.signUp.companyname!=''&&$scope.signUp.partnershipName!=''&&$scope.signUp.confmpass!=''&&$scope.signUp.pass!=''&&
                $scope.signUp.address!=''&&$scope.signUp.cityTown!=''&&$scope.signUp.state!='0'&&$scope.signUp.confmpass==$scope.signUp.pass)){

                console.log($scope.signUp.mobilenumber);
                console.log($scope.signUp.zipcode);
                $("#Error").hide();
                $scope.authErrorMsg="Enter your Zip Code";
                $scope.signUp.zipcode="";

            }

            else if($scope.signUp.mobilenumber==""&&($scope.signUp.zipcode!=""&&$scope.signUp.userName!=''&&$scope.signUp.userType!=''&&$scope.signUp.fname!=''&&$scope.signUp.lname!=''&&$scope.signUp.companyname!=''&&$scope.signUp.partnershipName!=''&&$scope.signUp.confmpass!=''&&$scope.signUp.pass!=''&&
                $scope.signUp.address!=''&&$scope.signUp.cityTown!=''&&$scope.signUp.state!='0'&&$scope.signUp.confmpass==$scope.signUp.pass)){
                console.log($scope.signUp.mobilenumber);
                console.log($scope.signUp.zipcode);
                $scope.authErrorMsg="Enter your Mobile Number";
                $scope.signUp.mobilenumber="";
                $("#Error").hide();
            }
            else if(typeof $scope.signUp.mobilenumber=="undefined"&&($scope.signUp.zipcode!=""&&$scope.signUp.userName!=''&&$scope.signUp.userType!=''&&$scope.signUp.fname!=''&&$scope.signUp.lname!=''&&$scope.signUp.companyname!=''&&$scope.signUp.partnershipName!=''&&$scope.signUp.confmpass!=''&&$scope.signUp.pass!=''&&
                $scope.signUp.address!=''&&$scope.signUp.cityTown!=''&&$scope.signUp.state!='0'&&$scope.signUp.confmpass==$scope.signUp.pass)){
                console.log($scope.signUp.mobilenumber);
                console.log($scope.signUp.zipcode);
                $scope.authErrorMsg="Enter your Mobile Number";
                $scope.signUp.mobilenumber="";
                $("#Error").hide();
            }

            else
            { console.log($scope.signUp.mobilenumber);
                console.log($scope.signUp.zipcode);
                $scope.authErrorMsg="Enter all the fields properly";
                if(typeof $scope.signUp.mobilenumber!="undefined") $scope.signUp.mobilenumber="";
                if(typeof $scope.signUp.zipcode!="undefined") $scope.signUp.zipcode="";
                  }
            $("#Error").hide();
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
                        $scope.authMsg="Please enter a valid email ID and password";
                        console.log($scope.authMsg);
                        /*alert("Bad Request");
                        $state.reload();*/}
                    if (status == 401)
                    {   if(data.message="Invalid password.")
                        $scope.authMsg="Invalid Password.";
                        else if (data.message="Invalid password.")
                        $scope.authMsg="Email is not registered";
                        console.log($scope.authMsg);
                       // alert("Email is not registered");
                        //$state.reload();
                        }
                    if (status == 404)
                    { $scope.authMsg="Error occurred , try again";
                     /*alert("Admin not Found");
                        $state.reload();*/}
                    if (status == 500)
                    {  $scope.authMsg="Error occurred , try again";
                     /*alert("Error occurred , try again");
                        $state.reload();
                        $scope.$apply();*/}
                    if(status==417){
                        $scope.authMsg="Wrong Password , try again";
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
                    $scope.authMsg="";
                    alert("New Password has been successfully sent to your registered Email ID");
                    $("#forgot_passwordShipper").modal("hide");
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
            "userType": $scope.signUp.userType,
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
                else if(data.message=="Phone number already exists.")alert("Phone number already exists.");

            }
            if (status == 404)
            {  }
            if (status == 500)
            {  }
            if(status==417){

            }

        });

    };

    $scope.verifyOTPShipper=function(){
        $http.post('http://52.25.204.93:8080/api/v1/phoneVerification/verify', {
            "phoneNumber": $scope.signUp.mobilenumber,
            "OTP":$scope.otpNumber,
            "userType": "SHIPPER",
            "duringRegister": true
        }).success(function (data, status) {
                alert("Phone number verified successfully.");
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
            else if(data.message=="Phone number verification Failed.")alert("OTP Verification Failed.");

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
    $scope.partnershipList=function(){
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
            /* console.log($scope.partnershipArray)*/
        });
    });
    };
    $scope.partner=function(id,name){
      $scope.signUp.partnershipID=id;
      $scope.signUp.partnershipName=name;
        console.log($scope.signUp.partnershipID);
        if(name=="LIMITED"){
            $("#Excise").css("display","none");
            $("#CIN").css("display","");
        }
        else{
            $("#CIN").css("display","none");
            $("#Excise").css("display","");
        }
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
            "deviceToken": "12345"
         "panCardNumber": "",
         "tinNumber": "",
         "serviceTaxNumber": "",
         "exciseRegistrationNumber": "",*/



        $('#otp_modalShipper').modal('hide');
        var formData = new FormData();

        formData.append("userType", $scope.signUp.userType);
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
        formData.append("panCardNumber", $scope.signUp.panCardNumber.toString());
        formData.append("tinNumber", $scope.signUp.tinNumber.toString());
        formData.append("serviceTaxNumber", $scope.signUp.serviceTaxNumber.toString());
        formData.append("exciseRegistrationNumber", $scope.signUp.exciseRegistrationNumber.toString());
        /*formData.append("panCardNumber", "AB875238");
        formData.append("tinNumber", "986234");
        formData.append("serviceTaxNumber", "9836449568");
        formData.append("exciseRegistrationNumber", "9824698r62");*/
        formData.append("deviceType","WEB");
        formData.append("deviceName", "Mac");
        formData.append("deviceToken", "12345");
        /*for(i=0;i<arr.length;i++){
            file=arr[i];
            formData.append("panCard", file, file.name);
            /!*formData.append(, $scope.signUp.pan);*!/
        }*/
        var partnershipArray;
        for(var i=0;i<$scope.partnershipArray.length;i++){
            partnershipArray =$scope.partnershipArray[i]._id;
         formData.append("partnership", partnershipArray);
         /*formData.append(, $scope.signUp.pan);*/
         }




        $scope.loading=true;
        $http.post('http://52.25.204.93:8080/api/v1/shipper', formData,{headers: {'Content-Type': undefined}})
            .success(function (data, status) {
            initSignUp();
            $scope.loading=false;
            $scope.signUp.state="0";
            $scope.signUp.userType="SHIPPER";
            alert("Shipper Registered Successfully.");

            $('#SignUpShipper').modal('hide');
            $state.reload();
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

    };
    $scope.ValidateEmail =function(object){

        if (/^([_a-zA-Z0-9-+]+)(\.[_a-zA-Z0-9-+]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/.test($scope.signUp.userName))
        {
            console.log("Perfect");
            $("#Error").hide();
            $("#Error").text("");

            return (true)
        }
        console.log("You have entered an invalid email address!");
        $("#Error").text("Enter a valid Email");
        $("#Error").show();
        $scope.signUp.userName="";

        return (false)
    };
    $scope.mobileCheck=function (object) {
        if (parseInt($scope.signUp.mobilenumber)<6999999999) {
            $scope.signUp.mobilenumber="";
            $("#Error").text("Enter a valid Mobile Number");
            $("#Error").show();
        }else {$("#Error").hide();
            $("#Error").text("");
        }
    };
    $scope.zipCheck=function (object) {
        if (parseInt($scope.signUp.zipcode)<109999) {
            $scope.signUp.zipcode="";
            $("#Error").text("Enter a valid Zip Code");
            $("#Error").show();
        }else {$("#Error").hide();
            $("#Error").text("");
        }

    };
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*----------------------------------------------Fleet Owner Functions- Anuraj---------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    /*------------------------------------------------------------------------------------------------------------------------------*/
    $scope.showLogin = function()
    {
        $('#myModal').modal('show');


        //$state.go('customer');


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


        $scope.showLogin1 = function()
        {
            $('#fleet_owner_login_modal').modal('show');


            //$state.go('customer');


        },
        $scope.forgot_password = function(){
            var options = {
                show     : 'true',
                backdrop : 'static'
            }
            $('#fleet_owner_forgot_password_modal').modal(options);
            $('#fleet_owner_login_modal').modal('hide');
            $('body').addClass('modal-open')




        };


    $scope.SignUpFleetOwner = function(){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $('#sign_up_step1').modal(options);
        console.log("modal called");
    },
        $scope.SignUpFleetOwnerStep2 = function(){
            var options = {
                show     : 'true',
                backdrop : 'static'
            }
            $('#sign_up_step2').modal(options);
            $('#sign_up_step1').modal('hide');
            console.log("modal called");
            console.log('typecargo is called');

            $.get(CONSTANT.apiURL + 'api/v1/typeCargo',
                {


                }).then(
                function (data) {
                    //data = JSON.parse(data);

                    console.log(data);
                    $scope.typecargo = data.data;
                    console.log($scope.typecargo.length);
                    for (var i=0; i< $scope.typecargo.length;i++)
                    {
                        console.log('i am running')

                        try1[i] =  $scope.typecargo[i]._id;
                    }
                    try1=JSON.stringify(try1);
                    $cookieStore.put('typeOfCargo', try1);
                    console.log(try1);
                    if (data.error) {
                        $scope.authMsg = data.error;
                        $scope.$apply();
                    } else {
                        //$scope.SignUpFleetOwnerStep3();


                    }

                });
        },
        $scope.SignUpFleetOwnerStep3 = function(){
            var options = {
                show     : 'true',
                backdrop : 'static'
            }
            $('#sign_up_step3').modal(options);
            console.log(try1);
            console.log(try2);
            $('#sign_up_step2').modal('hide');
            console.log("modal called");
        },
        $scope.SignUpFleetOwnerStep4 = function(){

            console.log("modal called");
        }

    //================== function for fleet owner login =======================
    $scope.fleet_owner_login = function () {
        console.log($scope.fleetowner);

        $scope.authMsg = '';

        console.log($scope.fleetowner.email);

        $.post(CONSTANT.apiURL + 'api/v1/fleetOwner/login',
            {
                email: $scope.fleetowner.email,
                password: $scope.fleetowner.password,
                deviceType: 'WEB',
                deviceName: 'MAC'


            },
            function (data) {
                //data = JSON.parse(data);
                console.log(data);
                //return false;
                if (data.error) {
                    $scope.authMsg = data.error;
                    $scope.$apply();
                } else {
                    var someSessionObj = {'accesstoken': data.data.accessToken};
                    $cookieStore.put('obj', someSessionObj);
                    console.log(someSessionObj);
                    if(data.data.isBlocked == true){
                        alert('Your account has been blocked, please contact the administrator')
                    }
                    else{
                        $('#fleet_owner_login_modal').modal('hide');
                        $state.go('shipper.requests.pending_requests');


                    }
                    console.log('I reached here')

                }
            }).error(function(response){
                console.log(response);
                response.responseText=JSON.parse(response.responseText);
                if(response.responseText.statusCode== 401 && response.responseText.message == 'Invalid password.'  )
                {
                    console.log(response.responseText);

                    alert('Your login credentials are incorrect , please try again !! ')
                    console.log("response");
                }
                else if(response.responseText.statusCode== 401 && response.responseText.message == 'Email is not Registered.'  )
                {
                    console.log(response.responseText);

                    alert('Your Email ID is not registered with us !! ')
                    console.log("response");
                }
            })
    };
    $rootScope.cargo_array=[];
    $scope.playList={};
    $scope.getcargotype= function(){
        $.get(CONSTANT.apiURL + 'api/v1/typeCargo',
            {
            }).then(
            function (data) {
                console.log(data);
                $scope.typecargo = data.data;
                console.log($scope.typecargo.length);
                for (var i = 0; i < $scope.typecargo.length; i++) {
                    $rootScope.cargo_array[i] = $scope.typecargo[i];
                }
                console.log($rootScope.cargo_array);
            })
    }
    $scope.selected_cargo = function () {
        console.log($rootScope.cargo_array);
        $scope.playList = $filter('filter')($rootScope.cargo_array._id, {checked: true});
        console.log($scope.playList);
    }


    //==================== function for forgot password of fleet owner ====================

    $scope.fleet_owner_forgot_pwd = function () {
        console.log($scope.fleetowner);

        console.log('forgot pswd is called')
        $.ajax(
            {
                type: "PUT",
                url: CONSTANT.apiURL + 'api/v1/fleetOwner/forgotPassword',
                data: {'email': $scope.fleetowner.reset_pwd_email},
                success: function (response) {
                    console.log(response);
                    alert("We have successfully sent instructions to your email.")
                    $('#fleet_owner_forgot_password_modal').modal('hide');
                    $('#fleet_owner_login_modal').modal('show');


                },
                error: function (response) {
                    console.log(response.responseText);
                    if(typeof(response.responseText)=="string")
                        var res = JSON.parse(response.responseText)
                    alert("Your Email is not registered with us, please sign-up");
                    //var options = {
                    //    show     : 'true',
                    //    backdrop : 'static'
                    //}
                    //$('#sign_up_step1').modal(options);
                    //console.log("error");
                }



            });
    }


    //=========================== function to generate the OTP ==============================
    $scope.fleetowner={};
    $scope.fleetowner.userType= 'FLEET_OWNER';
    $scope.generateOTP = function () {
        console.log($scope.fleetowner);
        console.log($scope.indian_states);
        if ( $scope.fleetowner.name == "")
        {
            alert('Please fill the Name');
        }
        //if ( $scope.fleetowner.email == "")
        //{
        //    alert('Please fill the Email ID');
        //}
        //if ( $scope.fleetowner.password == "")
        //{
        //    alert('Please fill your Password');
        //}
        //if ( $scope.fleetowner.repassword == "")
        //{
        //    alert('Please fill your re-password');
        //}
        //if ( $scope.fleetowner.phoneNumber == "")
        //{
        //    alert('Please fill your Mobile Number');
        //}

        if ($scope.fleetowner.password == $scope.fleetowner.repassword) {

            //var options = {
            //    show: 'true',
            //    backdrop: 'static'
            //}
            //
            //console.log('generate OTP called')
            $cookieStore.put('email', $scope.fleetowner.email);
            $cookieStore.put('phoneNumber', $scope.fleetowner.phoneNumber);
            $cookieStore.put('password', $scope.fleetowner.password);
            $cookieStore.put('fullName', $scope.fleetowner.name);
            $cookieStore.put('userType', $scope.fleetowner.userType);

            $http.post(CONSTANT.apiURL + 'api/v1/phoneVerification/generate',
                {
                    "email": $scope.fleetowner.email,
                    "phoneNumber": $scope.fleetowner.phoneNumber,
                    "userType": 'FLEET_OWNER',
                    "duringRegister": true


                })

                .error(function (data, status) {
                    $scope.loading=false;
                    $scope.forgotEmail='';
                    console.log('I entered here');
                    if (status == 400)
                    { if(data.message=="phoneNumber length must be 10 characters long")
                        alert("Phone Number length must be 10.");
                    else if (data.message=="Wrong parameter.")alert("Wrong parameter.");
                    else if(data.message=="email must be a valid email")alert("Email must be valid");
                    else if(data.message=="Invalid email.")alert("Invalid email.");
                    else if(data.message=="phoneNumber must be a string")alert("phoneNumber must be a string");
                    else if(data.message=="email is not allowed to be empty")alert("Please fill the Email");
                    else if(data.message=="Invalid phoneNumber")alert("Please enter a valid phone number");
                    else if(data.message=="phoneNumber is not allowed to be empty")alert("Please enter a valid phone number");

                    }
                    if(data.message=="Phone number already exists." && data.statusCode== 409){
                        alert("You have already registered with this Number");
                        $state.go('welcomeScreen');}
                    if(data.message=="Email already exists." && data.statusCode== 409){
                        alert("You have already registered with this Email");
                        $state.go('welcomeScreen');

                    }
                    if (status == 404)
                    {  }
                    if (status == 500)
                    {  }
                    if(status==417){

                    }

                })
                .success(function(data,status){

                    var options = {
                        show: 'true',
                        backdrop: 'static'
                    }
                    $('#otp_modal').modal(options);
                })


        }
        else
        {
            alert('Your passwords do not match !!');
            var options = {
                show: 'true',
                backdrop: 'static'
            }
            $('#sign_up_step1').modal(options);
            $scope.fleetowner.userType= 'FLEET_OWNER';
            $scope.fleetowner.consignmentNote= 1;



        }
    }
    $scope.verifyOTP = function () {

        var email = $cookieStore.get('email');
        var phoneNumber = $cookieStore.get('phoneNumber')
        $http.post(CONSTANT.apiURL + 'api/v1/phoneVerification/verify',
            {

                "phoneNumber":phoneNumber,
                userType: 'FLEET_OWNER',
                "OTP": $scope.fleetowner.OTP,
                "duringRegister": true


            }).success(function (data,status) {
                //data = JSON.parse(data);
                console.log(data);
                //return false;
                if (data.error) {
                    $scope.authMsg = data.error;
                    $scope.$apply();
                } else {
                    $scope.SignUpFleetOwnerStep2();


                }

            })
            .error(function(data,status){
                if(data.message=="Phone number verification Failed." && data.statusCode== 400){
                    alert("Your OTP is incorrect, please enter correct OTP");
                    $('#otp_modal').modal('hide');
                    $('#otp_modal').modal('show');
                    //$state.go('welcomeScreen');
                }
                if(data.message=="OTP verification Failed." && data.statusCode== 400){
                    alert("Your OTP is incorrect, please enter correct OTP");
                    $('#otp_modal').modal('hide');
                    $('#otp_modal').modal('show');
                    //$state.go('welcomeScreen');
                }
                if(data.message=="OTP length must be 6 characters long"){
                    alert("Your OTP is incorrect, please enter correct OTP");

                    $state.go('welcomeScreen');}

            })

    }
    $scope.indian_states=[
        {name:'Andhra Pradesh',value:1 },
        {name:'Arunachal Pradesh',value:2 },
        {name:'Assam',value:3 },
        {name:'Bihar',value:4 },
        {name:'Chhattisgarh',value:5 },
        {name:'Chandigarh',value:6 },
        {name:'Goa',value:7 },
        {name:'Gujarat',value:8 },
        {name:'Haryana',value: 9},
        {name:'Himachal Pradesh',value: 10},
        {name:'Jammu & Kashmir',value:11 },
        {name:'Jharkhand',value: 12},
        {name:'Karnataka',value: 13},
        {name:'Kerala',value: 14},
        {name:'Madhya Pradesh',value:15 },
        {name:'Maharashtra',value:16 },
        {name:'Manipur',value:17 },
        {name:'Meghalaya',value:18 },
        {name:'Mizoram',value:19 },
        {name:'Nagaland',value:20 },
        {name:'Odisha',value:21 },
        {name:'Punjab',value:22 },
        {name:'Rajasthan',value:23 },
        {name:'Sikkim',value: 24},
        {name:'Tamil Nadu',value:25 },
        {name:'Tripura',value: 26},
        {name:'Telangana',value:27 },
        {name:'Uttarakhand',value:28 },
        {name:'Uttar Pradesh',value:29 },
        {name:'West Bengal',value:30 }
    ];

    $rootScope.selected_state = [];



    $scope.selectedOrNot = function (id, isChecked, index,name) {
        console.log("index:" + index + " " + isChecked);

        if (isChecked) {
            $rootScope.selected_state.push(name);
            //$rootScope.selected_state=$rootScope.selected_state.toString();
            array2string($rootScope.selected_state);

            //$scope.tryy.push(name);
        } else {
            var _index = $rootScope.selected_state.indexOf(name);
            $rootScope.selected_state.splice(_index, 1);
            array2string($rootScope.selected_state);
        }
       // $rootScope.selected_state =     JSON.parse($rootScope.selected_state);
        console.log(  $rootScope.selected_state);


    };
    var array2string= function(data) {
        $rootScope.selected_state1 = [];
        console.log(data);
        for(i=0;i<data.length;i++) {
            $rootScope.selected_state1[i] = data[i];
        }
        console.log($rootScope.selected_state1);
        convert2string( $rootScope.selected_state1);
    }
     var convert2string= function (data)
     {
         data= data.toString();
         //console.log(data,'calleddfgdfg');
     }

    //    ========================= function to save the data in step 2 ==================
    $rootScope.selected_cargo = [];
    $rootScope.selected_cargo_name = [];



    $scope.checkedOrNot = function (id, isChecked, index,name) {
        console.log("index:" + index + " " + isChecked);

        if (isChecked) {
            $rootScope.selected_cargo.push(id);
            $rootScope.selected_cargo_name.push(name);
            array2string1($rootScope.selected_cargo_name);

        } else {
            var _index = $rootScope.selected_cargo.indexOf(id);
            $rootScope.selected_cargo.splice(_index, 1);
            var _index1 = $rootScope.selected_cargo.indexOf(name);
            $rootScope.selected_cargo_name.splice(_index1, 1);
            array2string1($rootScope.selected_cargo_name);
        }
        console.log(  $rootScope.selected_cargo);
        console.log(  $rootScope.selected_cargo_name);
    };
    var array2string1= function(data) {
        $rootScope.selected_cargo_name1 = [];
        console.log(data);
        for(i=0;i<data.length;i++) {
            $rootScope.selected_cargo_name1[i] = data[i];
        }

        convert2strings( $rootScope.selected_cargo_name1);
    }
    var convert2strings= function (data)
    {
        data= data.toString();
        //console.log(data,'calleddfgdfg');
    }


    $scope.step2data = function () {

        console.log('step2data function is called');
        $cookieStore.put('companyName', $scope.fleetowner.companyName);
        $cookieStore.put('areaOfOperation', $scope.fleetowner.areaOfOperation);
        $cookieStore.put('numberOfTrucks', $scope.fleetowner.numberOfTrucks);
        $cookieStore.put('address', $scope.fleetowner.address);
        $cookieStore.put('city', $scope.fleetowner.city);
        $cookieStore.put('state', $scope.fleetowner.state);
        $cookieStore.put('pinCode', $scope.fleetowner.pinCode);
        console.log(try1);
        console.log($scope.indian_states);
        console.log($rootScope.selected_cargo);
        $scope.SignUpFleetOwnerStep3();


    }

    //    =========================== register function of step 3 ============================  //
    $scope.formData = new FormData();
    $scope.uploadFile1 = function (files,type) {
        if(type ==0)
        {
            $scope.formData.append("panCard", files[0]);
        }
        if(type ==1) {$scope.formData.append("tin", files[0]);}
        if(type ==2){$scope.formData.append("serviceTax", files[0]);}
        if(type ==3){ $scope.formData.append("tradeLicence", files[0]);}
        console.log('file-uploaded',files[0])
    }

    $scope.register = function () {
        console.log($scope.fleetowner);
        console.log('register function is called');

        var area= {};
        area=['up','punjab','rohtak'];
        area=JSON.stringify(area);
        //$rootScope.selected_cargo=[$rootScope.selected_cargo];
        console.log($rootScope.selected_cargo);
        $rootScope.selected_cargo=JSON.stringify($rootScope.selected_cargo);
        $rootScope.selected_state=JSON.stringify($rootScope.selected_state);
        console.log($rootScope.selected_cargo);
        $scope.formData.append("email", $cookieStore.get('email'));
        $scope.formData.append("phoneNumber", $cookieStore.get('phoneNumber'));
        $scope.formData.append("password", $cookieStore.get('password'));
        $scope.formData.append("fullName", $cookieStore.get('fullName'));
        $scope.formData.append("country", 'india');
        $scope.formData.append("companyName", $cookieStore.get('companyName'));
        $scope.formData.append("areaOfOperation", $rootScope.selected_state);
        $scope.formData.append("typeOfCargo", $rootScope.selected_cargo);
        $scope.formData.append("numberOfTrucks", $cookieStore.get('numberOfTrucks'));
        $scope.formData.append("address", $cookieStore.get('address'));
        $scope.formData.append("city", $cookieStore.get('city'));
        $scope.formData.append("state", $cookieStore.get('state'));
        $scope.formData.append("pinCode", $cookieStore.get('pinCode'));
        $scope.formData.append("bankName", $scope.fleetowner.bankName);
        $scope.formData.append("accountNumber", $scope.fleetowner.accountNumber);
        $scope.formData.append("rtgsCode", $scope.fleetowner.rtgsCode);
        $scope.formData.append("micrCode", $scope.fleetowner.micrCode);
        $scope.formData.append("panCardNumber", $scope.fleetowner.panCardNumber);
        $scope.formData.append("tinNumber", $scope.fleetowner.tinNumber);
        $scope.formData.append("serviceTaxNumber", $scope.fleetowner.serviceTaxNumber);
        $scope.formData.append("tradeLicenceNumber", $scope.fleetowner.tradeLicenceNumber);
        $scope.formData.append("consignmentNote", 1);
        $scope.formData.append("deviceType", 'WEB');
        $scope.formData.append("userType", 'FLEET_OWNER');
        console.log($scope.formData);

        $.ajax({


            type: "POST",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner',
            data: $scope.formData,
            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                alert('You have been successfully registered !!')
                var options = {
                    show     : 'true',
                    backdrop : 'static'
                }
                $('#sign_up_step4').modal(options);
                $('#sign_up_step3').modal('hide');

            }

        });
    }

    $scope.reload= function()
    {
         $('#sign_up_step4').modal('hide');
        $state.reload();
    }



}]);


