/* jshint loopfunc:true */

(function(){
  'use strict';

  angular.module('hapi-auth')
  .factory('Note', ['$rootScope', '$http', '$upload', function($rootScope, $http, $upload){

    function create(note){
      return $http.post('/notes', note);
    }

    function query(tag){
      return $http.get('/notes?limit=10&offset=0&tag=' + tag);
    }

    function show(noteId){
      return $http.get('/notes/' + noteId);
    }

    function upload(noteId, files){
      var count = 0;
      for (var i = 0; i < files.length; i++){
        var file = files[i];
        $upload.upload({
          url: '/notes/' + noteId + '/upload',
          method: 'POST',
          file: file
        }).success(function(data, status, headers, config){
          count++;
          $rootScope.$broadcast('upload', count);
        }).error(function(){
          console.log('An error has occurred during a file upload');
        });
      }
    }

    return {create:create, upload:upload, show:show, query:query};
  }]);
})();
