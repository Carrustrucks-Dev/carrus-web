/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('pending_quotes',['$scope','CONSTANT','$cookies', '$cookieStore','$http',  function($scope,CONSTANT,$cookies, $cookieStore,$http) {

    console.log("pending_Quotes called ");

    var get_requests = function ()
    {
        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $http({
            method: 'GET',
            url: CONSTANT.apiURL +'api/v1/fleetOwner/pendingQuotes',
            headers: {
                "authorization": access_token
            }
        }).success(function (data, status) {

            console.log(data);
            data = data.data;


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
                    bid_id:"",
                    offered_cost:""
                };
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
                d.offered_cost=column.offerCost;
                d.tracking=column.tracking;
                d.quoteNote=column.quoteNote;
                d.quoteId=column.quoteId;


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
        $scope.bid_id =  [$scope.json.bid_id];


        $http({
            method: 'PUT',
            url: CONSTANT.apiURL +'api/v1/fleetOwner/quote/'+$scope.json.quoteId ,
            headers: {
                "authorization": access_token
            },
            data:{
                offerCost:$scope.json.offered_cost,
                note:$scope.json.quoteNote,
                tracking: 'YES',
                bidId: $scope.bid_id
            }

        }).success(function (data, status) {
            console.log(data);
            alert('You have successfully updated your quote for this bid!!')
            $('#quote').modal('hide');
            $state.reload();

        })
    }
    $scope.update_quote = function(json){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $scope.json=json;
        console.log($scope.json);
        $('#quote').modal(options);
        //$('#myModal').modal('hide');
        $('body').addClass('modal-open')
    }




}]);