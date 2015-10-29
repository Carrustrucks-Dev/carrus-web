/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module("carrus").constant('CONSTANT', {
    apiURL: 'http://52.25.204.93:8080/api/v1/shipper'
   /* sliderRange : [10,60]*/
});
/*angular.module("carrus").config(["$locationProvider",function(a){a.html5Mode(!0)}]);*/
/*angular.module('carrus',[]).config(function($locationProvider) {


        $locationProvider.html5Mode(true);
    });*/
angular.module('carrus').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/welcomeScreen');
    $urlRouterProvider.when('/customer','/customer/home');
    $urlRouterProvider.when('/shipper','/shipper');

    $stateProvider

        //Common States

        .state('welcomeScreen', {
            url: '/welcomeScreen',
            templateUrl: 'app/welcomeScreen/welcomeScreen.view.html',
            controller : 'welcomeScreenCtrl'
        })
     // Student states
        /*===============================================================================================*/
        /*===============================================================================================*/
        /*=====================================Shipper states- Tushar=================================*/
        /*===============================================================================================*/

        .state('customer', {
            url: '/customer',
            abstract:true,
            templateUrl: 'app/customer/customer.view.html',
            controller : 'customerCtrl'
        })
        .state('customer.home',{
            url: '/home',
            templateUrl: 'app/customer/home/home.view.html',
            controller : 'homeShipperCtrl'
        })
        .state('customer.profile',{
            url: '/profile',
            templateUrl: 'app/customer/profile/profile.view.html',
            controller : 'profileShipperCtrl'
        })
        .state('customer.contact',{
            url: '/contact',
            templateUrl: 'app/customer/contact/contact.view.html',
            controller : 'contactCtrl'
        })
        .state('customer.shipments',{
            url:'/shipments',
            abstract: true,
            templateUrl:'app/customer/shipments/shipment.view.html',
            controller:'shipmentctrl'

        })
        .state('customer.shipments.ongoing',{
            url:'/ongoing',
            templateUrl:'app/customer/shipments/ongoing/ongoing.view.html',
            controller:'ongoingcrtl'
        })
        .state('customer.shipments.upcoming',{
            url:'/upcoming',
            templateUrl:'app/customer/shipments/upcoming/upcoming.view.html',
            controller:'upcomingctrl'
        })
        .state('customer.shipments.past',{
            url:'/past',
            templateUrl:'app/customer/shipments/past/past.view.html',
            controller:'pastctrl'
        })
  // Driver states
        /*===============================================================================================*/
        /*===============================================================================================*/
        /*=====================================Fleet Owner States-Anuraj====================================*/
        /*===============================================================================================*/
    /*Fleet Owner related states*/
        .state('shipper',{
            url:'/shipper',
            abstract:true,
            templateUrl:'app/shipper/shipper_welcome.html',
            controller:'shipper_welcome'
        })
        .state('shipper.requests',{
            url:'/requests',
            abstract: true,
            templateUrl:'app/shipper/requests/abc.html',
            controller:'abc'

        })
        .state('shipper.requests.pending_assignments',{
            url:'/pending_assignments',
            templateUrl:'app/shipper/requests/pending_assignments/pending_assignments.html',
            controller:'pending_assignments'
        })
        .state('shipper.requests.pending_quotes',{
            url:'/pending_quotes',
            templateUrl:'app/shipper/requests/pending_quotes/pending_quotes.html',
            controller:'pending_quotes'
        })
        .state('shipper.requests.pending_requests',{
            url:'/pending_requests',
            templateUrl:'app/shipper/requests/pending_requests/pending_requests.html',
            controller:'pending_requests'
        })

        .state('shipper.trucker',{
            url:'/trucker',
            abstract: true,
            templateUrl:'app/shipper/trucks/truck_home.html',
            controller:'truck_home'

        })
        .state('shipper.trucker.trucks',{
            url:'/trucks',
            templateUrl:'app/shipper/trucks/truck_info/trucks.html',
            controller:'trucks'
        })
        .state('shipper.driver',{
            url:'/driver',
            abstract: true,
            templateUrl:'app/shipper/driver/driver_home.html',
            controller:'driver_home'

        })
        .state('shipper.driver.drivers',{
            url:'/drivers',
            templateUrl:'app/shipper/driver/driver_info/driver.html',
            controller:'driver'
        })


        .state('shipper.home',{
            url:'/shipperhome',

            templateUrl:'app/shipper/home/shipper_home.html',
            controller:'shipper_home'

        })






});



/*
angular.module('carrus').config(function($httpProvider){
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
    $httpProvider.defaults.cache= false;
});*/
