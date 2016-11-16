var app = angular.module("CourseProposalApp");

app.controller("proposalCtrl", proposalCtrl);

proposalCtrl.$inject=["$rootScope","$scope", "$log", "$location", "params", "dataSrv", "EVENTS"];
function proposalCtrl($rootScope, $scope, $log, $location, params, dataSrv, EVENTS) {
	$scope.user = $rootScope.user;
	
	$scope.selectedDept = null;
	$scope.courseNum = null;

	$scope.depts = params.depts;
	$scope.faculty = params.faculty;

	$scope.chosenGenEd = "";
	$scope.gen_eds = ["BL", "SKL", "WEL", "REL", "NWL", "NWNL", "HB", "HBSSM", "HE", "HEPT", "INTCL", "HIST", "QUANT"];
	$scope.selectedGenEds = [];

	initProposal();

	function initProposal() {
		$scope.proposal =   {
							"terms": [],
							"owner": "",
							"stage": 0,
							"staffing": "",
							"rationale": "",
							"impact": "",
							"date": new Date(),
							"oldCourse": null,
							"newCourse": { 
							    "division": "",
							    "capacity": 0,
							    "name": "",
							    "title": "",
							    "pre_req": "",
							    "dept": "",
							    "credit_hrs": 4,
							    "desc": ""
							},
							"fees": "",
							"est_enrollment": 0,
							"instructors": [],
							"comments":  []
						  };
		//logic for updating goes here
	}

	$scope.saveProposal = function() {
		$scope.proposal.newCourse.name = $scope.selectedDept.abbrev+"-"+$scope.courseNum;
		$scope.proposal.newCourse.dept = $scope.selectedDept.abbrev;
		$scope.proposal.newCourse.division = $scope.selectedDept.division;
		$scope.proposal.owner = $scope.user.name;
		$scope.proposal.instructors = $scope.proposal.instructors.split(",");

		dataSrv.createProposal($scope.proposal).then(function(data) {
			$log.info("Proposal saved.");
			$rootScope.$broadcast(EVENTS.PROPOSAL_ADDED, $scope.proposal.newCourse.name);
			$location.path("#/"+$scope.proposal.newCourse.name).replace();
		}, function(err) {
			$log.err("Proposal not saved: "+err);
		});
	}

	$scope.addGenEd = function() {
		if ($scope.selectedGenEds.indexOf($scope.chosenGenEd) == -1){
			$scope.selectedGenEds.push($scope.chosenGenEd);
		}
	}

	$scope.removeGenEd = function(genEd) {
		$scope.selectedGenEds.splice($scope.selectedGenEds.indexOf(genEd),1);
	}
}

app.filter("facultyFilter", ["$filter", function($filter){
	return function(faculty, query) {
		return $filter("filter")(faculty, {name: query});
	}
}]);