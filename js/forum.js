var app = angular.module("CourseProposalApp");

app.controller("forumCtrl", forumCtrl);

forumCtrl.$inject = ["$scope", "$rootScope", "$log", "$q", "$filter", "dataSrv"];
function forumCtrl($scope, $rootScope, $log, $q, $filter, dataSrv) {
	$scope.user = $rootScope.user;
	$scope.newComment = "";
	$scope.addComment = function(user, date, commentBody) {
		var date = String(new Date());
		$scope.course.comments.push( {"user" : user,
									  "date" : date,
									  "body" : $scope.newComment});
		dataSrv.saveProposal($scope.course).then(function(data) {
			$log.info("Comment Saved");
		});
	}

	$scope.sortComment = function(comment) {
		var date = new Date(comment.date);
		return date
	}
}

app.filter("toDate", function() {
    return function(dateString){
        return new Date(dateString);
    }
});

app.directive("courseForum", function() {
	return {
		restrict : 'E',
		templateUrl : "templates/course-forum.html",
		controller : "forumCtrl"
	}
});
