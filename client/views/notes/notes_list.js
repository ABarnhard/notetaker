(function(){
  'use strict';

  angular.module('hapi-auth')
  .controller('NotesListCtrl', ['$scope', '$state', 'Note', function($scope, $state, Note){
    $scope.files = [];
    $scope.count = 0;
    $scope.pages = 0;
    $scope._ = _;

    function getRecent(){
      Note.query($state.params.tag || '%', $state.params.page * 1 || 0).then(function(response){
        $scope.notes = response.data.notes;
      });
    }

    $scope.isCurrent = function(page){
      return page === $state.params.page * 1;
    };

    getRecent();

    Note.count().then(function(response){
      $scope.total = response.data.count * 1;
      $scope.pages = Math.ceil($scope.total / 5);
    });

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
