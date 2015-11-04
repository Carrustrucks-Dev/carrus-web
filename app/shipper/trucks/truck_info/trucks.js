/**
 * Created by clicklabs08 on 10/27/15.
 */
//Data
var cities = [
    {
        city : 'Toronto',
        desc : 'This is the best city in the world!',
        lat : 30,
        long : 76.4000
    },
    {
        city : 'New York',
        desc : 'This city is aiiiiite!',
        lat : 30.6700,
        long : 76.9400
    },
    {
        city : 'Chicago',
        desc : 'This is the second best city in the world!',
        lat : 41.8819,
        long : -87.6278
    },
    {
        city : 'Los Angeles',
        desc : 'This city is live!',
        lat : 34.0500,
        long : -118.2500
    },
    {
        city : 'Las Vegas',
        desc : 'Sin City...\'nuff said!',
        lat : 36.0800,
        long : -115.1522
    }
];

//Angular App Module and Controller
angular.module('carrus').controller('trucks',['$scope','$cookies','$cookieStore','CONSTANT','$state','$rootScope', function($scope,$cookies,$cookieStore, CONSTANT, $state,$rootScope) {

    console.log("map waala controller ");
    var getTruckList = function () {

        var access_token = $cookieStore.get('obj');
        var dataArray = [];
        access_token = access_token.accesstoken;
        $.ajax({


            type: "GET",
            url: CONSTANT.apiURL + 'api/v1/fleetOwner/allTruck',
            headers: {'authorization': access_token},
            async: false,
            processData: false,
            contentType: false,
            // 'https://devadmin.secretspa.co.uk:2600/register_artist', $scope.therapist).
            success: function (data) {
                console.log(data);

                data= data.data;


                data.forEach(function (column) {

                    var d = {
                        truck_name: "",
                        truck_number: "",
                        address: "",
                        oem: "",

                        address:"",
                        //gender: "",
                        status: ""
                    };
                    var fc_validity = column.fitnessCertificate.fcValidity.toString().split("T")[0];
                    var rc_validity = column.registrationCertificate.rcValidity.toString().split("T")[0];
                    var np_validity = column.notionalPermit.npValidity.toString().split("T")[0];
                    var tt_validity = column.taxToken.ttValidity.toString().split("T")[0];
                    var insurance_validity = column.insurance.validity.toString().split("T")[0];

                    var manufacture_date=column.manufactureDate.toString().split("T")[0];
                    d.truck_name=column.truckName;
                    d.truck_number=column.truckNumber;
                    d.model= column.model;
                    d.oem=column.oem;
                    d.address= column.address;
                    d.status=column.status;
                    d.fitnessCertificate=column.fitnessCertificate.fcDoc;
                    d.fc_validity=fc_validity;
                    d.notionalPermit=column.notionalPermit.npDoc;
                    d.np_validity=np_validity;
                    d.registrationCertificate=column.registrationCertificate.rcDoc;
                    d.rc_validity=rc_validity;
                    d.taxToken=column.taxToken.ttDoc;
                    d.tt_validity=tt_validity;
                    d.insurace_company=column.insurance.company;
                    d.insurance_policy=column.insurance.policy;
                    d.insurance_validity=insurance_validity;
                    d.manufacture_date=manufacture_date;
                    d.truck_id=column._id;


                    dataArray.push(d);
                    $scope.list=dataArray;
                });
            }


        });
    }

    getTruckList();

    $scope.view_profile=function(json)
    {
        $rootScope.json=json;
        console.log($rootScope.json);
        console.log('yodapda');

        $state.go('shipper.trucker.truck_detail');
    }
        //var mapOptions = {
        //    zoom: 16,
        //    center: new google.maps.LatLng(30.75, 76.78),
        //    mapTypeId: google.maps.MapTypeId.TERRAIN
        //}
        //
        //$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        //
        //$scope.markers = [];
        //
        //var infoWindow = new google.maps.InfoWindow();
        //
        //var createMarker = function (info){
        //
        //    var marker = new google.maps.Marker({
        //        map: $scope.map,
        //        position: new google.maps.LatLng(info.lat, info.long),
        //        title: info.city
        //    });
        //    marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        //
        //    google.maps.event.addListener(marker, 'click', function(){
        //        infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
        //        infoWindow.open($scope.map, marker);
        //    });
        //
        //    $scope.markers.push(marker);
        //
        //}
        //
        ////for (i = 0; i < cities.length; i++){
        ////    createMarker(cities[i]);
        ////}
        //
        //$scope.openInfoWindow = function(e, selectedMarker){
        //    e.preventDefault();
        //    google.maps.event.trigger(selectedMarker, 'click');

        //}

    }]);