/**
 * Created by nightshifttushar on 10/29/15.
 */
angular.module('carrus').controller('bidClosedctrl',['$scope','$http','CONSTANT','$cookieStore','$state',function($scope,$http,CONSTANT,$cookieStore,$state){
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
    $scope.details={};
    $scope.details.poState="0";
    $scope.details.doState="0";
    $scope.mesg="No Record Found.";
    $scope.authErrorMsg="";
    $scope.rate = 1;
    $scope.max = 5;
    $scope.isReadonly = false;

    /*$scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };
*/
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
        $http.get("http://52.25.204.93:8080/api/v1/shipper/getAllBidClosed", {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
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
        $http.get("http://52.25.204.93:8080/api/v1/shipper/getAllBidClosed?limit=6&skip=" + $scope.skip + "&",{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
            .success(function(data,status){
                var closedList=[];
                console.log(data);
                var list=data.data;
                list.forEach(function(col){
                    var closed={
                        "_id": "",
                        "shipper": "",
                        "budget": 0,
                        "note": "",
                        "createdAt": "",
                        "paymentStatus": "",
                        "bidStatus": "",
                        "tracking": "",
                        "requestedDateTime": "",
                        "acceptPrice": 0,
                        "trucker": [],
                        "truck": {
                            "truckType": {
                                "_id": "",
                                "typeTruckName": ""
                            },
                            "truckNumber": 0,
                            "truck": []
                        },
                        "cargo": {
                            "weight": "",
                            "cargoType": {
                                "_id": "",
                                "typeCargoName": ""
                            }
                        },
                        "dropOff": {
                            "location": "",
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
                            "location": "",
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
                        "booking": [],
                        "__v": 0,
                        "fleetOwner": {
                            "_id": "",
                            "email": "",
                            "fullName": "",
                            "phoneNumber": ""
                        }
                    };
                    closed._id=col._id;
                    closed.shipper=col.shipper;
                    closed.budget=col.budget;
                    closed.note=col.note;
                    closed.createdAt=col.createdAt;
                    closed.paymentStatus=col.paymentStatus;
                    closed.bidStatus=col.bidStatus;
                    closed.tracking=col.tracking;
                    closed.requestedDateTime=col.requestedDateTime;
                    closed.acceptPrice=col.acceptPrice;
                    closed.trucker=col.trucker;
                    closed.truck.truckType._id=col.truck.truckType._id;
                    closed.truck.truckType.typeTruckName=col.truck.truckType.typeTruckName;
                    closed.truck.truckNumber=col.truck.truckNumber;
                    closed.truck.truck=col.truck.truck;
                    closed.cargo.weight=col.cargo.weight;
                    closed.cargo.cargoType._id=col.cargo.cargoType._id;
                    closed.cargo.cargoType.typeCargoName=col.cargo.cargoType.typeCargoName;
                    closed.dropOff.location=col.dropOff.location;
                    closed.dropOff.date=col.dropOff.date;
                    closed.dropOff.coordinates.coordinates=col.dropOff.coordinates.coordinates;
                    closed.dropOff.coordinates.type=col.dropOff.coordinates.type;
                    closed.dropOff.time=col.dropOff.time;
                    closed.pickUp.location=col.pickUp.location;
                    closed.pickUp.date=col.pickUp.date;
                    closed.pickUp.coordinates.coordinates=col.pickUp.coordinates.coordinates;
                    closed.pickUp.coordinates.type=col.pickUp.coordinates.type;
                    closed.pickUp.time=col.pickUp.time;
                    closed.booking=col.booking;
                    closed.__v=col.__v;
                    closed.fleetOwner._id=col.fleetOwner._id;
                    closed.fleetOwner.email=col.fleetOwner.email;
                    closed.fleetOwner.fullName=col.fleetOwner.fullName;
                    closed.fleetOwner.phoneNumber=col.fleetOwner.phoneNumber;

                    closedList.push(closed);
                    $scope.closedArray = closedList;
                });
                $scope.mesg="";
            })
            .error(function(data,status) {
                if(status=400){$scope.mesg="No Record Found."}
                if(status == 401){
                    alert("Your credentials have expired , try logging in again.");
                }
            });
    }
    $scope.mobileCheckDO=function (object) {


        if (parseInt($scope.details.doContactNumber)<6999999999) {
            $scope.details.doContactNumber="";
        }
    };
    $scope.mobileCheckPU=function (object) {
        if (parseInt($scope.details.puContactNumber)<6999999999) {
            $scope.details.puContactNumber="";
        }
    };
    $scope.zipCheckDO=function (object) {


        if (parseInt($scope.details.doZipCode)<109999) {
            $scope.details.doZipCode="";
        }
    };
    $scope.zipCheckPU=function (object) {
        if (parseInt($scope.details.puZipCode)<109999) {
            $scope.details.puZipCode="";
        }
    };




    /*$scope.checkMobileDO=function(object){
        if(object.placeholder=="Mobile Number"){
            $scope.details.doContactNumber="";

        }
        console.log($scope.details.doContactNumber);
        if($scope.details.doContactNumber==undefined||typeof $scope.details.doContactNumber=="undefined"||typeof $scope.details.doContactNumber==undefined){
            $scope.details.doContactNumber="";
        }
        console.log($scope.details.doContactNumber);
    };
    $scope.checkMobilePU=function(object){
        if(object.placeholder=="Mobile Number"){
            $scope.details.puContactNumber="";

        }
        console.log($scope.details.puContactNumber);
        if($scope.details.puContactNumber==undefined||typeof $scope.details.puContactNumber=="undefined"||typeof $scope.details.puContactNumber==undefined){
            $scope.details.puContactNumber="";
        }
        console.log($scope.details.puContactNumber);
    };*/
    console.log("closed bids");
    $scope.addDetailsModal = function(get_data){
        $('#addDetailsModal').modal(options);
        $scope.details.bidId=get_data._id;
        $scope.details.puCompanyName="";
        $scope.details.puName="";
        $scope.details.puTin="";
        $scope.details.puContactNumber="";
        $scope.details.puAddress="";
        $scope.details.puCity=get_data.pickUp.location;
        if(get_data.pickUp.location=="chandigarh"||get_data.pickUp.location=="Chandigarh")
        {
            $scope.details.pickUpLat="30.75";
            $scope.details.pickUpLong="76.78";
        }
        if(get_data.pickUp.location=="Punjab"||get_data.pickUp.location=="punjab")
        {
            $scope.details.pickUpLat="30.79";
            $scope.details.pickUpLong="76.78";
        }if(get_data.pickUp.location=="delhi")
        {
            $scope.details.pickUpLat="28.61";
            $scope.details.pickUpLong="77.23";
        }if(get_data.pickUp.location=="Andhra Pradesh")
        {
            $scope.details.pickUpLat="16.50";
            $scope.details.pickUpLong="80.64";
        }if(get_data.pickUp.location=="Arunachal Pradesh")
        {
            $scope.details.pickUpLat="27.06";
            $scope.details.pickUpLong="93.37";
        }if(get_data.pickUp.location=="Goa")
        {
            $scope.details.pickUpLat="15.49";
            $scope.details.pickUpLong="73.82";
        }
        if(get_data.pickUp.location=="Haryana")
        {
            $scope.details.pickUpLat="30.73";
            $scope.details.pickUpLong="76.78";
        }
        if(get_data.pickUp.location=="Uttar Pradesh")
        {
            $scope.details.pickUpLat="26.85";
            $scope.details.pickUpLong="80.91";
        }

        $scope.details.puState="0";
        $scope.details.puZipCode="";

        $scope.details.doCompanyName="";
        $scope.details.doName="";
        $scope.details.doTin="";
        $scope.details.doContactNumber="";
        $scope.details.doAddress="";
        $scope.details.doCity=get_data.dropOff.location;
        if(get_data.dropOff.location=="chandigarh"||get_data.dropOff.location=="Chandigarh")
        {
            $scope.details.dropOffLat="30.75";
            $scope.details.dropOffLat="76.78";
        }
        if(get_data.dropOff.location=="Punjab"||get_data.dropOff.location=="punjab")
        {
            $scope.details.dropOffLat="30.79";
            $scope.details.dropOffLong="76.78";
        }if(get_data.dropOff.location=="delhi")
        {
            $scope.details.dropOffLat="28.61";
            $scope.details.dropOffLong="77.23";
        }if(get_data.dropOff.location=="Andhra Pradesh")
        {
            $scope.details.dropOffLat="16.50";
            $scope.details.dropOffLong="80.64";
        }if(get_data.dropOff.location=="Arunachal Pradesh")
        {
            $scope.details.dropOffLat="27.06";
            $scope.details.dropOffLong="93.37";
        }if(get_data.dropOff.location=="Goa")
        {
            $scope.details.dropOffLat="15.49";
            $scope.details.dropOffLong="73.82";
        }
        if(get_data.dropOff.location=="Haryana")
        {
            $scope.details.dropOffLat="30.73";
            $scope.details.dropOffLong="76.78";
        }
        if(get_data.dropOff.location=="Uttar Pradesh")
        {
            $scope.details.dropOffLat="26.85";
            $scope.details.dropOffLong="80.91";
        }


        $scope.details.doState="0";
        $scope.details.doZipCode="";
        $scope.details.paymentMode="CASH";
        $scope.details.paymentOn="PICK";
        $scope.details.jobNote="";
    };
    $scope.closeModal=function(){
        $('body').off('wheel.modal mousewheel.modal');
    };






    $scope.addDetails=function(){

        if($scope.details.bidId!=""&&
        $scope.details.puCompanyName!=""&&
        $scope.details.puName!=""&&
        $scope.details.puTin!=""&&
        $scope.details.puContactNumber!=""&&
        $scope.details.puAddress!=""&&
        $scope.details.puState!="0"&&
        $scope.details.puZipCode!=""&&
        /*$scope.details.pickUpLong!="0"&&
        $scope.details.pickUpLat!="0"&&*/
        $scope.details.doCompanyName!=""&&
        $scope.details.doName!=""&&
        $scope.details.doTin!=""&&
        $scope.details.doContactNumber!=""&&
        $scope.details.doAddress!=""&&
        $scope.details.doState!="0"&&
        $scope.details.doZipCode!=""&&
        /*$scope.details.dropOffLong!="0"&&
        $scope.details.dropOffLat!="0"&&*/
        ($scope.details.paymentMode!="CASH"||$scope.details.paymentMode!="ONLINE")&&
        ($scope.details.paymentOn!="PICK"||$scope.details.paymentOn!="DELIVERY")&&
        $scope.details.jobNote!="") {

            var formData=new FormData();
            formData.append("bidId", $scope.details.bidId);
            formData.append("puCompanyName", $scope.details.puCompanyName);
            formData.append("puName", $scope.details.puName);
            formData.append("puTin", $scope.details.puTin);
            formData.append("puContactNumber", $scope.details.puContactNumber);
            formData.append("puAddress", $scope.details.puAddress);
            formData.append("puCity", $scope.details.puCity);
            formData.append("puState", $scope.details.puState);
            formData.append("puZipCode", $scope.details.puZipCode);
            formData.append("pickUpLong", $scope.details.pickUpLong);
            formData.append("pickUpLat", $scope.details.pickUpLat);
            /*formData.append("pickUpLong","0");
             formData.append("pickUpLat", "0");*/
            formData.append("doCompanyName", $scope.details.doCompanyName);
            formData.append("doName", $scope.details.doName);
            formData.append("doTin", $scope.details.doTin);
            formData.append("doContactNumber", $scope.details.doContactNumber);
            formData.append("doAddress", $scope.details.doAddress);
            formData.append("doCity", $scope.details.doCity);
            formData.append("doState", $scope.details.doState);
            formData.append("doZipCode", $scope.details.doZipCode);
            formData.append("dropOffLong", $scope.details.dropOffLong);
            formData.append("dropOffLat", $scope.details.dropOffLat);
            /* formData.append("dropOffLong","0");
             formData.append("dropOffLat", "0");*/
            formData.append("paymentMode", $scope.details.paymentMode);
            formData.append("paymentOn", $scope.details.paymentOn);
            /*formData.append("promoCode", $scope.details.);*/
            formData.append("jobNote", $scope.details.jobNote);



            $http.post(CONSTANT.apiURL + 'api/v1/shipper/addDetails', formData, {
                headers: {
                    'Authorization': $cookieStore.get('obj').accessToken,
                    'Content-Type': undefined
                }
            })
                .success(function (data, status) {
                    alert("Booking created Successfully.");
                    $('#addDetailsModal').modal('hide');
                    $state.reload();
                })
                .error(function (data, status) {
                    if (status == 401) {
                        alert("Your credentials have expired , try logging in again.");
                    }
                    if(status==400&&data.message=="for more than one truck cash payment mode not allow.")$scope.authErrorMsg="Payment Mode can't be 'Cash' if more than 1 trucks are chosen";
                    else alert("Try again");
                });
        }
        else {

            console.log($scope.details.puState , $scope.details.doState );
            if($scope.details.puCompanyName=="") {$scope.authErrorMsg="Pick Up : Company name can't be empty";return }
            if($scope.details.puName=="") {$scope.authErrorMsg="Pick Up : Name can't be empty";return}
            if($scope.details.puTin=="") {$scope.authErrorMsg="Pick Up : TIN can't be empty";return}
            if($scope.details.puContactNumber=="") {$scope.authErrorMsg="Pick Up : Choose a valid Mobile Number";return}
            if($scope.details.puAddress=="") {$scope.authErrorMsg="Pick Up : Address can't be empty";return}
            if($scope.details.puState=="0") {$scope.authErrorMsg="Pick Up : Choose a State";return}
            if($scope.details.puZipCode=="") {$scope.authErrorMsg="Pick Up : Enter a valid Zip Code";return}
            if($scope.details.doCompanyName=="") {$scope.authErrorMsg="Drop Off : Company name can't be empty";return}
            if($scope.details.doName=="") {$scope.authErrorMsg="Drop Off : Name can't be empty";return}
            if($scope.details.doTin=="") {$scope.authErrorMsg="Drop Off : TIN can't be empty";return}
            if($scope.details.doContactNumber=="") {$scope.authErrorMsg="Drop Off : Choose a valid Mobile Number";return}
            if($scope.details.doAddress=="") {$scope.authErrorMsg="Drop Off : Address can't be empty";return}
            if($scope.details.doState=="0") {$scope.authErrorMsg="Drop Off : Choose a State";return}
            if($scope.details.doZipCode=="") {$scope.authErrorMsg="Drop Off : Enter a valid Zip Code";return}
            if($scope.details.jobNote=="") {$scope.authErrorMsg="Enter the cargo details";}




        }
    };
    $scope.removeAuth=function(){
        if($scope.authErrorMsg!=""){
            $scope.authErrorMsg="";
        }

    };
}]);