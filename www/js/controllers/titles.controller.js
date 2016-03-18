(function () {

  'use strict';
  angular.module('mmPlaza').controller('TitlesController', TitlesController);

  TitlesController.$inject = ['$scope','$state', 'TitleService'];

  function TitlesController($scope ,$state,TitleService) {
    var titlesCtrl = this;

    //auto refresh kind of thing
    titlesCtrl.numberOfItemsToDisplay=10;

    titlesCtrl.addMoreItem = function(){
      console.log('I called');
      if(titlesCtrl.titles.length > titlesCtrl.numberOfItemsToDisplay){
          titlesCtrl.numberOfItemsToDisplay+=10;
          $scope.$broadcast('scroll.infiniteScrollComplete');
      }
    };

    titlesCtrl.moreDataCanBeLoaded=function(){
      if(titlesCtrl.titles){
        if(titlesCtrl.titles.length <= titlesCtrl.numberOfItemsToDisplay){
          return false;
        }
      }
      return true;
    };



    $scope.addMoreItem = function(done) {

      if ($scope.items.length > $scope.numberOfItemsToDisplay)
        $scope.numberOfItemsToDisplay += 20; // load 5 more items
      done(); // need to call this when finish loading more data
    }


    titlesCtrl.setTitle = function(id){
      $state.go('app.title', {'titleId': id});
    };

    titlesCtrl.sortType = {
      "Year": "Year",
      "imdbRating": "imdbRating",
      "imdbVotes": "imdbVotes"
    };

    titlesCtrl.sortTitle = function (sortType) {
      if (sortType === "Year") {
        titlesCtrl.titles = _.sortBy(titlesCtrl.titles, 'year').reverse();
      }
      if (sortType === "imdbRating") {
        titlesCtrl.titles = _.sortBy(titlesCtrl.titles, 'imdbRating').reverse();
      }
      if (sortType === "imdbVotes") {
        titlesCtrl.titles = _.sortBy(titlesCtrl.titles, 'imdbVotes').reverse();
      }
    };

    titlesCtrl.doRefresh= function(){
      init();
    };

    function init() {
      TitleService.getAllTitle()
        .then(function (data) {
            console.log(data);
            titlesCtrl.titles = data;
            $scope.$broadcast("scroll.refreshComplete");
          },
          function (error) {
            console.log(error);
          });
    }

    init();


  }

})();
