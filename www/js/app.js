// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic',
  'ngCordova',
  'ionic.service.core',
  'ionic.service.push',
  'starter.controllers'
])

.run(function($ionicPlatform, $ionicUser, $ionicPush, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // Handles incoming device tokens
  $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
    console.log('Ionic Push: Got token ', data.token, data.platform);
  });
})

.config(['$ionicAppProvider', function($ionicAppProvider) {
  // Identify app
  $ionicAppProvider.identify({
    // The App ID (from apps.ionic.io) for the server
    app_id: '650c50f6',
    // The public API key all services will use for this app
    api_key: 'f2067e3ff140446f5cccd64a8531260fd1fa4157b837c7ff'
  });
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.info', {
    url: "/info",
    views: {
      'menuContent': {
        templateUrl: "templates/info.html"
      }
    }
  })

  .state('app.name', {
    url: "/name",
    params: {
      name: null,
      phone_number: null
    },
    views: {
      'menuContent': {
        templateUrl: "templates/name.html",
        controller: 'NameCtrl'
      }
    }
  })

  .state('app.purpose', {
    url: "/purpose",
    params: {
      purpose: null
    },
    views: {
      'menuContent': {
        templateUrl: "templates/purpose.html",
        controller: 'PurposeCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/info');
});
