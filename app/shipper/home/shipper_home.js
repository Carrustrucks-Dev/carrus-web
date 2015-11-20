/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('shipper_home', ['$scope', '$cookies', '$cookieStore', 'CONSTANT','$rootScope', function ($scope, $cookies, $cookieStore, CONSTANT,$rootScope) {

    console.log("shipper ohem controller callled ");
    $scope.data1 = '';

    var access_token = $cookieStore.get('obj');
    var dataArray = [];
    access_token = access_token.accesstoken;
    $.ajax({


        type: "GET",
        url: CONSTANT.apiURL + 'api/v1/fleetOwner/profile',
        headers: {'authorization': access_token},


        success: function (data) {


            $scope.$apply(function () {

                data = data.data;
                console.log(data);


            })


            //
            var d = {};
            $scope.fleetowner= {
                fullName: data.getFleetOwner[0].fullName,
                email:data.getFleetOwner[0].email,
                phoneNumber:data.getFleetOwner[0].phoneNumber,
                companyName:data.getFleetOwner[0].companyName,
                numberOfTrucks:data.getFleetOwner[0].numberOfTrucks,
                address:data.getFleetOwner[0].addressDetails.address,
                city:data.getFleetOwner[0].addressDetails.city,
                state:data.getFleetOwner[0].addressDetails.state,
                country:data.getFleetOwner[0].addressDetails.country,
                pinCode:data.getFleetOwner[0].addressDetails.pinCode,
                panCardNumber:data.getFleetOwner[0].doc.panCardNumber,
                tinNumber:data.getFleetOwner[0].doc.tinNumber,
                serviceTaxNumber:data.getFleetOwner[0].doc.serviceTaxNumber,
                tradeLicenceNumber:data.getFleetOwner[0].doc.tradeLicenceNumber,
                bankName:data.getFleetOwner[0].bankDetails.bankName,
                accountNumber:data.getFleetOwner[0].bankDetails.accountNumber,
                rtgsCode: data.getFleetOwner[0].bankDetails.rtgsCode,
                micrCode:data.getFleetOwner[0].bankDetails.micrCode,
                panCard:data.getFleetOwner[0].doc.panCard,
                tin:data.getFleetOwner[0].doc.tin,
                serviceTax:data.getFleetOwner[0].doc.serviceTax,
                tradeLicence:data.getFleetOwner[0].doc.tradeLicence,
                areaofOperation:data.getFleetOwner[0].areaOfOperation[0],
                typeOfCargo:data.getFleetOwner[0].typeOfCargo[0],
                userType:data.getFleetOwner[0].userType
            };
            console.log( $scope.fleetowner.areaofOperation)
            //$scope.fleetowner.fullName = ;
            $scope.$apply(function () {

                $scope.fleetowner = $scope.fleetowner;

            })

            dataArray.push(d);
            $scope.list = dataArray;
            //    });
            $rootScope.fleet_owner_name= $scope.fleetowner.fullName;
            console.log($rootScope.fleet_owner_name);


        }

    });

    var a = function(){console.log($scope.fleetowner.fullName); };
    a;

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

    $scope.EditFleetOwner= function ()
    {
        //$scope.formData.append("email", $scope.fleetowner.email);
        $scope.formData.append("phoneNumber", $scope.fleetowner.phoneNumber);

        $scope.formData.append("fullName", $scope.fleetowner.fullName);
        $scope.formData.append("country", 'india');
        $scope.formData.append("companyName", $scope.fleetowner.companyName);
        //$scope.formData.append("areaOfOperation", area);
        //$scope.formData.append("typeOfCargo", $cookieStore.get('typeOfCargo'));
        $scope.formData.append("numberOfTrucks",$scope.fleetowner.numberOfTrucks);
        $scope.formData.append("address", $scope.fleetowner.address);
        $scope.formData.append("city", $scope.fleetowner.city);
        $scope.formData.append("state", $scope.fleetowner.state);
        $scope.formData.append("pinCode",$scope.fleetowner.pinCode);
        $scope.formData.append("bankName", $scope.fleetowner.bankName);
        $scope.formData.append("accountNumber", $scope.fleetowner.accountNumber);
        $scope.formData.append("rtgsCode", $scope.fleetowner.rtgsCode);
        $scope.formData.append("micrCode", $scope.fleetowner.micrCode);
        $scope.formData.append("panCardNumber", $scope.fleetowner.panCardNumber);
        $scope.formData.append("serviceTaxNumber", $scope.fleetowner.serviceTaxNumber);
        $scope.formData.append("tradeLicenceNumber", $scope.fleetowner.tradeLicenceNumber);
        $scope.formData.append("tinNumber", $scope.fleetowner.tinNumber);

        $scope.formData.append("deviceType", 'WEB');
        //$scope.formData.append("userType", 'FLEET_OWNER');
        console.log($scope.formData);
        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $.ajax({


            type: "PUT",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/profile',
            data: $scope.formData,
            async: false,
            headers: {'authorization': access_token},
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
}]);