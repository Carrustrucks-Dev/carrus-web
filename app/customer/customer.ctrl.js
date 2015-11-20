angular.module('carrus').controller('customerCtrl',['$scope','$http','$cookieStore','$state',function($scope,$http,$cookieStore,$state){
    $scope.mainData=[];
    $scope.sendData=function(data){
        $scope.mainData=data;
        console.clear();
        console.log($scope.mainData);
    };
    $scope.logout=function(){
        $.ajax({
            url:"http://52.25.204.93:8080/api/v1/shipper/logout",
            method:"PUT",
            headers: {'Authorization': $cookieStore.get('obj').accessToken},
            success:function(data,status){
                console.log("logged out");
                alert("Logged out successfully");
                $state.go("welcomeScreen");
            },
            error:function(data,status){
                console.log(data);
                console.log(data.status);
                console.log(status);
                if(data.status == 401){
                    alert("Your credentials have expired , try logging in again.");
                    $state.go("welcomeScreen");
                }
                else alert("Error");
            }
    })
    };
    $http.get("http://52.25.204.93:8080/api/v1/shipper/profile",{headers:{'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function(data,status){
            /*console.log(data);*/
            var details=data.data.getShipper[0];
            $scope.userName=details.firstName+" "+details.lastName;
            /*console.log($scope.userName);*/
        })
        .error(function(data,status){
            if(status == 401){
                alert("Your credentials have expired , try logging in again.");
            }
            else alert("Error occurred while retrieving Username");
        })





}]);
