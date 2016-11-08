var app = angular.module("CourseProposalApp");

app.controller("courseCtrl", courseCtrl);

courseCtrl.$inject=["$scope", "$filter", "$log", "$routeParams"];
function courseCtrl($scope, $filter, $log, $routeParams) {
	var courseName = $routeParams.course;
	$scope.course = $filter("filter")($scope.courses, {name: courseName})[0];
}