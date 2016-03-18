(function() {

  angular
    .module('mmPlaza')
    .service('TitleService', TitleService);

  TitleService.$inject = ['$http','$q'];

  function TitleService($http, $q) {

    var serverTitleEndPoint = 'http://localhost:8083/febatlas';
    var self = this;
    self.getAllTitle = getAllTitle;
    self.getTitle = getTitle;
    self.addTitle = addTitle;
    self.updateTitle = updateTitle;
    self.deleteTitle = deleteTitle;
    self.getTitleBySerach = getTitleBySerach;
    self.getTitleByType = getTitleByType;
    self.getTitleByYear = getTitleByYear;
    self.getTitleByGenre = getTitleByGenre;


    function getAllTitle(){
      return $http.get(serverTitleEndPoint+'/titles')
        .then(successFn, errorFn);
    }

    function getTitle(id){
      return $http.get(serverTitleEndPoint+'/titles/'+id)
        .then(successFn, errorFn);
    }

    function addTitle(title) {
      return $http.post(serverTitleEndPoint+'/api/titles', title)
        .then(successFn, errorFn);
    }

    function updateTitle(titleId, title) {
      return $http.put(serverTitleEndPoint+'/api/titles', title)
        .then(successFn, errorFn);
    }

    function deleteTitle(titleId) {
      return $http.delete(serverTitleEndPoint +'/api/titles/' + titleId)
        .then(successFn, errorFn);
    }

    function getTitleBySerach(query){
      return $http.get(serverTitleEndPoint +"/titles/titlefilter?title="+query)
        .then(successFn, errorFn);
    }

    function getTitleByType(query){
      return $http.get(serverTitleEndPoint +"/titles/typefilter?type="+query)
        .then(successFn, errorFn);
    }

    function getTitleByYear(query){
      return $http.get(serverTitleEndPoint +"/titles/yearfilter?year="+query)
        .then(successFn, errorFn);
    }

    function getTitleByGenre(query){
      return $http.get(serverTitleEndPoint +"/titles/genrefilter?genre="+query)
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
