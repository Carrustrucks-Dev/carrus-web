/**
 * Created by clicklabs08 on 10/13/15.
 */
/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module('carrus').controller('shipper_welcome',['$scope','$state', '$cookies', '$cookieStore', 'CONSTANT','$http','$rootScope', function ($scope,$state, $cookies, $cookieStore, CONSTANT,$http,$rootScope)
{

    console.log("shipper_welcome contoleer claedd");
    var access_token = $cookieStore.get('obj');
    var dataArray = [];
    access_token = access_token.accesstoken;
    if(access_token == '' || access_token == null )
    {
        $state.go('welcomeScreen');
    }

 $scope.SignOut= function() {

     var access_token = $cookieStore.get('obj');
     access_token = access_token.accesstoken;
     $.ajax({
         type: "PUT",
         url: CONSTANT.apiURL + 'api/v1/fleetOwner/logout',
         headers: {'authorization': access_token},
         success: function (data) {
             $state.go('welcomeScreen')
         }
     })
 }

    $scope.ch_pwd_modal = function(){
        var options = {
            show     : 'true',
            backdrop : 'static'
        }
        $('#change_password').modal(options);

    },
        $scope.fleet_owner={};

    $scope.ChangePassword= function() {

        var access_token = $cookieStore.get('obj');
        access_token = access_token.accesstoken;
        $scope.formData= new FormData();

        if($scope.fleet_owner.newpwd == $scope.fleet_owner.renewpwd) {

            $http.put(CONSTANT.apiURL + 'api/v1/fleetOwner/changePassword', {
                "newPassword": $scope.fleet_owner.newpwd,
                "oldPassword": $scope.fleet_owner.oldpwd
            }, {headers: {'authorization': $cookieStore.get('obj').accesstoken}})
                .success(function (data, status) {
                    $scope.change = {};
                    alert("Password Changed Successfully");
                    $('#change_password').modal('hide');

                }).error(function (data, status) {
            if(data.message == 'Invalid old password.' && data.statusCode == 400)
            {
             alert('Your current password is invalid, please try again ')
                $('#change_password').modal('hide');
                $('#change_password').modal('show');
                console.log(',.,.,.,<>')
            }

                    if(data.message == 'newPassword length must be at least 6 characters long'){
                        alert('New password must be at least 6 characters long')
                        $('#change_password').modal('hide');
                        $('#change_password').modal('show');
                        $scope.ch_pwd_modal();
                        console.log(',.,.,.,<sdfs>')
                        //$('#change_password').modal('show');
                    }
                })
        }


        else{
            alert('Your passwords do not match, please try again !!');
            $('#change_password').modal('hide');
            $state.reload();
        }
    }
    console.log($rootScope.fleet_owner_name);
    var access_token = $cookieStore.get('obj');
    access_token = access_token.accesstoken;
    $http.get("http://52.25.204.93:8080/api/v1/fleetOwner/profile",
        {
            headers:{'authorization': $cookieStore.get('obj').accesstoken}

        })
        .success(function(data,status){
            console.log(data.data);
            $scope.user_name=data.data.getFleetOwner[0].fullName;

            console.log($scope.user_name);
        })
        .error(function(data,status){
            if(status == 401){
                alert("Your credentials have expired , try logging in again.");
            }
            else alert("Error occurred while retrieving Username");
        })

}]);
