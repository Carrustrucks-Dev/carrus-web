/**
 * Created by clicklabs08 on 10/27/15.
 */
/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('driver', ['$scope','$cookies','$cookieStore','CONSTANT', function($scope,$cookies,$cookieStore, CONSTANT) {

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
                        status: ""
                    };

                    d.driver_name=column.driverName;
                    d.driver_id=column.driverId;
                    d.mobile_number= column.phoneNumber;
                    d.rating=column.rating;
                    d.profile_pic= column.profilePicture;
                    dataArray.push(d);
                    $scope.list=dataArray;
                });
            }


        });
    }

    getDriverList();

}]);