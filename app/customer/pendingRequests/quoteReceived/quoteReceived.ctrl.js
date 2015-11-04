/**
 * Created by nightshifttushar on 10/29/15.
 */
angular.module('carrus').controller('quoteReceivedctrl',['$scope','$http','CONSTANT','$cookieStore',function($scope,$http,CONSTANT,$cookieStore){

    console.log("Quotes Received");
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
    $scope.closeModal=function(){
        $('body').off('wheel.modal mousewheel.modal');
    };

    $scope.modifyForm = function(){
        $('#modifyModal').modal(options);
        $('body').on('wheel.modal mousewheel.modal', function () {
            return false;
        });
    };

    $scope.getBids=function(BId){
        $http.get(CONSTANT.apiURL+"api/v1/shipper/bid/allQuotes?bidId="+BId,{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
            .success(function(data,status){
                console.log(data);

            })
            .error(function(data,status){
                console.log("Error");


            });
    };


    $scope.accept=function(){
        $http.put(CONSTANT.apiURL+'api/v1/shipper/acceptQueue',{
            "quoteId": "",
            "bidId": ""
        },{headers: {'Authorization': $cookieStore.get('obj').accessToken,'Content-Type':undefined}})
            .success(function(data,status){
               alert("Wow you have successfully done it. Bravo");
            })
            .error(function (data,status) {
                alert("Try again");
            });

    };

    $scope.ignoreQuote=function(){
        $http.put(CONSTANT.apiURL+'api/v1/shipper/ignoreQueue',{
            "quoteId": "",
            "bidId": ""
        },{headers: {'Authorization': $cookieStore.get('obj').accessToken,'Content-Type':undefined}})
            .success(function(data,status){
                alert("Wow you have successfully done it. Bravo");
            })
            .error(function (data,status) {
                alert("Try again");
            });

    };


    $scope.modifyBid=function(BidID){
        var formData=new FormData();
        formData.append("pickUpLocation", "");
        formData.append("pickUpDate", "");
        formData.append("pickUpTime", "");
        formData.append("DropOffLocation", "");
        formData.append("DropOffDate", "");
        formData.append("DropOffTime", "");
        formData.append("cargoWeight", "");
        formData.append("cargoType", "");
        formData.append("truckType", "");
        formData.append("truckNumber", "");
        formData.append("budget", "");
        formData.append("note", "");
        $scope.ignoreQuote=function(){
            $http.put(CONSTANT.apiURL+'api/v1/shipper/modifyBid/'+BidID,formData,{headers: {'Authorization': $cookieStore.get('obj').accessToken,'Content-Type':undefined}})
                .success(function(data,status){
                    alert("Wow you have successfully done it. Bravo");
                })
                .error(function (data,status) {
                    alert("Try again");
                });

        };

    }


}]);