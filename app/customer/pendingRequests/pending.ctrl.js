/**
 * Created by nightshifttushar on 10/29/15.
 */
angular.module('carrus').controller('pendingctrl',['$scope','$location','$http','CONSTANT','$cookieStore','$filter', function($scope,$location,$http,CONSTANT,$cookieStore,$filter){
    $scope.bid={};
    $scope.getCurrentPath = function()
    {
        return $location.path();
    };
    $scope.mesg="No Record Found.";
    $scope.initQuotes=function(){

        $http.get(CONSTANT.apiURL+"api/v1/shipper/allBid",{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
            .success(function(data,status){
                console.log(data);
                var bid=data.data[0];
                $scope.bidIndex=0;
                var bidList=[];
                var bids=data.data;
                bids.forEach(function(column){
                    var bidsL={};
                    bidsL=column;
                    bidList.push(bidsL);
                    /*console.log(bidsL);*/
                    $scope.bidsList=bidList;
                    /*console.log($scope.bidsList);
                     console.log($scope.bidsList.length);*/

                });

                /*if(bid.bidStatus!="QUOTE_ACCEPTED")*/
                $scope.bid=bid;
                $scope.getQuotes(bid._id);
                $scope.mesg="";
                /* $scope.cargoType(bid.cargo.cargoType);
                 $scope.truckType(bid.truck.truckType);*/
                $scope.bid.truckTypeName=bid.truck.truckType.typeTruckName;
                $scope.bid.cargoTypeName=bid.cargo.cargoType.typeCargoName;
                $scope.bid=bid;
                $scope.bid.dodate = $filter('date')($scope.bid.dropOff.date, 'dd MMM');
                $scope.bid.pudate = $filter('date')($scope.bid.pickUp.date, 'dd MMM');
            })
            .error(function(data,status){
                console.log("Error");
                if(status == 401){
                    alert("Your credentials have expired , try logging in again.");
                }
                if(status==400){
                    if(data.message=="No Record Found.")
                        $scope.mesg="No Record Found.";
                }
            });
    };
    $scope.initQuotes();
    //setInterval(function(){$scope.initQuotes()},10000);
    $scope.leftBid=function(index){
        /*console.log("left");
        console.log(index);
        console.log($scope.bidsList[index]);*/
        --index;

        if(index>-1)
        {
            var id=$scope.bidsList[index]._id;

            --$scope.bidIndex;
            $scope.getQuotes(id);
            $scope.bid=$scope.bidsList[index];
            $scope.bid.truckTypeName=$scope.bidsList[index].truck.truckType.typeTruckName;
            $scope.bid.cargoTypeName=$scope.bidsList[index].cargo.cargoType.typeCargoName;
            $scope.bid.dodate = $filter('date')($scope.bid.dropOff.date, 'dd MMM');
            $scope.bid.pudate = $filter('date')($scope.bid.pickUp.date, 'dd MMM');
        }
    };
    $scope.rightBid=function(index){
        /*console.log("right");
        console.log(index);
        console.log($scope.bidsList[index]);*/
        ++index;
        if(index<$scope.bidsList.length)
        {
            var id=$scope.bidsList[index]._id;
            ++$scope.bidIndex;
            $scope.getQuotes(id);
            $scope.bid=$scope.bidsList[index];
            $scope.bid.truckTypeName=$scope.bidsList[index].truck.truckType.typeTruckName;
            $scope.bid.cargoTypeName=$scope.bidsList[index].cargo.cargoType.typeCargoName;
            $scope.bid.dodate = $filter('date')($scope.bid.dropOff.date, 'dd MMM');
            $scope.bid.pudate = $filter('date')($scope.bid.pickUp.date, 'dd MMM');

        }
    };
    $scope.getQuotes=function(BId){
        $scope.quotes=[];
        $http.get(CONSTANT.apiURL+"api/v1/shipper/bid/allQuotes?bidId="+BId,{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
            .success(function(data,status){
                $scope.quotes=[];

                var list=data.data;
                var quoteList=[];
                list.forEach(function(column){
                    var q={
                        fleetOwner:{
                            _id:"",
                            email:"",
                            fullName:""
                        }
                    };
                    console.log(column.fleetOwner);
                    q.__v=column.__v;
                    q._id=column._id;
                    q.bid=column.bid;
                    q.createdAt=column.createdAt;
                    q.fleetOwner._id=column.fleetOwner._id;
                    q.fleetOwner.email=column.fleetOwner.email;
                    q.fleetOwner.fullName=column.fleetOwner.fullName;
                    q.note=column.note;
                    q.offerCost=column.offerCost;
                    q.quotestatus=column.quoteStatus;
                    q.shipper=column.shipper;
                    q.tracking=column.tracking;
                    quoteList.push(q);
                    $scope.quotes = quoteList;
                    console.log($scope.quotes);
                })
            })
            .error(function(data,status){
                /*console.log("Error");*/
                if(status == 401){
                    alert("Your credentials have expired , try logging in again.");
                }

            });
    };




    $scope.cargoType=function(id){


        $http.get('http://52.25.204.93:8080/api/v1/typeCargo')
            .success(function(data,status){
                var cargoArray=[];
                var cargo=data.data;
                cargo.forEach(function(column){
                    var c = {
                        _id: "",
                        typeCargoName: ""
                    };
                    c._id = column._id;
                    c.typeCargoName = column.typeCargoName;
                    cargoArray.push(c);
                    $scope.cargoArray = cargoArray;


                });
                console.log($scope.cargoArray.length);
                console.log("cargoid ",id);
                var i;
                for(i=0;i<$scope.cargoArray.length;i++){
                    /*console.log($scope.cargoArray[i]);*/
                    if(id==$scope.cargoArray[i]._id){
                        /*console.log("found");*/
                        $scope.bid.cargoTypeName=$scope.cargoArray[i].typeCargoName;
                    }
                }
            })
            .error(function(data,status){});

    };
    $scope.truckType=function(id){
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

                });
                console.log($scope.truckArray.length);
                console.log("truckid ",id);
                var i;
                for(i=0;i<$scope.truckArray.length;i++){
                    /*console.log($scope.truckArray[i]);*/
                    if(id==$scope.truckArray[i]._id){
                        console.log("found");
                        $scope.bid.truckTypeName=$scope.truckArray[i].typeTruckName;
                    }
                }
            })
            .error(function(data,status){});


    }

}]);