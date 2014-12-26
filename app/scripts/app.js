/* global app:true */
/* exported app */
/* 'Firebase': false */

'use strict';

/**
 * @ngdoc overview
 * @name lawbookApp
 * @description
 * # lawbookApp
 *
 * Main module of the application.
 */
var app = angular
  .module('weparliamentApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'firebase'
  ])
.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/main');

    $stateProvider
      .state('main', {
        url: '/main',
        controller: 'MainCtrl',
        views: {
          '': {
            templateUrl: 'views/main.html'
          },
          'laws@main': {
            templateUrl: 'views/main-laws-feed.html',
            controller: 'LawsFeedCtrl'
          },
          'bills@main': {
            templateUrl: 'views/main-bills-feed.html',
            controller: 'BillsFeedCtrl'
          },
          'votes@main': {
            templateUrl: 'views/main-votes-feed.html',
            controller: 'VotesFeedCtrl'
          }
        }
      })
      .state('laws', {
        url:'/laws',
        controller: 'LawsCtrl',
        templateUrl: 'views/laws.html'
      })
      .state('admin', {
        url:'/admin',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin.html'
      })
    ;
  })
  .constant('FIREBASE_URL', 'https://weparliament.firebaseio.com/');
