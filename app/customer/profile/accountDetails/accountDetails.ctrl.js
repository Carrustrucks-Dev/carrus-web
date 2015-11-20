/**
 * Created by nightshifttushar on 11/3/15.
 */

angular.module('carrus').controller('accountProfileCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){

    $scope.authMsg='';
    console.log("Profile");
    $scope.edit="Edit";
    $scope.editButton=function(){
        if($scope.edit=="Edit"){
            $scope.edit="Save";
            $("#symbol").removeClass("fa-pencil");
            $("#symbol").addClass("fa-check-square-o");

        }
        else{
            $scope.edit="Edit";
            $("#symbol").removeClass("fa-check-square-o");
            $("#symbol").addClass("fa-pencil");
            $scope.saveAccountData();
            $scope.saveProfile();

        }
    };
    $scope.addModal = function()
    {   $scope.authMsg='';
        $('#addAccountModal').modal('show');
        $('body').on('wheel.modal mousewheel.modal', function () {
            return false;
        });

    };
    $scope.closeModal=function(){
        $('body').off('wheel.modal mousewheel.modal');
    };
    $scope.addAccount=function(){};


}]);