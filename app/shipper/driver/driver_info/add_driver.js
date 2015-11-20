/**
 * Created by clicklabs08 on 10/28/15.
 */
/**
 * Created by clicklabs08 on 10/27/15.
 */
angular.module('carrus').controller('add_a_driver',['$scope','CONSTANT','$cookies','$cookieStore','$state', function($scope,CONSTANT, $cookies, $cookieStore,$state) {

    console.log("add truck called ");


    $scope.driver={};
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

    $scope.addDriver = function () {
        console.log($scope.fleetowner);
        console.log('register driver function is called');
        $scope.formData = new FormData();
        var area= {};
        var access_token= $cookieStore.get('obj');
        console.log(access_token);
        access_token=access_token.accesstoken;

        $scope.formData.append("driverName", $scope.driver.driverName);
        $scope.formData.append("phoneNumber", $scope.driver.phoneNumber);
        $scope.formData.append("fullAddress", $scope.driver.fullAddress);
        $scope.formData.append("adharNo", $scope.driver.adharNo);
        $scope.formData.append("VoterIdNo", $scope.driver.VoterIdNo);
        $scope.formData.append("drivingLicenseNo",$scope.driver.drivingLicenseNo);
        $scope.formData.append("validity", $scope.driver.validity);
        $scope.formData.append("stateDl", $scope.driver.stateDl);
        $scope.formData.append("adharDoc", $scope.driver.adharDoc);
        $scope.formData.append("profilePicture", $scope.driver.profilePicture);
        $scope.formData.append("VoterIdDoc", $scope.driver.VoterIdDoc);
        $scope.formData.append("drivingLicenseDoc", $scope.driver.drivingLicenseDoc);

        console.log($scope.formData);

        $.ajax({


            type: "POST",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/trucker',
            headers:{'authorization':access_token},
            data: $scope.formData,
            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                alert('You driver has been successfully added !!')

                $('#add_driver').modal('hide');
                $state.reload();

            },
            error:function(data)
            {
                $('#add_driver').modal('hide');
                $('#add_driver').modal('show');
            }

        })
            ;
    }
}]);
