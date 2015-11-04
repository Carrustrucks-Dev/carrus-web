/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module("carrus").constant('CONSTANT', {
    apiURL: 'http://52.25.204.93:8080/'
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

        .state('customer.contact',{
            url: '/contact',
            templateUrl: 'app/customer/contact/contact.view.html',
            controller : 'contactCtrl'
        })
        .state('customer.payment',{
            url: '/payment',
            templateUrl: 'app/customer/payment/payment.view.html',
            controller : 'paymentCtrl'
        })
        .state('customer.promo',{
            url: '/promo',
            templateUrl: 'app/customer/promo/promo.view.html',
            controller : 'promoCtrl'
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
            controller:'ongoingctrl'
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

        .state('customer.pendingRequests',{
            url:'/pendingRequests',
            abstract: true,
            templateUrl:'app/customer/pendingRequests/pending.view.html',
            controller:'pendingctrl'

        })
        .state('customer.pendingRequests.bidClosed',{
            url:'/bidClosed',
            templateUrl:'app/customer/pendingRequests/bidClosed/bidClosed.view.html',
            controller:'bidClosedctrl'
        })
        .state('customer.pendingRequests.quoteReceived',{
            url:'/quoteReceived',
            templateUrl:'app/customer/pendingRequests/quoteReceived/quoteReceived.view.html',
            controller:'quoteReceivedctrl'
        })
        .state('customer.profile',{
            url:'/profile',
            abstract: true,
            templateUrl:'app/customer/profile/profile.view.html',
            controller:'profileShipperCtrl'

        })
        .state('customer.profile.personalDetails',{
            url:'/personalDetails',
            templateUrl:'app/customer/profile/personalDetails/personalDetails.view.html',
            controller:'personalProfileCtrl'
        })
        .state('customer.profile.accountDetails',{
            url:'/accountDetails',
            templateUrl:'app/customer/profile/accountDetails/accountDetails.view.html',
            controller:'accountProfileCtrl'
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
        .state('shipper.trucker.truck_detail',{
            url:'/truck_details',
            templateUrl:'app/shipper/trucks/truck_info/truck_detail.html',
            controller:'truck_detail'
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
        .state('shipper.driver.driver_detail',{
            url:'/driver_info',
            templateUrl:'app/shipper/driver/driver_info/driver_info.html',
            controller:'driver'
        })
        .state('shipper.home',{
            url:'/shipperhome',

            templateUrl:'app/shipper/home/shipper_home.html',
            controller:'shipper_home'

        })






});
/*
angular.module('carrus').filter('dateSuffix', function($filter) {
    var suffixes = ["th", "st", "nd", "rd"];
    return function(input) {
        var dtfilter = $filter('date')(input, 'MMMM dd');
        var day = parseInt(dtfilter.slice(-2));
        var relevantDigits = (day < 30) ? day % 20 : day % 30;
        //console.log(day, relevantDigits);
        var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
        return dtfilter+suffix;
    };
});
*/

angular.module('carrus').filter('date2', function($filter) {
    var suffixes = ["th", "st", "nd", "rd"];
    return function (input, format) {

        var dtfilter = $filter('date')(input, format);
        var day = parseInt($filter('date')(input, 'dd'));
        var relevantDigits = (day < 30) ? day % 20 : day % 30;
        var suffix = (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
        return dtfilter.replace('oo', suffix);
        //return dtfilter+suffix;
    };
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
angular.module("carrus").factory('convertdatetime', function () {
    return {

        convertDate: function (DateTime) {
            var _utc = new Date(DateTime);
            if (_utc.getUTCMonth().toString().length == 1) {
                var month = "0" + (parseInt(_utc.getUTCMonth()) + 1);
            } else {
                month = parseInt(_utc.getUTCMonth()) + 1;
            }
            if (_utc.getUTCDate().toString().length == 1) {
                var day = "0" + (parseInt(_utc.getUTCDate()) + 1);
            } else {
                day = parseInt(_utc.getUTCDate()) + 1;
            }
            var _utc = _utc.getUTCFullYear() + "-" + month + "-" + day;
            return _utc;
        },

        convertPromoDate: function (DateTime) {
            //if (dateTime) {
            //    var date = dateTime;
            //    if(!date.getTime()){
            //        var str = dateTime.replace(/-/g,'/');
            //        date = new Date(str);
            //    }
            //    var off_to_deduct = date.getTimezoneOffset();
            //    date = new Date( date.getTime() + (off_to_deduct * 60000));
            //
            //    var date_appointment = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear();


            // }

            var _utc = new Date(DateTime);
            if (_utc.getMonth().toString().length == 1) {
                var month = "0" + (parseInt(_utc.getMonth()) + 1);
            } else {
                month = parseInt(_utc.getMonth() + 1);
            }
            if (_utc.getDate().toString().length == 1) {
                var day = "0" + (parseInt(_utc.getDate()));
            } else {
                day = parseInt(_utc.getDate());
            }
            var _utc = _utc.getFullYear() + "-" + month + "-" + day;
            return _utc;
        },


        convertDateTime: function (DateTime) {
            var actualEndTimeDate = DateTime.split("T")[0];
            var actualEndTimeTime = DateTime.split("T")[1];
            var actualEndTimeDateString = actualEndTimeDate.split("-");
            var finalEndDate = actualEndTimeDateString[1] + "/" + actualEndTimeDateString[2] + "/" + actualEndTimeDateString[0];
            var actualEndTimeTimeString = actualEndTimeTime.split(".")[0];
            actualEndTimeTimeString = actualEndTimeTimeString.split(":");
            var actualEndsuffix = actualEndTimeTimeString[0] >= 12 ? "PM" : "AM",
                actualEndhours12 = actualEndTimeTimeString[0] % 12;
            var actualEnddisplayTime1 = actualEndhours12 + ":" + actualEndTimeTimeString[1] + " " + actualEndsuffix;
            var actualEnddisplayTime = finalEndDate + " " + actualEnddisplayTime1;
            return actualEnddisplayTime;
        },
        convertTime: function (time) {
            var startTimeHours = time.split(":")[0];
            var startTimeMinutes = time.split(":")[1];
            var startsuffix = startTimeHours >= 12 ? "PM" : "AM",
                starthours12 = startTimeHours % 12;
            var startdisplayTime = starthours12 + ":" + startTimeMinutes + " " + startsuffix;
            return startdisplayTime
        },
        localOffset: function () {
            var date = new Date();
            //var localOffset = date.getTimezoneOffset() * 60000;
            var localOffset = (-1) * date.getTimezoneOffset();
            //var stamp = Math.round(new Date(localOffset).getTime());
            return localOffset;
        },
        convertCalendarDate: function (DateTime) {

            /*Convert datetime in proper format*/
            DateTime = DateTime + ":00";
            var date_split = DateTime.split("/");
            DateTime = date_split[0] + "-" + date_split[1] + "-" + date_split[2];

            /*Convert datetime in utc format*/
            var _utc = new Date(DateTime);
            if (_utc.getUTCMonth().toString().length == 1) {
                var month = "0" + (parseInt(_utc.getUTCMonth()) + 1);
            } else {
                month = parseInt(_utc.getUTCMonth()) + 1;
            }
            if (_utc.getUTCDate().toString().length == 1) {
                var day = "0" + (parseInt(_utc.getUTCDate()));
            } else {
                day = parseInt(_utc.getUTCDate());
            }

            if (_utc.getUTCHours().toString().length == 1) {
                var hour = "0" + (parseInt(_utc.getUTCHours()));
            } else {
                hour = parseInt(_utc.getUTCHours());
            }
            if (_utc.getUTCMinutes().toString().length == 1) {
                var min = "0" + (parseInt(_utc.getUTCMinutes()));
            } else {
                min = parseInt(_utc.getUTCMinutes());
            }
            if (_utc.getUTCSeconds().toString().length == 1) {
                var sec = "0" + (parseInt(_utc.getUTCSeconds()));
            } else {
                sec = parseInt(_utc.getUTCSeconds());
            }
            var _utc = _utc.getUTCFullYear() + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
            return _utc;
        }
    };
});