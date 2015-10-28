/**
 * Created by clicklabs08 on 10/14/15.
 */
angular.module('carrus').controller('abc',['$scope','$location',function($scope,$location) {

    console.log("abc controller called ");

    $scope.getCurrentPath = function()
    {
        return $location.path();
    };

}]);