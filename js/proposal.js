var app = angular.module("CourseProposalApp");

app.controller("proposalCtrl", proposalCtrl);

proposalCtrl.$inject=["$rootScope","$scope", "$log", "$location", "$routeParams", "$filter", "$window",  "params", "dataSrv", "userSrv", "EVENTS"];
function proposalCtrl($rootScope, $scope, $log, $location, $routeParams, $filter, $window, params, dataSrv, userSrv, EVENTS) {
	$scope.user = $rootScope.user;
	
	$scope.selectedDept = null;
	$scope.selectedInstructor = null;
	$scope.courseNum = null;

	$scope.depts = params.depts;
	$scope.faculty = params.faculty;
	$scope.prevPage = params.prevPage;

	$scope.chosenGenEd = null;
	$scope.gen_eds = ["BL", "SKL", "WEL", "REL", "NWL", "NWNL", "HB", "HBSSM", "HE", "HEPT", "INTCL", "HIST", "QUANT"];

	initProposal();

	function initProposal() {
		var courseName = $routeParams.course;

		$scope.proposal =   {
								"terms": [],
								"owner": "",
								"stage": 0,
								"staffing": "",
								"rationale": "",
								"impact": "",
								"date": new Date(),
								"oldCourse": null,
								"fees": "",
								"est_enrollment": 0,
								"instructors": [],
								"comments":  []
							  };

		var newCourse = { 
								    "division": "",
								    "capacity": 0,
								    "name": "",
								    "title": "",
								    "pre_req": "",
								    "dept": "",
								    "credit_hrs": 4,
								    "desc": "",
								    "gen_ed" : []
						};

		if (!courseName) {
			$scope.proposal["newCourse"] = newCourse;
		} else {
			//load data
			var course = userSrv.addToRecentlyViewed(courseName, $scope.courses, $scope.allProposals);
			
			// if $scope.proposal has a name key, it is a course and we need to build our proposal obj from scratch
			if (course.name) {
				$scope.proposal.oldCourse = course;
				//make a copy of the old Course data
				$scope.proposal["newCourse"] = { 
												    "division": course.division,
												    "capacity": course.capacity,
												    "name": course.name,
												    "title": course.title,
												    "pre_req": course.pre_req,
												    "dept": course.dept,
												    "credit_hrs": course.credit_hrs,
												    "desc": course.desc,
												    "gen_ed" : course.gen_ed.slice()
									};
			} else {
				//if it is already a proposal, set scope.proposal
				$scope.proposal = course;
			}
			$scope.selectedDept = $filter("filter")($scope.depts, { abbrev : $scope.proposal.newCourse.dept})[0];
			$scope.courseNum = $scope.proposal.newCourse.name.split("-")[1];
		}
	}

	$scope.saveProposal = function() {
		$scope.proposal.newCourse.name = $scope.selectedDept.abbrev+"-"+$scope.courseNum;
		$scope.proposal.newCourse.dept = $scope.selectedDept.abbrev;
		$scope.proposal.newCourse.division = $scope.selectedDept.division;
		$scope.proposal.owner = $scope.user.name;

		if ($scope.proposal.instructors.length == 0) {
			$scope.$parent.errMsg = "Oh no! No one is teaching this course. Please "
							+"select at least one instructor for the course. You can change it later if "
							+"you need to!"
			var errModal = angular.element("#error-modal");
			errModal.modal('show');
			return;
		}

		if ($scope.proposal._id) {
			dataSrv.saveProposal($scope.proposal).then(function(data) {
				$rootScope.$broadcast(EVENTS.PROPOSAL_UPDATED);
				$location.path("#/"+$scope.proposal.newCourse.name).replace();
			}, function(err) {
				$log.err("Proposal not saved: "+err);
			});
		} else {
			dataSrv.createProposal($scope.proposal).then(function(data) {
				$rootScope.$broadcast(EVENTS.PROPOSAL_ADDED, $scope.proposal.newCourse.name);
				$location.path("#/"+$scope.proposal.newCourse.name).replace();
			}, function(err) {
				$log.err("Proposal not saved: "+err);
			});
		}
	}

	$scope.addGenEd = function() {
		if ($scope.chosenGenEd == null){
			$scope.chooseGenEd = true;
		}
		if (!$scope.proposal.newCourse.gen_ed) {
			$scope.proposal.newCourse.gen_ed = [];
		}
		if ($scope.proposal.newCourse.gen_ed.indexOf($scope.chosenGenEd) == -1){
			$scope.proposal.newCourse.gen_ed.push($scope.chosenGenEd);
		}
	}

	$scope.removeGenEd = function(genEd) {
		$scope.proposal.newCourse.gen_ed.splice($scope.proposal.newCourse.gen_ed.indexOf(genEd),1);
	}

	$scope.addInstructor = function() {
		if ($scope.proposal.instructors.indexOf($scope.selectedInstructor) == -1){
			$scope.proposal.instructors.push($scope.selectedInstructor);
		}
	}

	$scope.removeInstructor = function(instructor){
		$scope.proposal.instructors.splice($scope.proposal.instructors.indexOf(instructor),1);
	}

	$scope.returnToPrev = function() {
		$window.history.back();
	}
}

app.filter("facultyFilter", ["$filter", function($filter){
	return function(faculty, query) {
		return $filter("filter")(faculty, {name: query});
	}
}]);