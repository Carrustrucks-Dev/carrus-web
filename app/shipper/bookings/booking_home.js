/**
 * Created by clicklabs08 on 11/18/15.
 */
/**
 * Created by clicklabs08 on 10/14/15.
 */
angular.module('carrus').controller('booking_home',['$scope','$location',function($scope,$location) {

    console.log("abc controller called ");

    $scope.getCurrentPath = function()
    {
        return $location.path();
    };

}]);