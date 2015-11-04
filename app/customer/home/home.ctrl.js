/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module('carrus').controller('homeShipperCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){
    $scope.authMsg="";
    console.log("Home");
    $scope.bid={};
    $scope.bid.pickUpTime="0";
    $scope.bid.dropOffTime="0";
    $scope.bid.cargoName="Type of Cargo";
    $scope.bid.truckName="Choose Truck";

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

    $scope.init=function() {
        $scope.mytime = new Date();

        var my = new Date($scope.mytime);
        my.setHours(0);
        my.setMinutes(0);
        my.setSeconds(0);
        $scope.mytime1 = my;
    };
    $scope.init();
    $scope.dateOptions = {
        formatYear: 'yy',showWeeks: false,
        startingDay: 1
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['YYYY-MM-DD','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.close1=function(){
        $scope.opened1=false;
        console.log($scope.bid.pickUpDate);

    };
    $scope.open1 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened1 = true;
    };
    $scope.close2=function(){
        $scope.opened2=false;
        console.log($scope.bid.dropOffDate);

    };
    $scope.open2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened2 = true;
    };
    $scope.makeBid=function(){
        $scope.bid.pickUpDate=moment($scope.bid.pickUpDate).format('YYYY-MM-DD');
        console.log($scope.bid.pickUpDate);
        $scope.bid.dropOffDate=moment($scope.bid.dropOffDate).format('YYYY-MM-DD');
        console.log($scope.bid.dropOffDate);
        var bidForm = new FormData();
        bidForm.append("pickUpLocation",$scope.bid.pickUpLocation);
        bidForm.append("pickUpDate",$scope.bid.pickUpDate);
        bidForm.append("pickUpTime",$scope.bid.pickUpTime);
       /* bidForm.append("pickUpTime",'1 AM - 4 AM');*/
        bidForm.append("DropOffLocation",$scope.bid.dropOffLocation);
        bidForm.append("DropOffDate",$scope.bid.dropOffDate);
        bidForm.append("DropOffTime",$scope.bid.dropOffTime);
        /*bidForm.append("DropOffTime",'1 PM - 4 PM');*/
        bidForm.append("cargoWeight",$scope.bid.cargoWeight);
        bidForm.append("cargoType",$scope.bid.cargoType);
        bidForm.append("truckType",$scope.bid.truckType);
        bidForm.append("truckNumber",$scope.bid.numberTrucks);
        bidForm.append("budget",$scope.bid.budget);
        bidForm.append("note",$scope.bid.note);

 console.log($cookieStore.get('obj'));
        $http.post('http://52.25.204.93:8080/api/v1/shipper/bid',bidForm,{headers: {'Authorization': $cookieStore.get('obj').accessToken,'Content-Type':undefined}})
            .success(function(data,status){console.log(data);
            console.log("Lucky");
                $scope.bid={};
            $scope.authMsg="Bid created successfully";})
            .error(function(data,status){
                console.log("Not so Lucky")
            });

        };






}]);
