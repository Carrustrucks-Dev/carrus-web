/**
 * Created by nightshifttushar on 11/14/15.
 */
angular.module('carrus').controller('trackCtrl',['$scope','$location','$http','$cookieStore',function($scope,$location,$http,$cookieStore) {
    $scope.crnNum="";
    $scope.rate = 1;
    $scope.max = 5;
    $scope.isReadonly = false;
    /*$scope.marker=[];*/
    var image = 'img/icon.png';
    var map;
    var marker=[];
    var i;
    $("#crn").focus();
    var LatLngList = [];
    var LatLong=[];
    function initialize() {
        var mapCanvas = document.getElementById('map');
        var mapOptions = {

            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel:false
        };
        map = new google.maps.Map(mapCanvas, mapOptions);
        if(navigator.geolocation) {
            browserSupportFlag = true;
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
                map.setCenter(initialLocation);
               /*var marker = new google.maps.Marker({
                       position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                       map: map
                   });*/



            }, function() {
                handleNoGeolocation(browserSupportFlag);
            });
        }
        // Browser doesn't support Geolocation
        else {
            browserSupportFlag = false;
            handleNoGeolocation(browserSupportFlag);
        }

        function handleNoGeolocation(errorFlag) {
            if (errorFlag == true) {
                alert("Geolocation service failed.");
                initialLocation = newyork;
            } else {
                alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
                initialLocation = siberia;
            }
            map.setCenter(initialLocation);

        }


    }initialize();

    function setMapOnAll(map) {
        for (var i = 0; i < marker.length; i++) {
            marker[i].setMap(map);
        }
    }

    $scope.searchCRN=function(crnNum){

        $http.get("http://52.25.204.93:8080/api/v1/shipper/getBookingByCRN?crn="+crnNum,{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
            .success(function (data, status) {
                $scope.crn=data.data[0];
                console.log($scope.crn);
                setMapOnAll(null);
                var pos=new google.maps.LatLng($scope.crn.pickUp.coordinates.pickUpLat,$scope.crn.pickUp.coordinates.pickUpLong);
                marker[0] = new google.maps.Marker({
                    position: pos,
                    icon: image,
                    map: map
                });
                map.setCenter(pos);
                map.setZoom(15);

                map.panTo(marker[0].position);

                a=parseInt($scope.crn.pickUp.coordinates.pickUpLat);
                b=parseInt($scope.crn.pickUp.coordinates.pickUpLong);
                if(a>=0&&a<120&&b>=0&&b<120) {
                    console.log(a);
                    console.log(b);
                    var LatLong1 = [];
                    LatLong1=new Array (new google.maps.LatLng ($scope.crn.pickUp.coordinates.pickUpLat,$scope.crn.pickUp.coordinates.pickUpLong), new google.maps.LatLng ($scope.crn.dropOff.coordinates.dropOffLat,$scope.crn.dropOff.coordinates.dropOffLong));



                    marker[1] = new google.maps.Marker({
                        position: LatLong1[1],
                        icon: image,
                        map: map
                    });
                    var bounds1 = new google.maps.LatLngBounds ();
                    //  And increase the bounds to take this point
                    for (var i = 0;i < LatLong1.length; i++) {
                        //  And increase the bounds to take this point
                        bounds1.extend (LatLong1[i]);
                    }

//  Fit these bounds to the map
                map.fitBounds (bounds1);
                    displayRoute($scope.crn.pickUp.coordinates.pickUpLat,$scope.crn.pickUp.coordinates.pickUpLong,$scope.crn.dropOff.coordinates.dropOffLat,$scope.crn.dropOff.coordinates.dropOffLong);

                }
                //displayRoute($scope.crn.pickUp.coordinates.pickUpLat,$scope.crn.pickUp.coordinates.pickUpLong)
            }).error(function(data,status){
                console.log("Error");
            });
    };

    $http.get("http://52.25.204.93:8080/api/v1/shipper/getOnGoing",{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function(data,status){

           // console.log(data);
            var list=data.data;
            list.forEach(function(column) {
                var h = {
                    dropOffLat:"",
                    dropOffLong:"",
                    pickUpLat:"",
                    pickUpLong:""
                };
                    h.dropOffLat = column.dropOff.coordinates.dropOffLat;
                    h.dropOffLong = column.dropOff.coordinates.dropOffLong;
                    h.pickUpLat = column.pickUp.coordinates.pickUpLat;
                    h.pickUpLong = column.pickUp.coordinates.pickUpLong;
                a=parseInt(h.dropOffLat);
                b=parseInt(h.dropOffLong);
                c=parseInt(h.pickUpLat);
                d=parseInt(h.pickUpLong);
                if(a>=0&&a<120&&b>=0&&b<120&&c>=0&&c<120&&d>=0&&d<120)
                    LatLngList.push(h);
                $scope.ongoingListLatLong = LatLngList;

            });
            //console.log("ongoing ",$scope.ongoingListLatLong);
            latLongSet();
        })
        .error(function(data,status) {
            if(status == 401){
                alert("Your credentials have expired , try logging in again.");
            }
        });
$http.get("http://52.25.204.93:8080/api/v1/shipper/getConfirmed",{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function(data,status){

           // console.log(data);
            var list=data.data;
            list.forEach(function(column) {
                var h = {
                    dropOffLat:"",
                    dropOffLong:"",
                    pickUpLat:"",
                    pickUpLong:""
                };
                h.dropOffLat = column.dropOff.coordinates.dropOffLat;
                h.dropOffLong = column.dropOff.coordinates.dropOffLong;
                h.pickUpLat = column.pickUp.coordinates.pickUpLat;
                h.pickUpLong = column.pickUp.coordinates.pickUpLong;
                a=parseInt(h.dropOffLat);
                b=parseInt(h.dropOffLong);
                c=parseInt(h.pickUpLat);
                d=parseInt(h.pickUpLong);
                if(a>=0&&a<120&&b>=0&&b<120&&c>=0&&c<120&&d>=0&&d<120)
                    LatLngList.push(h);
                $scope.confirmedListLatLong = LatLngList;

            });
           // console.log("confirmed ",$scope.confirmedListLatLong);
        latLongSet();
        })
        .error(function(data,status) {
            if(status == 401){
                alert("Your credentials have expired , try logging in again.");
            }
        });
$http.get("http://52.25.204.93:8080/api/v1/shipper/getPast",{headers: {'Authorization': $cookieStore.get('obj').accessToken}})
        .success(function(data,status){

           // console.log(data);
            var list=data.data;
            list.forEach(function(column) {
                var h = {
                    dropOffLat:"",
                    dropOffLong:"",
                    pickUpLat:"",
                    pickUpLong:""
                };
                h.dropOffLat = column.dropOff.coordinates.dropOffLat;
                h.dropOffLong = column.dropOff.coordinates.dropOffLong;
                h.pickUpLat = column.pickUp.coordinates.pickUpLat;
                h.pickUpLong = column.pickUp.coordinates.pickUpLong;
                a=parseInt(h.dropOffLat);
                b=parseInt(h.dropOffLong);
                c=parseInt(h.pickUpLat);
                d=parseInt(h.pickUpLong);
                if(a>=0&&a<120&&b>=0&&b<120&&c>=0&&c<120&&d>=0&&d<120)
                    LatLngList.push(h);
                $scope.pastListLatLong = LatLngList;

            });
           // console.log("past ",$scope.pastListLatLong);
        latLongSet();
        })
        .error(function(data,status) {
            if(status == 401){
                alert("Your credentials have expired , try logging in again.");
            }
        });



    function latLongSet() {
        for (i = 0; i < LatLngList.length; i++) {
            LatLong.push(new google.maps.LatLng(LatLngList[i].dropOffLat, LatLngList[i].dropOffLong));
            LatLong.push(new google.maps.LatLng(LatLngList[i].pickUpLat, LatLngList[i].pickUpLong));
        }

         bound();
    }
//  Create a new viewpoint bound
    function bound(){


        var bounds = new google.maps.LatLngBounds ();
        console.log("1");

//  Go through each...
    for (i = 0; i<LatLong.length; i++) {
        marker[i] = new google.maps.Marker({
            position: LatLong[i],
            icon: image,
            map: map
        });
        //  And increase the bounds to take this point
        bounds.extend (LatLong[i]);
    }
//  Fit these bounds to the map
    map.fitBounds (bounds);
    }

    function displayRoute(lat1 , long1,lat2,long2) {
        var start = new google.maps.LatLng(lat1,long1);
        var end = new google.maps.LatLng(lat2,long2);

        var directionsDisplay = new google.maps.DirectionsRenderer();// also, constructor can get "DirectionsRendererOptions" object
        directionsDisplay.setMap(map); // map should be already initialized.

        var request = {
            origin : start,
            destination : end,
            travelMode : google.maps.TravelMode.DRIVING
        };
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });


    }




}]);