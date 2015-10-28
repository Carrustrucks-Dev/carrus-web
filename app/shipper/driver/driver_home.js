/**
 * Created by clicklabs08 on 10/27/15.
 */
angular.module('carrus').controller('driver_home',['$scope','$location',function($scope,$location) {

    console.log("driver home controller called ");

    $scope.getCurrentPath = function()
    {
        return $location.path();
    };

    $scope.add_driver_modal = function(){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $('#add_driver').modal(options);
        $('body').addClass('modal-open')
    }

}]);