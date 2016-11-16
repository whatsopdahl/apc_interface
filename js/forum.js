var app = angular.module("CourseProposalApp");

app.controller("forumCtrl", forumCtrl);
app.directive("courseForum", courseForum);

forumCtrl.$inject = ["$scope", "$rootScope", "$log", "$q", "$filter", "dataSrv"];
function forumCtrl($scope, $rootScope, $log, $q, $filter, dataSrv) {
	$log.debug(new Date());
	$scope.user = $rootScope.user;
	$scope.newComment = "";
	$scope.addComment = function(user, commentBody) {
		var date = new Date();
		$scope.proposal.comments.push( {"user" : user, 
										"date" : String(date), 
										"body" : commentBody});
		dataSrv.saveProposal($scope.proposal).then(function(data) {
			$log.info("Comment Saved");
		});
	}
}

function courseForum() {
	return {
		restrict : "E",
		templateUrl : "templates/forum.html",
		controller : "forumCtrl",
		replace : true,
		scope : {
			proposal : "=",
			comments : "="
		}
	}
}

app.filter("toDate", function() {
	return function(dateString){ 
		return new Date(dateString);
	}
});