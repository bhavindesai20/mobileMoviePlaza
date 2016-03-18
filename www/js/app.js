(function(){

  'use strict';
  angular.module('mmPlaza', ['ionic','ui.bootstrap'])

    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })

    .config(moduleConfig);

  moduleConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function moduleConfig($stateProvider, $urlRouterProvider) {

    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.tmpl.html',
        controller: 'HomeController'
      })
      .state('app.titles', {
        url: '/titles',
        views: {
          'menuContent': {
            templateUrl: 'templates/titles.tmpl.html',
            controller: 'TitlesController as titlesCtrl'
          }
        }
      }).state('app.title', {
      url: '/titles/:titleId',
      views: {
        'menuContent': {
          templateUrl: 'templates/title.tmpl.html',
          controller: 'TitleController as titleCtrl'
        }
      }
    });

    $urlRouterProvider.otherwise('/app/titles');

  }

})();
