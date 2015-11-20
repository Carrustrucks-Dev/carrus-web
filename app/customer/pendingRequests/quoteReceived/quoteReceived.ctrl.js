/**
 * Created by nightshifttushar on 10/29/15.
 */
angular.module('carrus').controller('quoteReceivedctrl',['$scope','$http','CONSTANT','$cookieStore','$state',function($scope,$http,CONSTANT,$cookieStore,$state){

    $scope.rate = 1;
    $scope.max = 5;
    $scope.isReadonly = false;
    $('.carousel').carousel({interval:false});


    console.log("Quotes Received");
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
    $scope.closeModal=function(){
        $('body').off('wheel.modal mousewheel.modal');
    };

    $scope.modifyForm = function(data){
        console.log(data);
        $scope.initModify(data);
        $('#modifyModal').modal(options);
       /* $('body').on('wheel.modal mousewheel.modal', function () {
            return false;
        });*/
    };
    $scope.acceptModal = function(qID,bID,full){
        $scope.fullName=full;
        $scope.quoteID=qID;
        $scope.bidID=bID;
        $('#acceptModal').modal(options);
        /*$('body').on('wheel.modal mousewheel.modal', function () {
            return false;
        });*/
    };

    $scope.initModify=function(data){
        console.log(data);
        $scope.modData=data;
        function init(){
            $scope.modify={};
            $scope.modify._id=$scope.modData._id
            $scope.modify.pickUpTime=$scope.modData.pickUp.time;
            $scope.modify.dropOffTime=$scope.modData.dropOff.time;
            $scope.modify.cargoName=$scope.modData.cargoTypeName;
            $scope.modify.truckName=$scope.modData.truckTypeName;
            $scope.modify.pickUpLocation = $scope.modData.pickUp.location;
            $scope.modify.pickUpDate = new Date($scope.modData.pickUp.date);
            $scope.modify.dropOffLocation = $scope.modData.dropOff.location;
            $scope.modify.dropOffDate = new Date($scope.modData.dropOff.date);
            $scope.modify.cargoWeight = parseInt($scope.modData.cargo.weight);
            $scope.modify.cargoType = $scope.modData.cargo.cargoType._id;
            $scope.modify.truckType = $scope.modData.truck.truckType._id;
            $scope.modify.numberTrucks = $scope.modData.truck.truckNumber;
            $scope.modify.budget = $scope.modData.budget;
            $scope.modify.note=$scope.modData.note;
        }
        init();
        $scope.putime();
        $scope.modify.dropOffTime = $scope.modData.dropOff.time;
    };
    $scope.locate=function(location){
        $scope.modify.pickUpLocation=location;

    };
    $scope.typeCargo=function(id,typename){
        $scope.modify.cargoType=id;
        $scope.modify.cargoName=typename;
    };
    $scope.truckType=function(id,typeTruck){
        $scope.modify.truckType=id;
        $scope.modify.truckName=typeTruck;
    };
    $scope.removeAuth=function(){
        if($scope.authMsg!=""){
            $scope.authMsg="";
        }
        if($scope.authErrorMsg!=""){
            $scope.authErrorMsg="";
        }

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
        format:'dd MMM , yyyy',
        startingDay: 1
    };

    $scope.initDate = new Date();
    $scope.formats = ['dd MMM , yyyy','YYYY-MM-DD','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.close1=function(){
        $scope.opened1=false;
        console.log($scope.modify.pickUpDate);
        if($scope.modify.dropOffDate!=''&&$scope.modify.dropOffDate.getDate()<$scope.modify.pickUpDate.getDate())
        {   $scope.modify.dropOffDate=undefined;
            $scope.modify.dropOffTime="0";
            $scope.modify.pickUpTime="0";
            $scope.modify.dropOffTime="0";
        }
        else if($scope.modify.dropOffDate!=''&&$scope.modify.dropOffDate.getDate()>$scope.modify.pickUpDate.getDate()){
            $scope.initTime();
        }
        else if ($scope.modify.dropOffDate!=''&&$scope.modify.dropOffDate.getDate()==$scope.modify.pickUpDate.getDate()){
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
        console.log($scope.modify.dropOffDate);
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
    }
    $scope.putime=function(){
        console.log($scope.modify.pickUpDate);
        console.log($scope.modify.dropOffDate);
        $scope.modify.dropOffTime="0";
        $scope.initTime();
        console.log($scope.modify.dropOffDate.getDate()==$scope.modify.pickUpDate.getDate());
        if($scope.modify.pickUpDate.getDate()==$scope.modify.dropOffDate.getDate()){
            if($scope.modify.pickUpTime=="0")$scope.modify.dropOffTime="0";
            if($scope.modify.pickUpTime=="1 AM - 4 AM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
            }
            if($scope.modify.pickUpTime=="5 AM - 8 AM")
            {   $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
            }
            if($scope.modify.pickUpTime=="9 AM - 12 AM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
                $('.dropTime option[value="9 AM - 12 AM"]').attr("disabled", true);
            }
            if($scope.modify.pickUpTime=="1 PM - 4 PM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
                $('.dropTime option[value="9 AM - 12 AM"]').attr("disabled", true);
                $('.dropTime option[value="1 PM - 4 PM"]').attr("disabled", true);
            }
            if($scope.modify.pickUpTime=="5 PM - 8 PM")
            {
                $('.dropTime option[value="1 AM - 4 AM"]').attr("disabled", true);
                $('.dropTime option[value="5 AM - 8 AM"]').attr("disabled", true);
                $('.dropTime option[value="9 AM - 12 AM"]').attr("disabled", true);
                $('.dropTime option[value="1 PM - 4 PM"]').attr("disabled", true);
                $('.dropTime option[value="5 PM - 8 PM"]').attr("disabled", true);
            }
            if($scope.modify.pickUpTime=="9 PM - 12 PM")
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


    $scope.accept=function(){
        if(confirm("Are you sure you want to accept the quote ? ")) {
            $http.put(CONSTANT.apiURL + 'api/v1/shipper/acceptQuote', {
                "quoteId": $scope.quoteID,
                "bidId": $scope.bidID
            }, {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
                .success(function (data, status) {
                    alert("Quote Accepted Successfully");
                    $scope.bid = {};
                    $('#acceptModal').modal('hide');
                    $scope.closeModal();
                    $state.reload();
                })
                .error(function (data, status) {
                    if (status == 401) {
                        alert("Your credentials have expired , try logging in again.");
                    }
                    if (data.message = "You are not authorize to modify quote because for this bid quote already accepted.")
                        alert("You are not authorized to modify quote because a quote for this bid is already accepted.");

                    else    alert("Try again");
                });
        }
    };

    $scope.ignoreQuote=function(qID,bID){
        if(confirm("Are you sure you want to ignore the quote ? "+bID)) {
            $http.put(CONSTANT.apiURL + 'api/v1/shipper/ignoreQuote', {
                "quoteId": qID,
                "bidId": bID
            }, {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
                .success(function (data, status) {
                    alert("Quote Rejected Successfully");
                    $scope.bid = {};
                    $state.reload();
                })
                .error(function (data, status) {
                    if(status == 401){
                        alert("Your credentials have expired , try logging in again.");
                    }
                    if (data.message == "Accepted Quote") alert("Already Accepted Quote");
                    else alert("Try again");
                });
        }
        /*console.log(qID," ",bID);*/

    };
    $scope.cancelBid=function(bID){
        if(confirm("Are you sure you want to cancel the bid ? "+bID))
        {
            $http.put(CONSTANT.apiURL + 'api/v1/shipper/cancelBid/' + bID, {
                "bidStatus": "CANCELED"
            }, {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
                .success(function (data, status) {
                    alert("Bid cancelled Successfully");
                    $state.reload();
                })
                .error(function (data, status) {
                    if(status == 401){
                        alert("Your credentials have expired , try logging in again.");
                    }
                    else alert("Try again");
                });
        }
        /*console.log(qID," ",bID);*/

    };


    $scope.modifyBid=function(BidID) {
        if (confirm("Are you sure you want to modify the bid ?")) {
            $scope.modify.pickUpDate = moment($scope.modify.pickUpDate).format('YYYY-MM-DD');
            console.log($scope.modify.pickUpDate);
            $scope.modify.dropOffDate = moment($scope.modify.dropOffDate).format('YYYY-MM-DD');
            console.log($scope.modify.dropOffDate);
            var formData = new FormData();
            formData.append("pickUpLocation", $scope.modify.pickUpLocation);
            formData.append("pickUpDate", $scope.modify.pickUpDate);
            formData.append("pickUpTime", $scope.modify.pickUpTime);
            formData.append("DropOffLocation", $scope.modify.dropOffLocation);
            formData.append("DropOffDate", $scope.modify.dropOffDate);
            formData.append("DropOffTime", $scope.modify.dropOffTime);
            formData.append("cargoWeight", $scope.modify.cargoWeight);
            formData.append("cargoType", $scope.modify.cargoType);
            formData.append("truckType", $scope.modify.truckType);
            formData.append("truckNumber", $scope.modify.numberTrucks);
            formData.append("budget", $scope.modify.budget);
            formData.append("note", $scope.modify.note);


              $http.put(CONSTANT.apiURL + 'api/v1/shipper/modifyBid/' + BidID, formData, {
                    headers: {
                        'Authorization': $cookieStore.get('obj').accessToken,
                        'Content-Type': undefined
                    }
                })
                    .success(function (data, status) {
                        alert("Bid Modified Successfully.");
                      $("#modifyModal").modal('hide');
                      $state.go($state.current, {}, {reload: true});

                    })
                    .error(function (data, status) {
                        if (status == 401) {
                            alert("Your credentials have expired , try logging in again.");
                        }
                        if (status == 400) {
                            if (data.message == "You cannot modify bid which have quotes.") {
                                alert("You cannot modify bid which have quotes.");
                            }
                            else    alert("Try again.");

                        }
                        else alert("Try again");
                    });



        }
    }

}]);