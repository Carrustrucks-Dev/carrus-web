/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('pending_requests',['$rootScope','$scope','CONSTANT','$cookies','$timeout', '$cookieStore','$http', '$state','$window','$location', function($rootScope,$scope,CONSTANT,$cookies,$timeout, $cookieStore,$http,$state,$window,$location) {
    $scope.list_length=0;
    console.log("pending_requests called ");

    $scope.Quote = function(json){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $scope.json=json;
        console.log($scope.json);
        $('#quote').modal(options);
        //$('#myModal').modal('hide');
        $('body').addClass('modal-open')
    },
        $scope.Confirm_quote = function(){
            var options = {
                show     : 'true',
                backdrop : 'static'
            }
            $('#confirm_quote').modal(options);
            $('#quote').modal('hide');
        }




    var get_requests = function ()
    {
        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $http({
            method: 'GET',
            url: CONSTANT.apiURL +'api/v1/fleetOwner/pendingRequest',
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
                d.budget = column.budget;
                d.pickup_date = date;
                d.pickup_time = column.pickUp.time;
                d.pickup_location = column.pickUp.location;
                d.dropoff_date = drop_date;
                d.dropoff_time = column.dropOff.time;
                d.dropoff_location = column.dropOff.location;
                d.truck_type = column.truck.truckType.typeTruckName;
                d.cargo_details = column.cargo.cargoType.typeCargoName;
                d.cargo_weight = column.cargo.weight;
                d.notes= column.note;
                d.bid_id=column._id;
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

    get_requests();



    $scope.submit_quote = function () {

        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $scope.bid_id =  [$scope.json.bid_id];
      
        $http({
            method: 'POST',
            url: CONSTANT.apiURL +'api/v1/fleetOwner/quote',
            headers: {
                "authorization": access_token
            },
            data:{
                offerCost:$scope.quote.cost,
                note:$scope.quote.note,
                tracking: 'YES',
                bidId: $scope.bid_id
            }

        }).success(function (data, status) {
            console.log(data);
            alert('You have successfully quoted for this bid!!')
            $state.reload();

    })
    }

    $scope.ignore_quote = function (json) {
                    alert('Do you want to ignore this bid')

        var access_token = $cookieStore.get('obj');
        access_token = access_token.accesstoken;
        $rootScope._id=json.bid_id;
       
        $.ajax({
            method: 'PUT',
            url: CONSTANT.apiURL +'api/v1/fleetOwner/ignoreRequest/'+ $rootScope._id,
            headers: {
                "authorization": access_token
            },

        }).success(function (data, status) {
            console.log(data);
            alert('The bid has been successfully ignored !!')
        }).error(function(data,status){
            if(data.message=="Access Denied." && data.statusCode == 401)
                {
                    $state.go('welcomeScreen')
                }
        })
    }

}]);


