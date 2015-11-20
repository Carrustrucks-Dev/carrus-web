/**
 * Created by clicklabs08 on 10/27/15.
 */
angular.module('carrus').controller('add_a_truck',['$scope','CONSTANT','$cookies','$cookieStore','$state', function($scope,CONSTANT, $cookies, $cookieStore,$state) {

    console.log("add truck called ");
    $scope.trucker={};
    $scope.rc_doc = function (File) {
        $scope.trucker.rcDoc_name = File[0].name;
        $scope.trucker.rcDoc = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.trucker.rcDoc);
    };
    $scope.np_doc = function (File) {
        $scope.trucker.npDoc_name = File[0].name;
        $scope.trucker.npDoc = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.trucker.npDoc);
    };
    $scope.tt_doc = function (File) {
        $scope.trucker.ttDoc_name = File[0].name;
        $scope.trucker.ttDoc = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.trucker.ttDoc);
    };
    $scope.fc_doc = function (File) {
        $scope.trucker.fcDoc_name = File[0].name;
        $scope.trucker.fcDoc = File[0];

        $("#tin").focus();
        $("#tin").blur();
        console.log($scope.trucker.fcDoc);
    };


$scope.uploadFile1 = function (files,type) {
    if(type ==0)
    {

    }
    if(type ==1) {}
    if(type ==2){$scope.formData.append("npDoc", files[0]);}
    if(type ==3){$scope.formData.append("fcDoc", files[0]);}
    console.log('file-uploaded',files[0])
}
$scope.addTruck = function () {
    $scope.formData = new FormData();
    console.log($scope.fleetowner);
    console.log($scope.trucker.typeTruckIds);
    console.log($scope.trucker.truckerIds);
    var truck_type = [$scope.trucker.typeTruckIds];
    truck_type = JSON.stringify(truck_type);
    var trucker_assigned = [$scope.trucker.truckerIds];
    trucker_assigned = JSON.stringify(trucker_assigned);
    console.log(truck_type);
    console.log(trucker_assigned);

    var area= {};
    var access_token= $cookieStore.get('obj');
    access_token=access_token.accesstoken;
    area=['up','punjab','rohtak'];
    area=JSON.stringify(area);
    $scope.formData.append("truckNumber", $scope.trucker.truckNumber);
    $scope.formData.append("truckName", $scope.trucker.truckName);
    $scope.formData.append("truckerIds",trucker_assigned );
    $scope.formData.append("address", $scope.trucker.address);
    $scope.formData.append("model", $scope.trucker.model);
    $scope.formData.append("typeTruckIds",truck_type );
    $scope.formData.append("manufactureDate", $scope.trucker.manufactureDate);
    $scope.formData.append("oem",$scope.trucker.oem);
    $scope.formData.append("company", $scope.trucker.company);
    $scope.formData.append("policy", $scope.trucker.policy);
    $scope.formData.append("validity",$scope.trucker.validity);
    $scope.formData.append("rcValidity", $scope.trucker.rcValidity);
    $scope.formData.append("fcValidity", $scope.trucker.fcValidity);
    $scope.formData.append("npValidity", $scope.trucker.npValidity);
    $scope.formData.append("ttValidity", $scope.trucker.ttValidity);
    $scope.formData.append("npDoc", $scope.trucker.npDoc);
    $scope.formData.append("fcDoc",$scope.trucker.fcDoc);
    $scope.formData.append("rcDoc", $scope.trucker.rcDoc);
    $scope.formData.append("ttDoc", $scope.trucker.ttDoc);

    console.log($scope.formData);

    $.ajax({


        type: "POST",
        url: CONSTANT.apiURL + 'api/v1/fleetOwner/truck',
        headers:{'authorization':access_token},
        data: $scope.formData,
        async: false,
        processData: false,
        contentType: false,
        // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
        success: function (data) {
            $('#add_truck').modal('hide');
            console.log('modal hid');
            alert('You truck has been successfully added !!')

            $state.reload();

        }

    });
}
}]);