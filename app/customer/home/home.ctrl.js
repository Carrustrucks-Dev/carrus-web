/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module('carrus').controller('homeShipperCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){
    $scope.authMsg="";
    $scope.authErrorMsg="";

    function initBid(){
    $scope.bid={};
    $scope.bid.pickUpTime="0";
    $scope.bid.dropOffTime="0";
    $scope.bid.cargoName="Type of Cargo";
    $scope.bid.truckName="Choose Truck";
    $scope.bid.pickUpLocation = "Location";
    $scope.bid.pickUpDate = "";
    $scope.bid.dropOffLocation = "Location";
    $scope.bid.dropOffDate = "";
    $scope.bid.cargoWeight = "";
    $scope.bid.cargoType = "";
    $scope.bid.truckType = "";
    $scope.bid.numberTrucks = "";
    $scope.bid.budget = "";
    $scope.bid.note="";
    }
    initBid();


    $scope.budget=function(budget){

        $("#budget").css("padding-left","15px");
        /*console.log(budget);*/
        if(budget!=null){
            $("#budget").css("padding-left","25px");
        }


    };
    $scope.locatePick=function(location){
        $scope.bid.pickUpLocation=location;

    };
    $scope.locateDrop=function(location){
        $scope.bid.dropOffLocation=location;

    };
    $scope.typeCargo=function(id,typename){
        $scope.bid.cargoType=id;
        $scope.bid.cargoName=typename;
    };
    $scope.truckType=function(id,typeTruck){
        $scope.bid.truckType=id;
        $scope.bid.truckName=typeTruck;
    };
    $scope.removeAuth=function(){
      if($scope.authMsg!=""){
          $scope.authMsg="";
      }
        if($scope.authErrorMsg!=""){
            $scope.authErrorMsg="";
        }
        /*console.log($scope.authMsg);*/
        $("#Error").hide();
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
    $scope.formats = ['dd MMM , yyyy','YYYY-MM-DD','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.close1=function(){
        $scope.opened1=false;
        /*console.log($scope.bid.pickUpDate);*/
        if($scope.bid.dropOffDate!=''&&$scope.bid.dropOffDate.getDate()<$scope.bid.pickUpDate.getDate())
        {   $scope.bid.dropOffDate=undefined;
            $scope.bid.dropOffTime="0";
            $scope.bid.pickUpTime="0";
            $scope.bid.dropOffTime="0";
        }
        else if($scope.bid.dropOffDate!=''&&$scope.bid.dropOffDate.getDate()>$scope.bid.pickUpDate.getDate()){
            $scope.initTime();
        }
        else if ($scope.bid.dropOffDate!=''&&$scope.bid.dropOffDate.getDate()==$scope.bid.pickUpDate.getDate()){
            $scope.putime();
        }
           };
    $scope.open1 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened1 = true;
    };
    $scope.close2=function(){
        $scope.opened2=false;
       /* console.log($scope.bid.dropOffDate);*/
        $scope.putime();
    };
    $scope.open2 = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened2 = true;
    };
    $scope.initTime=function(){
        $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", false);
        $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", false);
        $('.dropTime option[value="9 AM - 12 AM"]').attr("disabled", false);
        $('.dropTime option[value="1 PM - 4 PM"]').attr("disabled", false);
        $('.dropTime option[value="5 PM - 8 PM"]').attr("disabled", false);
        $('.dropTime option[value="9 PM - 12 PM"]').attr("disabled", false);
    };
    $scope.putime=function(){
        /*console.log($scope.bid.pickUpDate);
        console.log($scope.bid.dropOffDate);*/
        $scope.bid.dropOffTime="0";
        $scope.initTime();
        /*console.log($scope.bid.dropOffDate.getDate()==$scope.bid.pickUpDate.getDate());*/
        if($scope.bid.pickUpDate.getDate()==$scope.bid.dropOffDate.getDate()){
            if($scope.bid.pickUpTime=="0")$scope.bid.dropOffTime="0";
            if($scope.bid.pickUpTime=="1 AM - 4 AM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
            }
            if($scope.bid.pickUpTime=="5 AM - 8 AM")
            {   $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
            }
            if($scope.bid.pickUpTime=="9 AM - 12 AM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
                $('.dropTime option[value="9 AM - 12 AM"]').attr("disabled", true);
            }
            if($scope.bid.pickUpTime=="1 PM - 4 PM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
                $('.dropTime option[value="9 AM - 12 AM"]').attr("disabled", true);
                $('.dropTime option[value="1 PM - 4 PM"]').attr("disabled", true);
            }
            if($scope.bid.pickUpTime=="5 PM - 8 PM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
                $('.dropTime option[value="9 AM - 12 AM"]').attr("disabled", true);
                $('.dropTime option[value="1 PM - 4 PM"]').attr("disabled", true);
                $('.dropTime option[value="5 PM - 8 PM"]').attr("disabled", true);
            }
            if($scope.bid.pickUpTime=="9 PM - 12 PM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
                $('.dropTime option[value="9 AM - 12 AM"]').attr("disabled", true);
                $('.dropTime option[value="1 PM - 4 PM"]').attr("disabled", true);
                $('.dropTime option[value="5 PM - 8 PM"]').attr("disabled", true);
                $('.dropTime option[value="9 PM - 12 PM"]').attr("disabled", true);
            }

        }
        else{
            $scope.initTime();
        }
   };
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
    $http.get('http://52.25.204.93:8080/api/v1/state/getState')
        .success(function(data,status){
            var locationArray=[];
            var location=data.data;
            var locate ="";
            location.forEach(function(column){

                locate=column;
                locationArray.push(locate);
                $scope.locationArray = locationArray;

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
    $scope.makeBid=function() {
        console.log($scope.bid.pickUpLocation);
        console.log($scope.bid.pickUpDate);
        console.log($scope.bid.pickUpTime);
        console.log($scope.bid.dropOffLocation);
        console.log($scope.bid.dropOffDate);
        console.log($scope.bid.dropOffTime);
        console.log($scope.bid.cargoWeight);
        console.log($scope.bid.cargoType);
        console.log($scope.bid.truckType);
        console.log($scope.bid.numberTrucks);
        console.log($scope.bid.budget);
        console.log($scope.bid.note);

        if ($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
            && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!='') {
            $scope.bid.pickUpDate = moment($scope.bid.pickUpDate).format('YYYY-MM-DD');
            /*console.log($scope.bid.pickUpDate);*/
            $scope.bid.dropOffDate = moment($scope.bid.dropOffDate).format('YYYY-MM-DD');
            /*console.log($scope.bid.dropOffDate);*/
            var bidForm = new FormData();
            bidForm.append("pickUpLocation", $scope.bid.pickUpLocation);
            bidForm.append("pickUpDate", $scope.bid.pickUpDate);
            bidForm.append("pickUpTime", $scope.bid.pickUpTime);
            bidForm.append("DropOffLocation", $scope.bid.dropOffLocation);
            bidForm.append("DropOffDate", $scope.bid.dropOffDate);
            bidForm.append("DropOffTime", $scope.bid.dropOffTime);
            bidForm.append("cargoWeight", $scope.bid.cargoWeight);
            bidForm.append("cargoType", $scope.bid.cargoType);
            bidForm.append("truckType", $scope.bid.truckType);
            bidForm.append("truckNumber", $scope.bid.numberTrucks);
            bidForm.append("budget", $scope.bid.budget);
            bidForm.append("note", $scope.bid.note);

            console.log($cookieStore.get('obj'));
            $http.post('http://52.25.204.93:8080/api/v1/shipper/bid', bidForm, {
                headers: {
                    'Authorization': $cookieStore.get('obj').accessToken,
                    'Content-Type': undefined
                }
            })
                .success(function (data, status) {
                    console.log(data);
                    console.log("Lucky");
                    initBid();
                    $scope.authMsg = "Bid created successfully";
                    $scope.authErrorMsg="";
                })
                .error(function (data, status) {
                    console.log("Not so Lucky");
                    if(data.message=="No Fleet Owner for this pick up location.")
                    $scope.authErrorMsg="No Fleet Owner for this pick up location.";
                    if (status == 401) {
                        alert("Your credentials have expired , try logging in again.");
                    }
                    if(data.message="Cannot create booking of past.")
                        $scope.authErrorMsg="Cannot create booking of past."
                });

        }

        else {
            if($scope.bid.pickUpLocation == "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the pick up location";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate == "" && $scope.bid.pickUpTime != "" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the pick up date";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime == "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the pick up time";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation == "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the drop off location";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate == "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the pick up date";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime == "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the drop off time";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight == "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the cargo weight";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType == "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the type of cargo";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType == "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the type of truck";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks == "" && $scope.bid.budget != "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the number of trucks required";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget == "" && $scope.bid.note!= "")
            {
                $scope.authErrorMsg="Enter the budget";
            }
            if($scope.bid.pickUpLocation != "Location" && $scope.bid.pickUpDate != "" && $scope.bid.pickUpTime != "0" && $scope.bid.dropOffLocation != "" && $scope.bid.dropOffDate != "" && $scope.bid.dropOffTime != "0"
                && $scope.bid.cargoWeight != "" && $scope.bid.cargoType != "Type of Cargo" && $scope.bid.truckType != "Choose Truck" && $scope.bid.numberTrucks != "" && $scope.bid.budget != "" && $scope.bid.note=="")
            {
                $scope.authErrorMsg="Enter the note";
            }
            if($scope.bid.pickUpLocation == "Location" && $scope.bid.pickUpDate == "" && $scope.bid.pickUpTime == "0" && $scope.bid.dropOffLocation == "" && $scope.bid.dropOffDate == "" && $scope.bid.dropOffTime == "0"
                && $scope.bid.cargoWeight == "" && $scope.bid.cargoType == "" && $scope.bid.truckType == "" && $scope.bid.numberTrucks == "" && $scope.bid.budget == "" && $scope.bid.note=="")
            {
                $scope.authErrorMsg="Enter all the details first";
            }
            else {
                if ($scope.bid.pickUpLocation == "Location") $scope.authErrorMsg = "Enter the pick up location";
                else if ($scope.bid.pickUpDate == "") $scope.authErrorMsg = "Enter the pick up date";
                else if ($scope.bid.pickUpTime == "") $scope.authErrorMsg = "Enter the pick up time";
                else if ($scope.bid.dropOffLocation == "") $scope.authErrorMsg = "Enter the drop off location";
                else if ($scope.bid.dropOffDate == "") $scope.authErrorMsg = "Enter the drop off date";
                else if ($scope.bid.dropOffTime == "") $scope.authErrorMsg = "Enter the drop off time";
                else if ($scope.bid.cargoWeight == "") $scope.authErrorMsg = "Enter the cargo weight";
                else if ($scope.bid.cargoType == "") $scope.authErrorMsg = "Enter the type of cargo";
                else if ($scope.bid.truckType == "") $scope.authErrorMsg = "Enter the type of truck";
                else if ($scope.bid.numberTrucks == "") $scope.authErrorMsg = "Enter the number of trucks required";
                else if ($scope.bid.budget == "") $scope.authErrorMsg = "Enter the budget";
                else if ($scope.bid.note == "") $scope.authErrorMsg = "Enter the note";
            }

        }

    };



}]);
