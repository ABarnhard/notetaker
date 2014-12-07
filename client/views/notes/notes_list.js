(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesListCtrl', ['$scope', 'Note', function($scope, Note){
    $scope.files = [];
    $scope.count = 0;

    function getRecent(){
      Note.recent().then(function(response){
        $scope.notes = response.data.notes;
      });
    }

    getRecent();

    $scope.create = function(note){
      $scope.count = 0;
      Note.create(note).then(function(response){
        $scope.note = {};
        getRecent();
        Note.upload(response.data.noteId, $scope.files);
      });
    };

    $scope.$on('upload', function(e, count){
      $scope.count = count;
    });
  }]);
})();
