/**
 * Created by clicklabs08 on 10/13/15.
 */
/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module('carrus').controller('shipper_welcome',['$scope','$state', '$cookies', '$cookieStore', 'CONSTANT', function ($scope,$state, $cookies, $cookieStore, CONSTANT)
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
     var dataArray = [];
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


}]);
