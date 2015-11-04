angular.module('carrus').controller('ongoingctrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){

    console.log(" ongoing");
    $http.get("http://52.25.204.93:8080/api/v1/shipper/getOnGoing",{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function(data,status){
            var ongoingList=[];
            console.log(data);
            var list=data.data;
            list.forEach(function(column){
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
                    "fleetOwner": "",
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
                            "coordinates": [
                                0,
                                0
                            ],
                            "type": ""
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
                            "coordinates": [
                                0,
                                0
                            ],
                            "type": ""
                        },
                        "time": ""
                    },
                    "__v": 0,
                    "assignTruck": "",
                    "trucker": "",
                    "crn": ""


                };
                h._id=column._id;
                h.bid=column.bid;
                h.shipper._id=column.shipper._id;
                h.shipper.email=column.shipper.email;
                h.shipper.firstName=column.shipper.firstName;
                h.shipper.lastName=column.shipper.lastName;
                h.shipper.phoneNumber=column.shipper.phoneNumber;
                h.paymentMode=column.paymentMode;
                h.paymentOn=column.paymentOn;
                h.jobNote=column.jobNote;
                h.bookingStatus=column.bookingStatus;
                h.fleetOwner=column.fleetOwner;
                h.bookingCreatedAt=column.bookingCreatedAt;
                h.truck.truckNumber=column.truck.truckNumber;
                h.truck.truckType._id=column.truck.truckType._id;
                h.truck.truckType.typeTruckName=column.truck.truckType.typeTruckName;
                h.cargo.weight= column.cargo.weight;
                h.cargo.cargoType._id= column.cargo.cargoType._id;
                h.cargo.cargoType.typeCargoName= column.cargo.cargoType.typeCargoName;
                h.paymentStatus=column.paymentStatus;
                h.dropOff.companyName=column.dropOff.companyName;
                h.dropOff.name=column.dropOff.name;
                h.dropOff.tin=column.dropOff.tin;
                h.dropOff.contactNumber=column.dropOff.contactNumber;
                h.dropOff.address=column.dropOff.address;
                h.dropOff.city=column.dropOff.city;
                h.dropOff.state=column.dropOff.state;
                h.dropOff.zipCode=column.dropOff.zipCode;
                h.dropOff.date=column.dropOff.date;
                h.dropOff.coordinates.coordinates=column.dropOff.coordinates.coordinates;
                h.dropOff.coordinates.type=column.dropOff.coordinates.type;
                h.dropOff.time=column.dropOff.time;
                h.pickUp.companyName=column.pickUp.companyName;
                h.pickUp.name=column.pickUp.name;
                h.pickUp.tin=column.pickUp.tin;
                h.pickUp.contactNumber=column.pickUp.contactNumber;
                h.pickUp.address=column.pickUp.address;
                h.pickUp.city=column.pickUp.city;
                h.pickUp.state=column.pickUp.state;
                h.pickUp.zipCode=column.pickUp.zipCode;
                h.pickUp.date=column.pickUp.date;
                h.pickUp.coordinates.coordinates=column.pickUp.coordinates.coordinates;
                h.pickUp.coordinates.type=column.pickUp.coordinates.type;
                h.pickUp.time=column.pickUp.time;
                h.__v=column.__v;
                h.assignTruck=column.assignTruck;
                h.trucker=column.trucker;
                h.crn=column.crn;

                ongoingList.push(h);
                $scope.ongoingList = ongoingList;
                console.log($scope.ongoingList);
            });
        })
        .error(function(data,status) {

        });

}]);