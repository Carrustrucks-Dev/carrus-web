/**
 * Created by nightshifttushar on 10/29/15.
 */
angular.module('carrus').controller('bidClosedctrl',['$scope','$http','CONSTANT','$cookieStore',function($scope,$http,CONSTANT,$cookieStore){
    var options = {
        show     : 'true',
        keyboard: false,
        backdrop : 'static'
    };
    $scope.details={};
    console.log("closed bids");
    $scope.addDetailsModal = function(){
        $('#addDetailsModal').modal(options);
        $('body').on('wheel.modal mousewheel.modal', function () {
            return false;
        });
    };
    $scope.closeModal=function(){
        $('body').off('wheel.modal mousewheel.modal');
    };

    $scope.addDetails=function(){
       var formData=new FormData();
        formData.append("bidId", "5631fadf2a6e89ef3ebd2be2");
        formData.append("puCompanyName", $scope.details.puCompanyName);
        formData.append("puName", $scope.details.puName);
        formData.append("puTin", $scope.details.puTin);
        formData.append("puContactNumber", $scope.details.puContactNumber);
        formData.append("puAddress", $scope.details.puAddress);
        formData.append("puCity", $scope.details.puCity);
        formData.append("puState", $scope.details.puState);
        formData.append("puZipCode", $scope.details.puZipCode);
        formData.append("doCompanyName", $scope.details.doCompanyName);
        formData.append("doName", $scope.details.doName);
        formData.append("doTin", $scope.details.doTin);
        formData.append("doContactNumber", $scope.details.doContactNumber);
        formData.append("doAddress", $scope.details.doAddress);
        formData.append("doCity", $scope.details.doCity);
        formData.append("doState", $scope.details.doState);
        formData.append("doZipCode", $scope.details.doZipCode);
        formData.append("paymentMode", $scope.details.paymentMode);
        formData.append("paymentOn", $scope.details.paymentOn);
        /*formData.append("promoCode", $scope.details.);*/
        formData.append("jobNote", $scope.details.jobNote);







        $http.post(CONSTANT.apiURL+'api/v1/shipper/addDetails',formData,{headers: {'Authorization': $cookieStore.get('obj').accessToken,'Content-Type':undefined}})
            .success(function(data,status){
                alert("Wow you have successfully done it. Bravo");
            })
            .error(function (data,status) {
                alert("Try again");
            });

    }
}]);