/**
 * Created by clicklabs08 on 10/27/15.
 */
angular.module('carrus').controller('add_a_truck',['$scope','CONSTANT','$cookies','$cookieStore', function($scope,CONSTANT, $cookies, $cookieStore) {

    console.log("add truck called ");


$scope.formData = new FormData();
$scope.uploadFile1 = function (files,type) {
    if(type ==0)
    {
        $scope.formData.append("rcDoc", files[0]);
    }
    if(type ==1) {$scope.formData.append("fcDoc", files[0]);}
    if(type ==2){$scope.formData.append("npDoc", files[0]);}
    if(type ==3){ $scope.formData.append("ttDoc", files[0]);}
    console.log('file-uploaded',files[0])
}
$scope.addTruck = function () {
    console.log($scope.fleetowner);
    console.log('register function is called');
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
            alert('You truck has been successfully added !!')

            $('#add_truck').modal('hide');

        }

    });
}
}]);