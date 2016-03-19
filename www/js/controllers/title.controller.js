(function() {

  'use strict';
  angular.module('mmPlaza').controller('TitleController', TitleController);

  TitleController.$inject = ['TitleService','$stateParams','CommentsService','RatingService','$rootScope','$scope'];

  function TitleController(TitleService,$stateParams,CommentsService,RatingService,$rootScope,$scope) {
    var titleCtrl = this;

    $scope.isValidUser = function(){
        console.log('called valid or not and return');
        if($rootScope.user){
            console.log('Valid');
            return true;
        }
        return false;
    };

    titleCtrl.addComment = function(){
      CommentsService.addComment($stateParams.titleId,$rootScope.user.id, titleCtrl.comment)
        .then(function(data) {
          titleCtrl.comment.comments ="";
          return CommentsService.getCommentByTitle($stateParams.titleId);
        }).then(function(data) {
          titleCtrl.setComments= data;
        })
        .catch(function(error) {
          console.log(error);
        });
    };

    function init() {

     TitleService.getTitle($stateParams.titleId)
        .then(function (data) {
            console.log(data);
            titleCtrl.title = data;
          },
          function (error) {
            console.log(error);
          });

      CommentsService.getCommentByTitle($stateParams.titleId)
        .then(function(data) {
            titleCtrl.setComments= data;
            console.log(titleCtrl.setComments);
          },
          function(error) {
            console.log(error);
          });

      RatingService.getTitleAvgRating($stateParams.titleId)
        .then(function(data) {
            var avgRating = Math.round(data);
            titleCtrl.rate = avgRating;
            console.log(titleCtrl.rate);
            titleCtrl.max = 5;
          },
          function(error) {
            console.log(error);
          });

    }

    init();

  }

})();
