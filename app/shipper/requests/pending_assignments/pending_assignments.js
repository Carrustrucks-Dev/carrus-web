/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('pending_assignments',['$scope',function($scope) {

    console.log("pending_Assignments called ");

    $scope.Quote = function(){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $('#assign_driver').modal(options);
        //$('#myModal').modal('hide');
        $('body').addClass('modal-open')
    },
        $scope.SignUp = function(){
            var options = {
                show     : 'true',
                backdrop : 'static'
            }
            $('#SignUp').modal(options);
            $('#quote').modal('hide');
        }
}]);