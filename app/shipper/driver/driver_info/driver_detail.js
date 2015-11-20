/**
 * Created by clicklabs08 on 11/5/15.
 */
angular.module('carrus').controller('driver_detail', ['$scope', '$cookies', '$cookieStore', 'CONSTANT','$rootScope', function ($scope, $cookies, $cookieStore, CONSTANT,$rootScope) {

    console.log("driver detail controller called ");
    $scope.data1 = '';



    console.log($rootScope.json1);


    var d = {};
    $scope.driver= {
        driver_name: $rootScope.json1.driver_name,
        driver_id:$rootScope.json1.driver_id,
        address:$rootScope.json1.address,
        mobile_number:$rootScope.json1.mobile_number,
        profile_pic:$rootScope.json1.profile_pic,
        rating:$rootScope.json1.rating,
        drivingLicenseNo:$rootScope.json1.drivingLicenseNo,
        drivingLicenseDoc:$rootScope.json1.drivingLicenseDoc,
        validity:$rootScope.json1.validity,
        stateDl:$rootScope.json1.stateDl,
        adharDoc:$rootScope.json1.adharDoc,
        adharNo:$rootScope.json1.adharNo,
        VoterIdNo: $rootScope.json1.VoterIdNo,
        VoterIdDoc:$rootScope.json1.VoterIdDoc,
        _id:$rootScope.json1._id,
        status:$rootScope.json1.status

    };
    //$scope.fleetowner.fullName = ;
    //console.log($scope.trucker,'this is the new arrray');
    
}]);