'use strict';

angular.module('stories').controller('StoriesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Stories',
  function($scope, $stateParams, $location, Authentication, Stories) {
    $scope.authentication = Authentication;

    $scope.create = function() {
      var story = new Stories({
        title: this.title,
        content: this.content
      });
      story.$save(function(response) {
        $location.path('stories/' + response._id);

        $scope.title = '';
        $scope.content = '';
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.remove = function(story) {
      if (story) {
        story.$remove();

        for (var i in $scope.stories) {
          if ($scope.stories[i] === story) {
            $scope.stories.splice(i, 1);
          }
        }
      } else {
        $scope.story.$remove(function() {
          $location.path('stories');
        });
      }
    };

    $scope.update = function() {
      var story = $scope.story;

      story.$update(function() {
        $location.path('stories/' + story._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.find = function() {
      $scope.stories = Stories.query();
    };

    $scope.findOne = function() {
      $scope.story = Stories.get({
        storyId: $stateParams.storyId
      });
    };
    
    $scope.sortBy = function(sortOrder) {
      $scope.sortOrder = sortOrder;
      $scope.reverse = !$scope.reverse;
    };

  }
]);

//Filters used for stories content
angular.module('stories')
  .filter('newlines', function() {
    return function(input) {
      return input.replace(/\n/g, '<br/>');
    };
  });
