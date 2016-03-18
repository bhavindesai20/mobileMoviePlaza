(function() {
  angular
    .module('mmPlaza')
    .service('RatingService', RatingService);

  RatingService.$inject = ['$http', '$q'];

  function RatingService($http, $q) {
    var serverRatingEndPoint = 'http://localhost:8083/febatlas';
    var self = this;

    self.addRating = addRating;
    self.getRatingByTitle = getRatingByTitle;
    self.getRatingByUser = getRatingByUser;
    self.getTitleAvgRating = getTitleAvgRating;
    self.getRatingByUserForTitle = getRatingByUserForTitle;


    function addRating(titleId,userId,rating) {
      return $http.post(serverRatingEndPoint+"/api/rating/"+titleId+"/"+userId, rating)
        .then(successFn, errorFn);
    }

    function getRatingByTitle(titleId){
      return $http.get(serverRatingEndPoint +"/rating/title/"+titleId)
        .then(successFn, errorFn);
    }

    function getRatingByUser(userId){
      return $http.get(serverRatingEndPoint +"/api/rating/user/"+userId)
        .then(successFn, errorFn);
    }

    function getRatingByUserForTitle(userId, titleId){
      return $http.get(serverRatingEndPoint +"/rating/"+titleId+"/"+userId)
        .then(successFn, errorFn);
    }

    function getTitleAvgRating(titleId) {
      return $http.get(serverRatingEndPoint + "/rating/" + titleId)
        .then(successFn, errorFn);
    }

    function successFn (response) {
      return response.data;
    }

    function errorFn(response) {
      return $q.reject(response.status);
    }
  }
})();
