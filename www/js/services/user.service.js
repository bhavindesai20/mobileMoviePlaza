angular.module('mmPlaza').service('UserService', UserService);

UserService.$inject = ['$http','$q'];

function UserService($http, $q) {

  var serverUserEndPoint = 'http://localhost:8083/febatlas';
  var self = this;
  self.login = login;
  self.getUserByEmail = getUserByEmail;
  self.registerUser = registerUser;


  function registerUser(user){
    return $http.post(serverUserEndPoint+'/users', user)
      .then(successFn, errorFn);
  }


  function login(user){
    return $http.post(serverUserEndPoint+'/users/login', user)
      .then(successFn, errorFn);
  }

  function getUserByEmail(email){
    return $http.get(serverUserEndPoint+'/api/users/email/'+email+'/')
      .then(successFn, errorFn);
  }

  function successFn (response) {
    return response.data;
  }

  function errorFn(response) {
    return $q.reject(response.status);
  }

}
