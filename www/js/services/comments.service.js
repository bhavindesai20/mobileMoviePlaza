(function() {

  angular
    .module('mmPlaza')
    .service('CommentsService', CommentsService);

  CommentsService.$inject = ['$http','$q'];

  function CommentsService($http, $q) {
    var serverCommentEndPoint = 'http://localhost:8083/febatlas';
    var self = this;

    self.addComment = addComment;
    self.updateComment = updateComment;
    self.deleteComment = deleteComment;
    self.getCommentByTitle = getCommentByTitle;
    self.getCommentByUser = getCommentByUser;

    function addComment(titleId,userId,comment) {
      return $http.post(serverCommentEndPoint+"/api/comments/"+titleId+"/"+userId, comment)
        .then(successFn, errorFn);
    }

    function updateComment(titleId,userId,comment) {
      return $http.put(serverCommentEndPoint+"/api/comments/"+titleId+"/"+userId, comment)
        .then(successFn, errorFn);
    }

    function deleteComment(titleId,userId,commentId) {
      return $http.delete(serverCommentEndPoint+"/api/comments/"+titleId+"/"+userId+"/"+commentId)
        .then(successFn, errorFn);
    }

    function getCommentByTitle(titleId){
      return $http.get(serverCommentEndPoint +"/comments/title/"+titleId)
        .then(successFn, errorFn);
    }

    function getCommentByUser(userId){
      return $http.get(serverCommentEndPoint +"/api/comments/user/"+userId)
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
