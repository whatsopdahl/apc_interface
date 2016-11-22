var app = angular.module("CourseProposalApp");

app.controller("courseCtrl", courseCtrl);
app.directive("confirmationPopup", confirmationPopup);

courseCtrl.$inject=["$rootScope", "$scope", "$filter", "$log", "$routeParams", "$location", "dataSrv", "userSrv", "EVENTS"];
function courseCtrl($rootScope, $scope, $filter, $log, $routeParams, $location, dataSrv, userSrv, EVENTS) {
	var courseName = $routeParams.course;

	$scope.course = userSrv.addToRecentlyViewed(courseName, $scope.courses, $scope.allProposals);

	$log.debug($scope.course);

	$scope.canApprove = userSrv.canApprove;

	$scope.approve = function(){
		$scope.course.stage++;
		dataSrv.saveProposal($scope.course);
	}

	$scope.reject = function() {
		var modal = angular.element("#confirm-popup");
		modal.modal("show");
	}

	$scope.deleteProp = function() {
		var modal = angular.element("#confirm-popup");
		modal.modal('hide');
		userSrv.removeFromRecentlyViewed($scope.course);
    	dataSrv.deleteProposal($scope.course).then(function(data) {
    		$rootScope.$broadcast(EVENTS.PROPOSAL_REMOVED);
    		angular.element(".modal-backdrop")[0].remove();
    		angular.element("body").removeClass("modal-open");
    		$location.path("/");
    	});
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
		if (list == null || list.length == 0){
			return "None";
		}
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

function confirmationPopup(){
	return {
		restrict : "E",
		templateUrl : "templates/confirmation-popup.html",
		scope : {
			action : "@",
			msg : "@",
			confirmFunc : "="
		}
	}
}
