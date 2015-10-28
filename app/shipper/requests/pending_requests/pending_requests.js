/**
 * Created by clicklabs08 on 10/13/15.
 */
angular.module('carrus').controller('pending_requests',['$scope',function($scope) {

    console.log("pending_requests called ");

    $scope.Quote = function(){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $('#quote').modal(options);
        //$('#myModal').modal('hide');
        $('body').addClass('modal-open')
    },
        $scope.Confirm_quote = function(){
            var options = {
                show     : 'true',
                backdrop : 'static'
            }
            $('#confirm_quote').modal(options);
            $('#quote').modal('hide');
        }
}]);



