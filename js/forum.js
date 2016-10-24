var app = angular.module("CourseProposalApp");

app.controller("forumCtrl", forumCtrl);
app.directive("course-forum", courseForm);

forumCtrl.$inject = ["$scope", "$rootScope", "$log", "$q", "$filter", "dataSrv"];
function forumCtrl($scope, $rootScope, $log, $q, $filter, dataSrv) {
	$scope.user = $rootScope.user;
	$scope.date = new Date();
	$scope.newComment = "";
	$scope.addComment = function(user, date, commentBody) {
		$scope.proposal.comments.push( {"user" : user, 
										"date" : date, 
										"body" : commentBody});
		dataSrv.saveProposal($scope.proposal);
	}
}

function courseForm() {
	return {
		restrict : 'E',
		templateUrl : "templates/forum.html",
		controller : "forumCtrl",
		scope : {
			comments : "=",
			proposal : "="
		}
	}
}