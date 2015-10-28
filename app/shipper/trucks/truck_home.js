/**
 * Created by clicklabs08 on 10/27/15.
 */
angular.module('carrus').controller('truck_home',['$scope','$location','CONSTANT','$cookies', '$cookieStore', function($scope,$location,CONSTANT, $cookies, $cookieStore) {

    console.log("truck home controller called ");

    $scope.getCurrentPath = function()
    {
        return $location.path();
    };

    $scope.add_truck_modal = function(){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $('#add_truck').modal(options);
        $('body').addClass('modal-open')
    }

    var getDriverList = function () {
        var access_token = $cookieStore.get('obj');
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
                data=data.data;
                $scope.driverlist= data;
            }
        });
    };
    getDriverList();


    var getTruckTypeList = function () {

        $.ajax({


            type: "GET",
            url: CONSTANT.apiURL + 'api/v1/typeTruck',

            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                console.log(data);
                data=data.data;
                $scope.trucklist= data;
            }
        });
    };
    getTruckTypeList();

}]);