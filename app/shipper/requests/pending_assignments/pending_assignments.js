/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('pending_assignments',['$scope','CONSTANT','$cookies', '$cookieStore','$http', '$state', function($scope,CONSTANT,$cookies, $cookieStore,$http,$state) {

    console.log("pending_Assignments called ");
    $scope.list_length=0;


        $scope.SignUp = function(){
            var options = {
                show     : 'true',
                backdrop : 'static'
            }
            $('#SignUp').modal(options);
            $('#quote').modal('hide');
        }

    var get_assignment_requests = function () {
        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $http({
            method: 'GET',
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/pendingAssignment',
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
                    shipper_name:"",
                    shipper_mobile:"",
                    acceptPrice: "",
                    pickup_date: "",
                    pickup_time: "",
                    pickup_location: "",
                    //gender: "",
                    dropoff_time: "",
                    dropoff_location: "",
                    dropoff_date: "",
                    truck_type: "",
                    cargo_details: "",
                    cargo_weight: "",
                    notes: "",
                    bid_id: "",
                    tracking: ""
                };
                var date = column.pickUp.date.toString().split("T")[0];
                var drop_date = column.dropOff.date.toString().split("T")[0];

                d.shipper_rating = column.shipper.rating;
                d.shipper_name = column.shipper.firstName + column.shipper.lastName ;
                d.shipper_mobile = column.shipper.phoneNumber;
                d.acceptPrice = column.acceptPrice;
                d.pickup_date = date;
                d.pickup_time = column.pickUp.time;
                d.pickup_location = column.pickUp.city;
                d.dropoff_date = drop_date;
                d.dropoff_time = column.dropOff.time;
                d.dropoff_location = column.dropOff.city;
                d.truck_type = column.truck.truckType.typeTruckName;
                d.cargo_details = column.cargo.cargoType.typeCargoName;
                d.cargo_weight = column.cargo.weight;
                d.notes = column.note;
                d.bid_id = column._id;
                d.tracking=column.tracking;


                dataArray.push(d);
                $scope.list = dataArray;
                $scope.list_length = $scope.list.length;
            })


        })
            .error(function (data, status) {
                $scope.loading = false;
                //console.log(data.message);
                if (data.message == "Access Denied." && data.statusCode == 401) {
                    $state.go('welcomeScreen')
                }

            });
    }
    get_assignment_requests();


    $scope.get_trucker_for_bid = function(json){
        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        $scope.bid_id=json.bid_id
        access_token = access_token.accesstoken;
    $http({
        method: 'GET',
        url: CONSTANT.apiURL + 'api/v1/fleetOwner/getAllTruckerForBid?bookingId='+json.bid_id,
        headers: {
            "authorization": access_token
        }
    }).success(function (data, status) {

        console.log(data);
        $scope.driver_array=data.data.truckers;
        $scope.assign_driver_modal($scope.driver_array);

    })
        .error(function(data,status){
            console.log('abc');
            console.log(data);
            if(data.message == 'No Record Found.' && data.statusCode ==404)
            {
                alert('There are no drivers available for this booking')
            }
        })
    }

    $scope.assign_driver_modal = function(json){
        $scope.json=json;
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $('#assign_driver').modal(options);
        //$('#myModal').modal('hide');
        $('body').addClass('modal-open')
    }
    $scope.select_driver_id=function(json){
        $scope.selected_driver={};
        $scope.selected_driver=json._id;
        console.log($scope.selected_driver);
    }
    $scope.assign_driver= function () {
        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $scope.formData= new FormData();
        console.log($scope.selected_driver,$scope.bid_id);
        $scope.formData.append("driverId", $scope.selected_driver);
        $scope.formData.append("bookingId", $scope.bid_id);
        $.ajax({


            type: "PUT",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/assignTrucker',
            headers:{'authorization':access_token
            },
            data: $scope.formData,
            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                alert('You have successfully assigned the booking to the driver!!')
                $('#assign_driver').modal('hide');
                $state.reload();

            }

        });

    }
}]);