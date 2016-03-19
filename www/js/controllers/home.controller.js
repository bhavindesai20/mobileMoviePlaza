(function() {

  'use strict';
  angular.module('mmPlaza').controller('HomeController', HomeController);

  HomeController.$inject = ['$ionicModal','$scope','UserService','$http','$rootScope','$ionicPopup'];

  function HomeController($ionicModal,$scope,UserService,$http,$rootScope,$ionicPopup) {
    var homeCtrl = this;
    homeCtrl.isUserLoggedIn = false;

    $ionicModal.fromTemplateUrl('templates/user.tmpl.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    homeCtrl.showUserTemplate = function(){
      $scope.modal.show();
    };
    homeCtrl.closeUserModel = function() {
      $scope.modal.hide();
    };



    homeCtrl.doLogin = function(){
      UserService.login(homeCtrl.loginData)
        .then(function(data) {
          $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
          localStorage.setItem("token", 'Bearer '+data.token);
          return UserService.getUserByEmail(homeCtrl.loginData.email);
        }).then(function(data) {
          homeCtrl.loginData=null;
          $rootScope.user= data;
          homeCtrl.closeUserModel();
          homeCtrl.isUserLoggedIn = true;
        })
        .catch(function(error) {
          var alertPopup = $ionicPopup.alert({
            title: 'Login Failed',
            template: 'Invalid Username or Password'
          });
          $http.defaults.headers.common.Authorization = '';
          localStorage.removeItem("token");
          homeCtrl.loginData=null;
        });
    };

    homeCtrl.logoutUser = function(){
      $http.defaults.headers.common.Authorization = '';
      $rootScope.user=null;
      localStorage.removeItem("token");
      homeCtrl.isUserLoggedIn = false;
    };

    homeCtrl.register = function(){
      UserService.registerUser(homeCtrl.registerData)
        .then(function (data) {
            console.log(data);
            var alertSuccess = $ionicPopup.alert({
              title: 'Successfully Register',
              template: 'Please Login Now.'
            });
            homeCtrl.registerData='';
          },
          function (error) {
            var alertError = $ionicPopup.alert({
              title: 'Registration Failed',
              template: 'Something Went Wrong. Try Again.'
            });
            homeCtrl.registerData='';
          });
    };

  }

})();
