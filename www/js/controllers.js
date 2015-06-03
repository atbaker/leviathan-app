angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $state, $ionicUser, $ionicPush, $ionicHistory, $http) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var user = $ionicUser.get();
  if(!user.user_id) {
    // Set your user_id here, or generate a random one.
    user.user_id = $ionicUser.generateGUID();
  };

  // Identify your user with the Ionic User Service
  $ionicUser.identify(user).then(function() {
    console.log('Identified user ' + user.name + '\n ID ' + user.user_id);

    console.log('Ionic Push: Registering user');

    // Register with the Ionic Push service.  All parameters are optional.
    $ionicPush.register({
      canShowAlert: false, //Can pushes show an alert on your screen?
      canSetBadge: true, //Can pushes update app icon badges?
      canPlaySound: true, //Can notifications play a sound?
      canRunActionsOnWake: true, //Can run actions outside the app,
      onNotification: function(notification) {
        // Handle new push notifications here
        console.log(notification);

        $ionicHistory.nextViewOptions({
          disableBack: true
        });

        // Set the sid of the current call in rootScope
        $rootScope.sid = notification.sid;

        // Update our processing variable so the new state's buttons
        // aren't disabled
        $rootScope.processing = false;

        if (notification.stage === 'name') {
          $state.go('app.name', {
            name: notification.name,
            phone_number: notification.phone_number
          });
        } else if (notification.stage === 'purpose') {
          $state.go('app.purpose', {
            purpose: notification.purpose
          });
        }

        return true;
      }
    });
  });

  $scope.sendDecision = function(decision, sid) {
    $rootScope.processing = true;

    $http.post('http://21a1f4fc.ngrok.io/decide', {
      decision: decision,
      sid: $rootScope.sid
    });
  };

  $scope.accept = function() {
    $scope.sendDecision('accept');
  };

  $scope.reject = function() {
    $scope.sendDecision('reject');
  };
})

.controller('NameCtrl', function($scope, $stateParams, $http) {
  $scope.name = $stateParams.name;
  $scope.phone_number = $stateParams.phone_number;

  $scope.askPurpose = function() {
    $scope.sendDecision('ask');
  };
})

.controller('PurposeCtrl', function($scope, $rootScope, $stateParams) {
  $scope.purpose = $stateParams.purpose;
});
