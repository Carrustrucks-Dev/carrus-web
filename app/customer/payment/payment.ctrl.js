/**
 * Created by nightshifttushar on 11/4/15.
 */
angular.module('carrus').controller('paymentCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){

    console.log("Contact");
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
    $scope.viewDetails = function (data) {

        $('#viewDetailsModal').modal(options);

    };
    function init(){
        var dataList='';
        $http.get("http://52.25.204.93:8080/api/v1/shipper/getAllPayments", {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
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
        $http.get("http://52.25.204.93:8080/api/v1/shipper/getAllPayments?limit=6&skip=" + $scope.skip + "&", {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
            .success(function (data, status) {
                var Payments = [];
                console.log(data);
                var list = data.data;
                list.forEach(function (column) {
                    //console.log(column);
                    var h = {
                        "_id": "",
                        "shipper": {
                            "_id": "",
                            "firstName": "",
                            "rating": 0
                        },
                        "paymentMode": "",
                        "paymentOn": "",
                        "jobNote": "",
                        "bookingStatus": "",
                        "fleetOwner": {
                            "_id": "",
                            "fullName": ""
                        },
                        "transactionLogs": [],
                        "acceptPrice": 0,
                        "paymentStatus": "",
                        "trucker": {
                            "_id": "",
                            "driverName": ""
                        },
                        "crn": ""
                    };
                    h._id=column._id;
                    h.shipper._id=column.shipper._id;
                    h.shipper.firstName=column.shipper.firstName;
                    h.shipper.rating=column.shipper.rating;
                    h.paymentMode=column.paymentMode;
                    h.paymentOn=column.paymentOn;
                    h.jobNote=column.jobNote;
                    h.bookingStatus=column.bookingStatus;
                    h.fleetOwner._id=column.fleetOwner._id;
                    h.fleetOwner.fullName=column.fleetOwner.fullName;
                    h.transactionLogs=column.transactionLogs;
                    h.acceptPrice=column.acceptPrice;
                    h.paymentStatus=column.paymentStatus;
                    if(typeof column.trucker!="undefined") {
                        h.trucker._id = column.trucker._id;

                        h.trucker.driverName = column.trucker.driverName;
                    }h.crn=column.crn;

                    Payments.push(h);


                });
                $scope.paymentList = Payments;
            })
            .error(function (data, status) {
                if (status == 401) {
                    alert("Your credentials have expired , try logging in again.");
                }
            });


    }

}]);