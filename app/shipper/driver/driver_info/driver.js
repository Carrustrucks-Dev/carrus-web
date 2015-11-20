/**
 * Created by clicklabs08 on 10/27/15.
 */
/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('driver', ['$scope','$cookies','$cookieStore','CONSTANT','$rootScope','$state', function($scope,$cookies,$cookieStore, CONSTANT,$rootScope,$state) {

    console.log("driver called ");

    var getDriverList = function () {

        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $.ajax({


            type: "GET",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/allTrucker',
            headers: {'authorization': access_token},
            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                console.log(data);

                $scope.driver_list= data.data;
                console.log($scope.driver_list);
                $scope.driver_list.forEach(function (column) {

                    var d = {
                        driver_name: "",
                        profile_pic: "",
                        driver_id: "",
                        mobile_number: "",
                        rating: "",
                        //gender: "",
                        aviability: "",
                        profilePicture:""
                    };

                    d.driver_name=column.driverName;
                    d.driver_id=column.driverId;
                    d.mobile_number= column.phoneNumber;
                    d.rating=column.rating;
                    d.aviability=column.aviability;
                    d.adharDoc=column.adharCard.adharDoc;
                    d.adharNo=column.adharCard.adharNo;
                    d.drivingLicenseDoc=column.drivingLicense.drivingLicenseDoc;
                    d.drivingLicenseNo=column.drivingLicense.drivingLicenseNo;
                    d.validity=column.drivingLicense.validity;
                    d.VoterIdDoc=column.VoterId.VoterIdDoc;
                    d.VoterIdNo=column.VoterId.VoterIdNo;
                    d._id=column._id;
                    d.stateDl=column.stateDl;
                    d.address=column.address;
                    if( column.profilePicture != null) {

                        d.profile_pic = column.profilePicture.original;

                        }
                    else
                        {
                            d.profile_pic = 'img/icon_placeholder.png';

                        }

                    dataArray.push(d);
                    $scope.list=dataArray;
                    $scope.list_length = $scope.list.length;
                });

            }



        });
    }

    getDriverList();

    $scope.view_driver_detail=function(json)
    {
        $rootScope.json1=json;
        console.log($rootScope.json1);
        console.log('yodapda');

        $state.go('shipper.driver_info.driver_detail');
    }

}]);