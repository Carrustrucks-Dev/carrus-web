/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('pending_requests',['$scope','CONSTANT','$cookies', '$cookieStore','$http',  function($scope,CONSTANT,$cookies, $cookieStore,$http) {

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

                var d = {
                    shipper_rating: "",
                    budget: "",
                    pickup_date: "",
                    pickup_time: "",
                    pickup_location: "",
                    //gender: "",
                    dropoff_time: "",
                    dropoff_location: "",
                    dropoff_date: "",
                    truck_type: "",
                    cargo_details: "",
                    cargo_weight:"",
                    notes:"",
                    bid_id:""
                };
                var date = column.pickUp.date.toString().split("T")[0];
                var drop_date = column.dropOff.date.toString().split("T")[0];

                d.shipper_rating = column.shipper._id;
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

            })
            $scope.list_length = $scope.list.length;
        })
                .error(function (data, status) {
                $scope.loading = false;


            });





    }
    get_requests();

    $scope.submit_quote = function () {

        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        var bid_id =  [$scope.json.bid_id]
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
                bidId: bid_id
            }

        }).success(function (data, status) {
            console.log(data);

    })
    }

    $scope.ignore_quote = function () {
        alert('You are sure to ignore this quote')
        var access_token = $cookieStore.get('obj');
        access_token = access_token.accesstoken;
        var bid_id =  $scope.json.bid_id;
        $.ajax({
            method: 'PUT',
            url: CONSTANT.apiURL +'api/v1/fleetOwner/ignoreRequest/{bidId}',
            headers: {
                "authorization": access_token
            },
            data:{
                bidId: bid_id
            }

        }).success(function (data, status) {
            console.log(data);
        })
    }

}]);



