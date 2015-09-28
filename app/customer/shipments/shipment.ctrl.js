angular.module('carrus').controller('shipmentctrl',['$scope','$location', function($scope,$location){
        //console.log("Shippmemt");
        //$('.tab-menu ul li a').on('click', function(){
        //    $('.tab-menu ul li a').removeClass('.active');
        //    $(this).addClass(('.active');
        //});


    $scope.getCurrentPath = function()
    {
        return $location.path();
    };




}]);
