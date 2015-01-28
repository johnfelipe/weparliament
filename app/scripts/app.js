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
        url:'/laws/:categoryId',
        controller: 'LawsCtrl',
        templateUrl: 'views/laws.html'
      })
      .state('admin', {
        url:'/admin',
        controller: 'AdminCtrl',
        templateUrl: 'views/admin.html'
      })
      .state('postbill', {
        url: '/postbill',
        controller: 'PostBillCtrl',
        templateUrl: 'views/postbill.html'
      })
      .state('Committee', {
        url: '/committee',
        controller: 'CommitteeCtrl',
        templateUrl: 'views/committee.html'
      })
      .state('voteview', {
        url: '/voteview/:voteId',
        controller: 'VoteViewCtrl',
        templateUrl: 'views/voteview.html'
      })
      .state('billview', {
        url: '/billview/:billId',
        controller: 'BillViewCtrl',
        templateUrl: 'views/billview.html'
      })
	  .state('lawview', {
        url: '/lawview/:lawId',
        controller: 'LawViewCtrl',
        templateUrl: 'views/lawview.html'
      })
    ;
  })
  .constant('FIREBASE_URL', 'https://weparliament.firebaseio.com/');
