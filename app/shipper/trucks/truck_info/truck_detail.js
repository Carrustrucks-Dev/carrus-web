/**
 * Created by clicklabs08 on 11/3/15.
 */
/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('truck_detail', ['$scope', '$cookies', '$cookieStore', 'CONSTANT','$rootScope', function ($scope, $cookies, $cookieStore, CONSTANT,$rootScope) {

    console.log("truck detail controller called ");
    $scope.data1 = '';






            //$scope.$apply(function () {

                //data = data.data;
                //console.log(data);
                //cons

            //})


    console.log($rootScope.json);




            var d = {};
            $scope.trucker= {
                truck_name: $rootScope.json.truck_name,
                truck_number:$rootScope.json.truck_number,
                model:$rootScope.json.model,
                oem:$rootScope.json.oem,
                address:$rootScope.json.address,
                status:$rootScope.json.status,
                fitnessCertificate:$rootScope.json.fitnessCertificate,
                fc_validity:$rootScope.json.fc_validity,
                notionalPermit:$rootScope.json.notionalPermit,
                np_validity:$rootScope.json.np_validity,
                registrationCertificate:$rootScope.json.registrationCertificate,
                rc_validity:$rootScope.json.rc_validity,
                taxToken: $rootScope.json.taxToken,
                tt_validity:$rootScope.json.tt_validity,
                insurance_company:$rootScope.json.insurace_company,
                insurance_policy:$rootScope.json.insurance_policy,
                insurance_validity:$rootScope.json.insurance_validity,
                manufacture_date:$rootScope.json.manufacture_date,
                truck_id:$rootScope.json.truck_id,
                truckerIds:$rootScope.json.trucker[0]._id,
                truckerName:$rootScope.json.trucker[0].driverName,
                truckerId:$rootScope.json.trucker[0].driverId,
                truckerAddress:$rootScope.json.trucker[0].address,
                truckerMobile:$rootScope.json.trucker[0].phoneNumber,
                typeTruck:$rootScope.json.typeTruck[0].typeTruckName,
                typeTruckIds:$rootScope.json.typeTruck[0]._id
            };
            //$scope.fleetowner.fullName = ;
    console.log($scope.trucker,'this is the new arrray');
            //$scope.$apply(function () {
            //
            //    $scope.trucker = $scope.trucker;
            //
            //})

            //dataArray.push(d);
            //$scope.list = dataArray;
            //    });


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
    $scope.EditTruck = function () {


        var truck_type = [$scope.trucker.typeTruckIds];
        truck_type = JSON.stringify(truck_type);
        var trucker_assigned = [$scope.trucker.truckerIds];
        trucker_assigned = JSON.stringify(trucker_assigned);
        //console.log(truck_type);
        //console.log(trucker_assigned);

        var area= {};
        var access_token= $cookieStore.get('obj');
        access_token=access_token.accesstoken;
        area=['up','punjab','rohtak'];
        area=JSON.stringify(area);
        //$scope.formData.append("truckNumber", $scope.trucker.truck_number);
        $scope.formData.append("truckName", $scope.trucker.truck_name);
        $scope.formData.append("truckerIds",trucker_assigned );
        $scope.formData.append("address", $scope.trucker.address);
        $scope.formData.append("model", $scope.trucker.model);
        $scope.formData.append("typeTruckIds",truck_type );
        //$scope.formData.append("manufactureDate", $scope.trucker.manufactureDate);
        $scope.formData.append("oem",$scope.trucker.oem);
        $scope.formData.append("company", $scope.trucker.insurance_company);
        $scope.formData.append("policy", $scope.trucker.insurance_policy);
        $scope.formData.append("validity",$scope.trucker.insurance_validity);
        $scope.formData.append("rcValidity", $scope.trucker.rc_validity);
        $scope.formData.append("fcValidity", $scope.trucker.fc_validity);
        $scope.formData.append("npValidity", $scope.trucker.np_validity);
        $scope.formData.append("ttValidity", $scope.trucker.tt_validity);
        //$scope.formData.append("typeTruckIds", $scope.trucker.tt_validity);
        console.log($scope.formData);
        $.ajax({


            type: "PUT",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/truck/'+$scope.trucker.truck_id,
            headers:{'authorization':access_token
             },
            data: $scope.formData,
            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                alert('You truck has been successfully edited !!')

                $('#add_truck').modal('hide');

            }

        });
    }

    //$scope.EditTruck= function ()
    //{
    //    //$scope.formData.append("email", $scope.fleetowner.email);
    //    $scope.formData.append("phoneNumber", $scope.fleetowner.phoneNumber);
    //
    //    $scope.formData.append("fullName", $scope.fleetowner.fullName);
    //    //$scope.formData.append("country", 'india');
    //    $scope.formData.append("companyName", $scope.fleetowner.companyName);
    //    //$scope.formData.append("areaOfOperation", area);
    //    //$scope.formData.append("typeOfCargo", $cookieStore.get('typeOfCargo'));
    //    $scope.formData.append("numberOfTrucks",$scope.fleetowner.numberOfTrucks);
    //    $scope.formData.append("address", $scope.fleetowner.address);
    //    //$scope.formData.append("city", $scope.fleetowner.city);
    //    //$scope.formData.append("state", $scope.fleetowner.state);
    //    //$scope.formData.append("pinCode",$scope.fleetowner.pinCode);
    //    $scope.formData.append("bankName", $scope.fleetowner.bankName);
    //    $scope.formData.append("accountNumber", $scope.fleetowner.accountNumber);
    //    $scope.formData.append("rtgsCode", $scope.fleetowner.rtgsCode);
    //    $scope.formData.append("micrCode", $scope.fleetowner.micrCode);
    //    $scope.formData.append("panCardNumber", $scope.fleetowner.panCardNumber);
    //    $scope.formData.append("serviceTaxNumber", $scope.fleetowner.serviceTaxNumber);
    //    $scope.formData.append("tradeLicenceNumber", $scope.fleetowner.tradeLicenceNumber);
    //    $scope.formData.append("tinNumber", $scope.fleetowner.tinNumber);
    //
    //    $scope.formData.append("deviceType", 'WEB');
    //    //$scope.formData.append("userType", 'FLEET_OWNER');
    //    console.log($scope.formData);
    //    var access_token = $cookieStore.get('obj');
    //    var dataArray = [];
    //    access_token = access_token.accesstoken;
    //    $.ajax({
    //
    //
    //        type: "PUT",
    //        url: CONSTANT.apiURL + 'api/v1/fleetOwner/profile',
    //        data: $scope.formData,
    //        async: false,
    //        headers: {'authorization': access_token},
    //        processData: false,
    //        contentType: false,
    //        // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
    //        success: function (data) {
    //            alert('You have been successfully registered !!')
    //            var options = {
    //                show     : 'true',
    //                backdrop : 'static'
    //            }
    //            $('#sign_up_step4').modal(options);
    //            $('#sign_up_step3').modal('hide');
    //
    //        }
    //
    //    });
    //
    //}
}]);

