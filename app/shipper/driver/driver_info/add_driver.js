/**
 * Created by clicklabs08 on 10/28/15.
 */
/**
 * Created by clicklabs08 on 10/27/15.
 */
angular.module('carrus').controller('add_a_driver',['$scope','CONSTANT','$cookies','$cookieStore', function($scope,CONSTANT, $cookies, $cookieStore) {

    console.log("add truck called ");


    $scope.formData = new FormData();
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
    $scope.addDriver = function () {
        console.log($scope.fleetowner);
        console.log('register driver function is called');

        var area= {};
        var access_token= $cookieStore.get('obj');
        //var access_token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NjJlMTc3YjM5ZWI2Y2MzNzI0YWJmOTEiLCJ0aW1lc3RhbXAiOiIyMDE1LTEwLTI4VDA2OjMxOjM5LjYyNVoiLCJ1c2VyVHlwZSI6IkZMRUVUX09XTkVSIiwiaWF0IjoxNDQ2MDEzODk5fQ.3st68BYVonFNHXzHOuzEKLnSOm4eRZsJk-TgVHB_Lzc'
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

                $('#add_truck').modal('hide');

            }

        });
    }
}]);
