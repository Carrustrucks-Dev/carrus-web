/**
 * Created by clicklabs08 on 11/18/15.
 */
angular.module('carrus').controller('ongoing_booking',['$rootScope','$scope','CONSTANT','$cookies','$timeout', '$cookieStore','$http', '$state','$window','$location', function($rootScope,$scope,CONSTANT,$cookies,$timeout, $cookieStore,$http,$state,$window,$location) {

    console.log("ongoing_booking controller called ");
    $scope.list_length=0;
    $scope.getCurrentPath = function()
    {
        return $location.path();
    };

    var get_ongoing = function ()
    {
        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $http({
            method: 'GET',
            url: CONSTANT.apiURL +'api/v1/fleetOwner/getOnGoing',
            headers: {
                "authorization": access_token
            }
        }).success(function (data, status) {


            console.log(data);
            data = data.data;
            console.log(data.length);
            data.forEach(function (column) {

                var d = {};
                var date = column.pickUp.date.toString().split("T")[0];
                var drop_date = column.dropOff.date.toString().split("T")[0];

                d.shipper_rating = column.shipper.rating;
                d.shipper_name = column.shipper.firstName + column.shipper.lastName;
                d.shipper_mobile = column.shipper.phoneNumber;
                d.final_cost = column.acceptPrice;
                d.pickup_date = date;
                d.pickup_time = column.pickUp.time;
                d.pickup_location = column.pickUp.location;
                d.dropoff_date = drop_date;
                d.dropoff_time = column.dropOff.time;
                d.dropoff_location = column.dropOff.location;
                d.truck_type = column.truck.truckType.typeTruckName;
                d.cargo_details = column.cargo.cargoType.typeCargoName;
                d.cargo_weight = column.cargo.weight;
                d.status= column.bookingStatus;
                d.bid_id=column._id;
                d.crn=column.crn;
                d.tracking=column.tracking;
                d.driver_name=column.trucker.driverName;
                dataArray.push(d);

                $scope.list = dataArray;
                $scope.list_length = $scope.list.length;



            })
            //$scope.$apply(function()
            //{
            //
            //})

        })
            .error(function (data, status) {
                $scope.loading = false;
                console.log(data.message);
                if(data.message=="Access Denied." && data.statusCode == 401)
                {
                    $state.go('welcomeScreen')
                }

            });

    }

    get_ongoing();

}]);