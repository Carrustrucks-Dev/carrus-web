/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module('carrus').controller('homeShipperCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){

    console.log("Home");
    $scope.bid={};
    $http.get('http://52.25.204.93:8080/api/v1/typeTruck')
        .success(function(data,status){
            var truckArray=[];
            var truck=data.data;
            truck.forEach(function(column){
                var h = {
                    _id: "",
                    typeTruckName: ""
                };
                h._id = column._id;
                h.typeTruckName = column.typeTruckName;
                truckArray.push(h);
                $scope.truckArray = truckArray;
               // console.log($scope.truckArray);
            })
        })
        .error(function(data,status){});

    $http.get('http://52.25.204.93:8080/api/v1/typeCargo')
        .success(function(data,status){
            var cargoArray=[];
            var cargo=data.data;
            cargo.forEach(function(column){
                var c = {
                    _id: "",
                    typeTruckName: ""
                };
                c._id = column._id;
                c.typeCargoName = column.typeCargoName;
                cargoArray.push(c);
                $scope.cargoArray = cargoArray;
                //console.log($scope.cargoArray);
            })
        })
        .error(function(data,status){});
    $scope.typeCargo=function(id,typename){
        $scope.bid.cargoType=id;
        $scope.bid.cargoName=typename;
    };
    $scope.truckType=function(id,typeTruck){
        $scope.bid.truckType=id;
        $scope.bid.truckName=typeTruck;
    };
    $scope.makeBid=function(){
        var bidForm = new FormData();
        bidForm.append("pickUpLocation",$scope.bid.pickUpLocation);
        bidForm.append("pickUpDate",$scope.bid.pickUpDate);
        /*bidForm.append("pickUpTime",$scope.bid.pickUpTime);
        */
        bidForm.append("pickUpTime",'1 AM - 4 AM');
        bidForm.append("DropOffLocation",$scope.bid.dropOffLocation);
        bidForm.append("DropOffDate",$scope.bid.dropOffDate);
        /*bidForm.append("DropOffTime",$scope.bid.dropOffTime);
*/      bidForm.append("DropOffTime",'1 PM - 4 PM');
        bidForm.append("cargoWeight",$scope.bid.cargoWeight);
        bidForm.append("cargoType",$scope.bid.cargoType);
        bidForm.append("truckType",$scope.bid.truckType);
        bidForm.append("truckNumber",$scope.bid.numberTrucks);
        bidForm.append("budget",$scope.bid.budget);
        bidForm.append("note",$scope.bid.note);

















        console.log($cookieStore.get('obj'));
        $http.post('http://52.25.204.93:8080/api/v1/shipper/bid',bidForm,{headers: {'Authorization': $cookieStore.get('obj')}})
            .success(function(data,status){console.log(data);
            console.log("Lucky")})
            .error(function(data,status){
                console.log("Not so Lucky")
            });

        };






}]);
