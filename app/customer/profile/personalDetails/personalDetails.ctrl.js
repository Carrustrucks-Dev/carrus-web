/**
 * Created by nightshifttushar on 11/3/15.
 */
angular.module('carrus').controller('personalProfileCtrl',['$scope','$http','$cookieStore',function($scope,$http,$cookieStore){
    $scope.change={};
    $scope.authMsg='';
    $scope.edit="Edit";

    console.log("Profile");
    $('.input-group input').prop('disabled',true);
    $scope.changePass = function()
    {   $scope.authMsg='';
        $('#changePswdModal').modal('show');
        $('body').on('wheel.modal mousewheel.modal', function () {
            return false;
        });

    };
    $scope.closeModal=function(){
        $('body').off('wheel.modal mousewheel.modal');
    };
    $scope.editButton=function(){

        if($scope.edit=="Edit"){
            $scope.edit="Save";
            $("#symbol").removeClass("fa-pencil");
            $("#symbol").addClass("fa-check-square-o");
            $('.input-group input').prop('disabled',false);
        }
        else{
            $scope.edit="Edit";
            $("#symbol").removeClass("fa-check-square-o");
            $("#symbol").addClass("fa-pencil");
            $('.input-group input').prop('disabled',true);
            $scope.savePersonalData();
            $scope.saveProfile();
        }
    };

    $scope.changePswd=function(){
        if($scope.change.newPass==$scope.change.confirmPass&&$scope.change.newPass.length>5) {
            $http.put("http://52.25.204.93:8080/api/v1/shipper/changePassword", {
                "newPassword": $scope.change.newPass,
                "oldPassword": $scope.change.oldPass
            }, {headers: {'Authorization': $cookieStore.get('obj').accessToken}})
                .success(function (data, status) {
                    $scope.change = {};
                    alert("Password Changed Successfully");
                    $('#changePswdModal').modal('hide');
                    $scope.closeModal();

                }).error(function (data, status) {
                        if(data.message=="Invalid old password."){
                            $scope.authMsg="Invalid Old Password";
                            $scope.change={};
                        }
                    if(data.message=="oldPassword length must be at least 6 characters long"){
                            $scope.authMsg="Old Password must be at least 6 characters long";
                            $scope.change={};
                        }
                })
        }
        else if($scope.change.newPass!=$scope.change.confirmPass){ $scope.authMsg="Passwords don't match";
            $scope.change={};
        }
        else if ($scope.change.newPass.length<=5){ $scope.authMsg="New Password must be at least 6 characters long";
            $scope.change={};
        }
    }

}]);