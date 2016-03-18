(function() {

  'use strict';
  angular.module('mmPlaza').controller('TitleController', TitleController);

  TitleController.$inject = ['TitleService','$stateParams','CommentsService','RatingService'];

  function TitleController(TitleService,$stateParams,CommentsService,RatingService) {
    var titleCtrl = this;

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
