var app = angular.module("CourseProposalApp");

app.controller("courseCtrl", courseCtrl);

courseCtrl.$inject=["$rootScope", "$scope", "$filter", "$log", "$routeParams", "dataSrv"];
function courseCtrl($rootScope, $scope, $filter, $log, $routeParams, dataSrv) {
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

	//add course to recently viewed courses
	var courseIdx = $rootScope.user.recentlyViewed.indexOf($scope.course._id.$oid);
	if (courseIdx == -1){
		$rootScope.user.recentlyViewed.unshift($scope.course._id.$oid);
		if ($rootScope.user.recentlyViewed.length > 7) {
			$rootScope.user.recentlyViewed.pop();
		}
	} else {
		var lastViewed = $rootScope.user.recentlyViewed[0];
		$rootScope.user.recentlyViewed[0] = $scope.course._id.$oid;
		$rootScope.user.recentlyViewed[courseIdx] = lastViewed;
	}
	dataSrv.editUser($rootScope.user).then(function(data) {
		$log.info("Saved Recently Viewed");
	});


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

app.directive("courseList", function() {
    return {
        restrict: "E",
        templateUrl: "templates/course-list.html",
        scope: {
            data: '=',
            user : '=',
            extendedView : "="
        }
    };
});

app.directive("course", function() {
    return {
        restrict: "E",
        templateUrl: "templates/course.html",
		controller: ['$scope', function MyTabsController($scope) {
			// for making the progress bar the correct colors at each stage
			$scope.getClass = function(courseStage, progressBarStage) {
		        if (courseStage == progressBarStage) {
		            return 'progress-bar-warning';
		        }
		        else if (courseStage > progressBarStage) {
		            return 'progress-bar-success';
		        }
		        else {
		            return 'progress-bar-danger';
		        }
		    };
		}]
    };
});

app.directive("extended-course", function() {
	return {
		restrict :"E",
		templateUrl : "templates/extended-course.html"
	}
});
