angular.module('carrus').controller('ongoingctrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore) {

    $scope.rate = 1;
    $scope.max = 5;
    $scope.isReadonly = false;
    console.log(" ongoing");
    var options = {
        show: 'true',
        keyboard: false,
        backdrop: 'static'
    };
    $scope.currentPage = 1;
    $scope.itemsPerPage = 6;
    $scope.skip = 0;
    $scope.pageChanged = function (currentPage) {
        $scope.currentPage = currentPage;
        console.log('Page changed to: ' + $scope.currentPage);
        if ($scope.currentPage == 1) {
            $scope.skip = 0;

            console.log('Offset changed to: ' + $scope.skip);

        }
        if ($scope.currentPage == 2) {
            $scope.skip = 6;
            console.log('Offset changed to: ' + $scope.skip);

        }
        if ($scope.currentPage == 3) {
            $scope.skip = 12;
            console.log('Offset changed to: ' + $scope.skip);

        }
        if ($scope.currentPage == 4) {
            $scope.skip = 18;
            console.log('Offset changed to: ' + $scope.skip);

        }
        if ($scope.currentPage == 5) {
            $scope.skip = 24;
            console.log('Offset changed to: ' + $scope.skip);

        }
        if ($scope.currentPage == 6) {
            $scope.skip = 30;
            console.log('Offset changed to: ' + $scope.skip);
        }

        initTable();
    };
    function init(){
        var dataList='';
        $http.get("http://52.25.204.93:8080/api/v1/shipper/getOngoing", {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
            .success(function (data, status) {
                dataList = data.data;
                console.log(dataList);
                console.log(dataList.length);
                initTable();
                $scope.totalItems = dataList.length;
                console.log($scope.totalItems);
            });


    }init();
    function initTable() {
    $http.get("http://52.25.204.93:8080/api/v1/shipper/getOnGoing?limit=6&skip=" + $scope.skip + "&", {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function (data, status) {
            var ongoingList = [];
            console.log(data);
            var list = data.data;
            list.forEach(function (column) {
                console.log(column);
                var h = {
                    "_id": "",
                    "bid": "",
                    "shipper": {
                        "_id": "",
                        "email": "",
                        "firstName": "",
                        "lastName": "",
                        "phoneNumber": ""
                    },
                    "paymentMode": "",
                    "paymentOn": "",
                    "jobNote": "",
                    "bookingStatus": "",
                    "fleetOwner": {
                        _id: "",
                        email: "",
                        fullName: "",
                        phoneNumber: ""
                    },
                    "bookingCreatedAt": "",
                    "truck": {
                        "truckNumber": "",
                        "truckType": {
                            "_id": "",
                            "typeTruckName": ""
                        }
                    },
                    "cargo": {
                        "weight": "",
                        "cargoType": {
                            "_id": "",
                            "typeCargoName": ""
                        }
                    },
                    "paymentStatus": "",
                    "dropOff": {
                        "companyName": "",
                        "name": "",
                        "tin": "",
                        "contactNumber": "",
                        "address": "",
                        "city": "",
                        "state": "",
                        "zipCode": "",
                        "date": "",
                        "coordinates": {
                            "dropOffLat": "",
                            "dropOffLong": ""
                        },
                        "time": ""
                    },
                    "pickUp": {
                        "companyName": "",
                        "name": "",
                        "tin": "",
                        "contactNumber": "",
                        "address": "",
                        "city": "",
                        "state": "",
                        "zipCode": "",
                        "date": "",
                        "coordinates": {
                            "pickUpLat": "",
                            "pickUpLong": ""
                        },
                        "time": ""
                    },
                    "__v": 0,

                    "assignTruck": "",
                    "trucker": "",
                    "crn": "",

                    "transactionLogs": [],
                    "tracking": "",
                    "acceptPrice": 0,
                    "rating": {
                        "truckerRate": 0,
                        "truckerComment": null,
                        "shipperRate": 0,
                        "shipperComment": null
                    },
                    "doc": {
                        "consigmentNote": null,
                        "invoice": null,
                        "pod": null
                    }

                };
                if (column.transactionLogs != undefined)h.transactionLogs = column.transactionLogs;
                if (column.tracking != undefined)h.tracking = column.tracking;
                if (column.acceptPrice != undefined)h.acceptPrice = column.acceptPrice;
                if (column.rating != undefined) {
                    h.rating.truckerRate = column.rating.truckerRate;
                    h.rating.truckerComment = column.rating.truckerComment;
                    h.rating.shipperRate = column.rating.shipperRate;
                    h.rating.shipperComment = column.rating.shipperComment;
                }
                if (column.doc != undefined) {
                    h.doc.consigmentNote = column.doc.consigmentNote;
                    h.doc.invoice = column.doc.invoice;
                    h.doc.pod = column.doc.pod;
                }

                h._id = column._id;
                h.bid = column.bid;
                h.shipper._id = column.shipper._id;
                h.shipper.email = column.shipper.email;
                h.shipper.firstName = column.shipper.firstName;
                h.shipper.lastName = column.shipper.lastName;
                h.shipper.phoneNumber = column.shipper.phoneNumber;
                h.paymentMode = column.paymentMode;
                h.paymentOn = column.paymentOn;
                h.jobNote = column.jobNote;
                h.bookingStatus = column.bookingStatus;
                h.fleetOwner._id = column.fleetOwner._id;
                h.fleetOwner.email = column.fleetOwner.email;
                h.fleetOwner.fullName = column.fleetOwner.fullName;
                h.fleetOwner.phoneNumber = column.fleetOwner.phoneNumber;
                h.bookingCreatedAt = column.bookingCreatedAt;
                h.truck.truckNumber = column.truck.truckNumber;
                h.truck.truckType._id = column.truck.truckType._id;
                h.truck.truckType.typeTruckName = column.truck.truckType.typeTruckName;
                h.cargo.weight = column.cargo.weight;
                h.cargo.cargoType._id = column.cargo.cargoType._id;
                h.cargo.cargoType.typeCargoName = column.cargo.cargoType.typeCargoName;
                h.paymentStatus = column.paymentStatus;
                h.dropOff.companyName = column.dropOff.companyName;
                h.dropOff.name = column.dropOff.name;
                h.dropOff.tin = column.dropOff.tin;
                h.dropOff.contactNumber = column.dropOff.contactNumber;
                h.dropOff.address = column.dropOff.address;
                h.dropOff.city = column.dropOff.city;
                h.dropOff.state = column.dropOff.state;
                h.dropOff.zipCode = column.dropOff.zipCode;
                h.dropOff.date = column.dropOff.date;
                h.dropOff.coordinates.dropOffLat = column.dropOff.coordinates.dropOffLat;
                h.dropOff.coordinates.dropOffLong = column.dropOff.coordinates.dropOffLong;
                h.dropOff.time = column.dropOff.time;
                h.pickUp.companyName = column.pickUp.companyName;
                h.pickUp.name = column.pickUp.name;
                h.pickUp.tin = column.pickUp.tin;
                h.pickUp.contactNumber = column.pickUp.contactNumber;
                h.pickUp.address = column.pickUp.address;
                h.pickUp.city = column.pickUp.city;
                h.pickUp.state = column.pickUp.state;
                h.pickUp.zipCode = column.pickUp.zipCode;
                h.pickUp.date = column.pickUp.date;
                h.pickUp.coordinates.pickUpLat = column.pickUp.coordinates.pickUpLat;
                h.pickUp.coordinates.pickUpLong = column.pickUp.coordinates.pickUpLong;
                h.pickUp.time = column.pickUp.time;
                h.__v = column.__v;
                h.assignTruck = column.assignTruck;
                h.trucker = column.trucker;
                h.crn = column.crn;

                ongoingList.push(h);
                $scope.ongoingList = ongoingList;
                console.log($scope.ongoingList);
            });
        })
        .error(function (data, status) {
            if (status == 401) {
                alert("Your credentials have expired , try logging in again.");
            }
        });
}
    $scope.viewDetails=function(data){

            $('#viewDetailsModal').modal(options);

    }

}]);