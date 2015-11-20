/**
 * Created by tushar on 28/10/2015.
 */
angular.module('carrus').controller('profileShipperCtrl',['$scope','$location','$http','$cookieStore',function($scope,$location,$http,$cookieStore) {

    $scope.personalDetails = {};
    $scope.getCurrentPath = function () {
        return $location.path();
    };

    $http.get("http://52.25.204.93:8080/api/v1/shipper/profile", {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function (data, status) {
            console.log(data);
            var details = data.data.getShipper[0];
            $scope.personalDetails = details;
            $scope.personalDetails.Name=$scope.personalDetails.firstName+" "+$scope.personalDetails.lastName;
            console.log($scope.personalDetails);
        });
    $http.get("http://52.25.204.93:8080/api/v1/partnership").success(function (data, status) {
            var partnershipArray = [];   //initially empty
            // data = JSON.parse(data);
            var dat = data.data;
            dat.forEach(function (column) {
                var h = {
                    _id: "",
                    partnershipName: ""
                };
                h._id = column._id;
                h.partnershipName = column.partnershipName;
                partnershipArray.push(h);
                $scope.partnershipArray = partnershipArray;
                /* console.log($scope.partnershipArray)*/
            });
        });

    var formData = new FormData();

    $scope.savePersonalData=function(){
        var partnershipArray;


        for(var i=0;i<$scope.partnershipArray.length;i++){
            partnershipArray =$scope.partnershipArray[i]._id;
            formData.append("partnership", partnershipArray);
            /*formData.append(, $scope.personalDetails.doc.pan);*/
        }
        $scope.temp=$scope.personalDetails.Name.split(" ");
        console.log($scope.temp);
        $scope.personalDetails.firstName=$scope.temp[0];
        $scope.personalDetails.lastName=$scope.temp[1];

        formData.append("email",$scope.personalDetails.email);
        formData.append("phoneNumber",$scope.personalDetails.phoneNumber);
        formData.append("address",$scope.personalDetails.address);
        formData.append("companyName",$scope.personalDetails.companyName);
        formData.append("firstName",$scope.personalDetails.firstName);
        formData.append("lastName",$scope.personalDetails.lastName);
        /*formData.append("panCard", $scope.personalDetails.doc.pan);
        formData.append("tin", $scope.personalDetails.doc.tin);
        formData.append("serviceTax", $scope.personalDetails.doc.taxreg);
        formData.append("exciseRegistrationDoc", $scope.personalDetails.doc.excisereg);*/
    };


    $scope.saveProfile = function () {

        $http.put("http://52.25.204.93:8080/api/v1/shipper/profile", {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
            .success(function (data, status) {
                console.log(data);
                var details = data.data.getShipper[0];
                $scope.personalDetails = details;
                console.log($scope.personalDetails);
            });
    };
}]);