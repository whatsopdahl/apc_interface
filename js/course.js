var app = angular.module("CourseProposalApp");

app.controller("courseCtrl", courseCtrl);

courseCtrl.$inject=["$rootScope", "$scope", "$filter", "$log", "$routeParams", "dataSrv", "userSrv"];
function courseCtrl($rootScope, $scope, $filter, $log, $routeParams, dataSrv, userSrv) {
	var courseName = $routeParams.course;

	$scope.course = userSrv.addToRecentlyViewed(courseName, $scope.courses, $scope.allProposals);

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
