var app = angular.module("CourseProposalApp");

app.controller("courseCtrl", courseCtrl);

courseCtrl.$inject=["$scope", "$filter", "$log", "$routeParams"];
function courseCtrl($scope, $filter, $log, $routeParams) {
	var courseName = $routeParams.course;
	//the course must exist in the database, so find it first
	$scope.course = $filter("filter")($scope.courses, {name: courseName}, true)[0];

	//check to see if it is in any proposals.
	var proposal = null;
	var index = 0;
	while (index < $scope.allProposals.elements.length && proposal == null) {
		var checkProposal = $scope.allProposals.elements[index];
		if ( (checkProposal.oldCourse && checkProposal.oldCourse.name == $scope.course.name) || checkProposal.newCourse.name == $scope.course.name) {
			proposal = checkProposal;
		}
		index++;
	}

	//if the course is in a proposal, use that instead of the plain course.
	if (proposal) {
		$scope.course = proposal;
	}

	$scope.stageName = function(stageNum) {
		if (stageNum == 0) {
			return "Just created, not under review"
		} else if (stageNum == 1) {
			return "Division Review"
		} else if (stageNum == 2) {
			return "APC Review"
		} else if (stageNum == 3) {
			return "Full Faculty Review"
		} else if (stageNum == 4) {
			return "Sent to Registrar"
		}
	}

	$scope.displayListData = function(list) {
		listStr = "";
		for (item in list) {
			listStr += list[item] + ", ";
		}
		listStr = listStr.substring(0, listStr.length-2);
		return listStr;
	}
}
