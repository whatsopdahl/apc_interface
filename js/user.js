var app = angular.module("CourseProposalApp");

app.controller("userCtrl", userCtrl);
app.factory("userSrv", userSrv);
app.directive("editDeptsModal", editDeptsModal);
app.directive("editPermissionsModal", editPermissionsModal);

userCtrl.$inject = ["$rootScope", "$scope", "$log", "depts", "userSrv"];
function userCtrl($rootScope, $scope, $log, depts, userSrv) {
	$scope.user = $rootScope.user;
	$log.debug($scope.user);
	$scope.depts = depts;
	$scope.updateDepts = userSrv.updateDepts;

	$scope.openEditModal= function(type) {
		var editModal;
		if (type == "depts"){
			editModal = angular.element("#more-user-data");
		} else if (type == "permissions") {
			editModal = angular.element("#permission-modal");
		}
		editModal.modal("show");
	}
}

userSrv.$inject = ["$rootScope", "$filter", "$log", "dataSrv", "authSrv"];
function userSrv($rootScope, $filter, $log, dataSrv, authSrv) {
	return {
		addToRecentlyViewed : addToRecentlyViewed,
		removeFromRecentlyViewed : removeFromRecentlyViewed,
		updateDepts : updateDepts,
		canApprove : canApprove
	}

	/**
	 *  takes a courseName and finds the corresponding course in the database. If there is a
	 *  proposal related to the course, finds that and adds it to the recently viewed. Returns
	 *  the course/proposal. 
	 *
	 *  @param courseName name of the course
	 *  @param courses courses to search (all)
	 *  @param allProposals proposals to search (all)
	 *  @return course/proposal object
	 */
	function addToRecentlyViewed(courseName, courses, allProposals) {
		//the course must exist in the database, so find it first

		var course = $filter("filter")(courses, {name: courseName}, true)[0];

		//check to see if it is in any proposals.
		var proposal = null;
		var index = 0;
		while (index < allProposals.elements.length && proposal == null) {
			var checkProposal = allProposals.elements[index];
			if ( (checkProposal.oldCourse && checkProposal.oldCourse.name == course.name) || (checkProposal.newCourse && checkProposal.newCourse.name == course.name) ) {
				proposal = checkProposal;
			}
			index++;
		}

		//if the course is in a proposal, use that instead of the plain course.
		if (proposal) {
			removeFromRecentlyViewed(course);
			course = proposal;
		}

		//add course to recently viewed courses
		var courseIdx = $rootScope.user.recentlyViewed.indexOf(course._id.$oid);
		if (courseIdx == -1){
			$rootScope.user.recentlyViewed.unshift(course._id.$oid);
			if ($rootScope.user.recentlyViewed.length > 7) {
				$rootScope.user.recentlyViewed.pop();
			}
		} else {
			var lastViewed = $rootScope.user.recentlyViewed[0];
			$rootScope.user.recentlyViewed[0] = course._id.$oid;
			$rootScope.user.recentlyViewed[courseIdx] = lastViewed;
		}
		dataSrv.editUser($rootScope.user).then(function(data) {
			$log.info("Saved Recently Viewed");
		});
		return course;
	}

	function removeFromRecentlyViewed(course) {
		var idx = $rootScope.user.recentlyViewed.indexOf(course._id.$oid);
		if (idx != -1) {
			$rootScope.user.recentlyViewed.splice(idx,1);
			dataSrv.editUser($rootScope.user).then(function(data) {
				$log.info("Saved Recently Viewed");
			});
		}
	}

    function updateDepts(memberDepts) {
    	var modal = angular.element("#more-user-data");
    	modal.modal('hide');
    	angular.element(".modal-backdrop")[0].remove();
    	angular.element("body").removeClass("modal-open");
   		var user = $rootScope.user;
   		$log.debug("updating user", $rootScope.user);
   		user.dept = [];
   		user.division = [];
   		user.recentlyViewed = [];
   		angular.forEach(memberDepts, function(dept){
   			if (user.division.indexOf(dept.division) == -1) {
   				user.division.push(dept.division);
   			}
   			user.dept.push(dept.abbrev);
   		});
   		dataSrv.editUser(user).then(function(resp){
   			authSrv.userInfoFound(user);
   		}, function(err) {
   			$log.error("Unable to update user. Logging out...");
   			authSrv.logout();
   		});
   	}

   	function canApprove(proposal) {
   		//if it is a course, not a proposal, don't allow approvals
   		if (proposal.name || !$rootScope.user.chairs) {
   			return false;
   		}
   		var chairs = $rootScope.user.chairs;
   		switch(proposal.stage) {
   			case 0:
   				if ($rootScope.user.name == proposal.owner || chairs.indexOf(proposal.newCourse.dept) != -1 
   						|| chairs.indexOf("APC") != -1 || chairs.indexOf(proposal.newCourse.division) != -1 ){
   					return true;
   				}
   				break;
   			case 1:
   				if ((proposal.newCourse.division && chairs.indexOf(proposal.newCourse.division) != -1) || chairs.indexOf("APC") != -1) {
   					return true;
   				}
   				break;
   			default:
   				if (chairs.indexOf("APC") != -1) {
					return true;
				}
				break;
   		}
   		return false;
   	}
}

