/**
 * Created by tabishrizvi on 15/09/15.
 */

angular.module("carrus").constant('CONSTANT', {
    apiURL: '',
    sliderRange : [10,60]
});

angular.module('carrus').config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/welcomeScreen');
    $urlRouterProvider.when('/customer','/customer/myPosts');

    $stateProvider

        //Common States

        .state('welcomeScreen', {
            url: '/welcomeScreen',
            templateUrl: 'app/welcomeScreen/welcomeScreen.view.html',
            controller : 'welcomeScreenCtrl'
        })





        // Student states

        .state('customer', {
            url: '/customer',
            abstract:true,
            templateUrl: 'app/customer/customer.view.html',
            controller : 'customerCtrl'
        })
        .state('customer.myPosts',{
            url: '/myPosts',
            templateUrl: 'app/customer/myPosts/myPosts.view.html',
            controller : 'myPostsCtrl'})


        // Driver states




});




angular.module('carrus').config(function($httpProvider){
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.transformRequest = function(data){
        if (data === undefined) {
            return data;
        }
        return $.param(data);
    };
    $httpProvider.defaults.cache= false;
});
