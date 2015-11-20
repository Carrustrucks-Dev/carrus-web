/**
 * Created by clicklabs08 on 11/5/15.
 */
angular.module('carrus').controller('driver_info',['$scope','$location','$rootScope','$cookieStore','$cookies','CONSTANT', function($scope,$location,$rootScope,$cookieStore,$cookies,CONSTANT) {

    console.log("driver info controller called ");
    console.log($rootScope.json1);


    var d = {};
    $scope.driver= {
        driver_name: $rootScope.json1.driver_name,
        driver_id:$rootScope.json1.driver_id,
        profile_pic:$rootScope.json1.profile_pic,
        address:$rootScope.json1.address,
        mobile_number:$rootScope.json1.mobile_number,
        drivingLicenseNo:$rootScope.json1.drivingLicenseNo,
        drivingLicenseDoc:$rootScope.json1.drivingLicenseDoc,
        validity:$rootScope.json1.validity,
        stateDl:$rootScope.json1.stateDl,
        adharDoc:$rootScope.json1.adharDoc,
        adharNo:$rootScope.json1.adharNo,
        VoterIdNo: $rootScope.json1.VoterIdNo,
        VoterIdDoc:$rootScope.json1.VoterIdDoc,
        _id:$rootScope.json1._id

    };

    $scope.driver.validity=  $scope.driver.validity.toString().split("T")[0];
    //$scope.fleetowner.fullName = ;
    console.log($scope.driver,'this is the new arrray');


    $scope.getCurrentPath = function()
    {
        return $location.path();
    };

    $scope.add_driver_modal = function(){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $('#add_driver').modal(options);
        $('body').addClass('modal-open')
    }

    $scope.block_driver=function()
    {
        //alert('Do you really want to block this driver ??');
        var access_token= $cookieStore.get('obj');
        access_token=access_token.accesstoken;
        $scope.formData= new FormData();
        $scope.formData.append("isBlocked", 'true');


        $.ajax({


            type: "PUT",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/changeStatusTrucker/'+$scope.driver._id,
            headers:{'authorization':access_token
            },
            data: $scope.formData,
            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                alert('You driver is successfully blocked !!')




            }

        });

    }

    $scope.profile_pic = function (File) {
        $scope.driver.profilePicture_name = File[0].name;
        $scope.driver.profilePicture = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.driver.profilePicture);
    };
    $scope.adhar_doc = function (File) {
        $scope.driver.adharDoc_name = File[0].name;
        $scope.driver.adharDoc = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.driver.adharDoc);
    };
    $scope.voterid_doc = function (File) {
        $scope.driver.VoterIdDoc_name = File[0].name;
        $scope.driver.VoterIdDoc = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.driver.VoterIdDoc);
    };
    $scope.dl_doc = function (File) {
        $scope.driver.drivingLicenseDoc_name = File[0].name;
        $scope.driver.drivingLicenseDoc = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.driver.drivingLicenseDoc);
    };
    $scope.edit_driver=function() {
        var options = {
            show: 'true',
            backdrop: 'static'
        }
        $('#edit_driver').modal(options);
    }


    $scope.uploadFile1 = function (files,type) {
        if(type ==0)
        {
            $scope.formData.append("profilePicture", files[0]);
        }
        if(type ==1) {$scope.formData.append("adharDoc", files[0]);}
        if(type ==2){$scope.formData.append("VoterIdDoc", files[0]);}
        if(type ==3){ $scope.formData.append("drivingLicenseDoc", files[0]);}
        console.log('file-uploaded',files[0])
    }

    $scope.edit_driver_details=function()
    {
        //alert('Do you really want to block this driver ??');
        var access_token= $cookieStore.get('obj');
        access_token=access_token.accesstoken;
        $scope.formData= new FormData();

        $scope.formData.append("driverName", $scope.driver.driver_name);
        $scope.formData.append("phoneNumber", $scope.driver.mobile_number);
        $scope.formData.append("fullAddress", $scope.driver.address);
        $scope.formData.append("adharNo", $scope.driver.adharNo);
        $scope.formData.append("VoterIdNo", $scope.driver.VoterIdNo);
        $scope.formData.append("drivingLicenseNo", $scope.driver.drivingLicenseNo);
        $scope.formData.append("stateDl", $scope.driver.stateDl);
        $scope.formData.append("validity", $scope.driver.validity);
        $scope.formData.append("adharDoc", $scope.driver.adharDoc);
        $scope.formData.append("profilePicture", $scope.driver.profilePicture);
        $scope.formData.append("VoterIdDoc", $scope.driver.VoterIdDoc);
        $scope.formData.append("drivingLicenseDoc", $scope.driver.drivingLicenseDoc);
        $.ajax({


            type: "PUT",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/trucker/'+$scope.driver._id,
            headers:{'authorization':access_token
            },
            data: $scope.formData,
            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                alert('You driver is successfully edited !!')
                $('#edit_driver').modal('hide');
                $state.reload();

            }

        });

    }

}]);