editDeptsModal.$inject = ["$filter", "$log"];
function editDeptsModal($filter, $log) {
	return {
		restrict : "E",
		templateUrl : "templates/edit-departments.html",
		controller : ["$scope", function($scope) {	
			$scope.selectedDept;
			$scope.memberDepts = []; 
			if ($scope.user && $scope.user.dept.length > 0) {
				angular.forEach($scope.user.dept, function(d){
					$scope.memberDepts.push($filter("filter")($scope.depts, { abbrev : d})[0]);
				});
				$scope.selectedDept = $scope.memberDepts[0];
			}

		    $scope.addDept = function() {
		   		if ($scope.memberDepts.indexOf($scope.selectedDept) == -1){
		   			$scope.memberDepts.push($scope.selectedDept);
		   		}
		    }

		    $scope.removeDept = function(dept) {
		   		var index = $scope.memberDepts.indexOf(dept);
		   		$scope.memberDepts.splice(index,1);
		    } 
		}], 
		scope : {
			depts : "=",
			required : "=",
			user : "=",
			updateDepts : "="
		}
	}
}

editPermissionsModal.$inject = ["$log"];
function editPermissionsModal() {
	return {
		require : "^^confirmationPopup",
		restrict : "E",
		templateUrl : "templates/edit-permissions.html",
		controller : ["$rootScope", "$scope", "$filter", "$log", "dataSrv", 
						function($rootScope, $scope, $filter, $log, dataSrv) {

			$scope.faculty = [];
			dataSrv.getUsers().then(function(data) {
				$scope.faculty = data;
			});

			$scope.selectedUser;
			$scope.selectedChair;

			var deptAbbrevs = [];
			angular.forEach($scope.depts, function(d) {
				deptAbbrevs.push(d.abbrev);
			});
			
			$scope.chairs = [ "APC", "Science","Humanities", "Fine Arts" ].concat(deptAbbrevs);

		    $scope.addChair = function() {
		   		if ($scope.chairsHeld.indexOf($scope.selectedChair) == -1){
		   			$scope.chairsHeld.push($scope.selectedChair);
		   		}
		    }

		    $scope.removeChair = function(chair) {
		   		var index = $scope.chairsHeld.indexOf(chair);
		   		$scope.chairsHeld.splice(index,1);
		    }

		    $scope.savePermissions = function(confirmed) {
		    	var modal = angular.element("#permission-modal");
    			modal.modal('hide');
		    	$scope.selectedUser["chairs"] = $scope.chairsHeld;
		    	if ($scope.selectedUser.name == $rootScope.user.name) {
		    		if ($scope.selectedUser.chairs.indexOf('APC') == -1 && !confirmed) {
		    			angular.element("#revoke-apc-privileges-modal").modal('show');
		    			return;
		    		}
		    		$rootScope.user.chairs = $scope.selectedUser.chairs;
		    	}
		    	dataSrv.editUser($scope.selectedUser).then(function(data) {
		    		angular.element(".modal-backdrop")[0].remove();
    				angular.element("body").removeClass("modal-open");
    				confirmed = false;
		    	});
		    }

		    $scope.confirm = function() {
		    	angular.element("#revoke-apc-privileges-modal").modal("hide");
		    	$scope.savePermissions(true);
		    }

		    $scope.$watch('selectedUser', function() {
	    		$scope.chairsHeld = [];
		    	if ($scope.selectedUser) {
		    		if ($scope.selectedUser.chairs){
						angular.forEach($scope.selectedUser.chairs, function(c){
							$scope.chairsHeld.push(c);
						});
					}
				}
		    });
		}], 
		scope : {
			depts : "=",
			user  : "="
		}
	}
}