var app = angular.module("CourseProposalApp");

app.controller("userCtrl", userCtrl);
app.controller("editDeptsCtrl", editDeptsCtrl);
app.factory("userSrv", userSrv);
app.directive("editDepts", editDepts);
app.directive("editPermissionsModal", editPermissionsModal);
app.directive("userPreferencesModal", userPreferencesModal);

userCtrl.$inject = ["$rootScope", "$scope", "$log", "depts", "userSrv"];
function userCtrl($rootScope, $scope, $log, depts, userSrv) {
	$scope.user = $rootScope.user;
	$scope.depts = depts;

	$scope.openEditModal= function(type) {
		var editModal;
		if (type == "permissions") {
			editModal = angular.element("#permission-modal");
		} else if (type == "preferences") {
			editModal = angular.element("#preferences-modal");
		}

		editModal.modal("show");
	}

	/* Create the user stat chart */
	var chartData = {
			labels : ["Pending","Approved","Rejected"],
			datasets : [
				{
					/* Here is where we put the data: pending approvals, then approved, finally rejected*/
					data : userSrv.getUserStats($scope.myChanges.elements.length),
					backgroundColor : [
							"#f0ad4e",
							"#5cb85c",
							"#d9534f"
					],
					hoverBackgroundColor: [
							"#ec971f",
							"#449d44",
							"#c9302c"
					]
				}
			]	
		};
	var ctx = angular.element("#proposal-stat-chart");
	var statsChart = new Chart(ctx, {
		type : 'doughnut',
		data : chartData
	})
}

editDeptsCtrl.$inject = ["$scope", "$filter", "$log"];
function editDeptsCtrl($scope, $filter, $log) {	
	$scope.selectedDept;
	if ($scope.user && $scope.user.dept && $scope.user.dept.length > 0) {
		var memberDepts = [];
		angular.forEach($scope.user.dept, function(d){
			memberDepts.push($filter("filter")($scope.depts, { abbrev : d})[0]);
		});
		$scope.memberDepts = memberDepts;
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
}

userSrv.$inject = ["$rootScope", "$filter", "$log", "dataSrv", "authSrv"];
function userSrv($rootScope, $filter, $log, dataSrv, authSrv) {
	return {
		addToRecentlyViewed : addToRecentlyViewed,
		removeFromRecentlyViewed : removeFromRecentlyViewed,
		updateUser : updateUser,
		canApprove : canApprove,
		getUserStats : getUserStats
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
			if ( (checkProposal.oldCourse && checkProposal.oldCourse.name == course.name) || checkProposal.newCourse.name == course.name) {
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

    function updateUser(memberDepts) {
    	var modal = angular.element("#preferences-modal");
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
   				if ( (proposal.newCourse.division && chairs.indexOf(proposal.newCourse.division) != -1) || chairs.indexOf("APC") != -1 ) {
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

   	/**
	 * This function returns an array of the user's pending, approved and 
	 * rejected proposals, in that order. Approved and rejected are gathered
	 * from the user's profile, and pending is calculated seperately. 
   	 */
   	function getUserStats(openPropCount) {
   		var approved = 0;
   		var total = 0;
   		if ($rootScope.user.totalProps) {
   			total = $rootScope.user.totalProps;
   		}
   		if ($rootScope.user.approved) {
   			approved = $rootScope.user.approved;
   		}
   		return [openPropCount, approved, total-openPropCount-approved];
   	}
}

function editDepts() {
	return {
		restrict : "E",
		templateUrl : "templates/edit-departments.html",
		controller : "editDeptsCtrl", 
		scope : {
			depts : "=",
			user : "=",
			memberDepts : "="
		}
	}
}

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
			user  : "=",
			memberDepts : "="
		}
	}
}

function userPreferencesModal() {
	return {
		require: "^^editDepts",
		restrict : "E",
		templateUrl : "templates/preferences-modal.html",
		controller : ["$rootScope", "$scope", '$log', "$filter", "userSrv", "dataSrv", "filterList", function($rootScope, $scope, $log, $filter, userSrv, dataSrv, filterList) {
			$scope.collapsed = true;
			$scope.selected;
			// filters options
			$scope.filterList = filterList;
			$scope.filters = {"allProposals" : 
												{ "name" : $scope.filterList[0].name,
												  "value" : ""},
							  "myChanges" : 	{ "name" : $scope.filterList[0].name,
												  "value" : ""}
							};

			//vars for editDepts directive
			$scope.memberDepts;

			//initialize user preferences
			if (!$scope.user || !$scope.user.preferences) {
				$scope.preferences = { 
										"allProposals" : [],
										"myChanges" : [],
										"recentlyViewed" : {"number" : 7},
										"homepage"	: "/" }
			} else {
				$scope.preferences = $scope.user.preferences;
			}

			// options for a homepage
			$scope.pages = { 	
								"Dashboard" 		: "/" ,
								"Profile"			: "/user/",
								"My Changes"  		: "/dashboard/mychanges",
								"All Proposals" 	: "/dashboard/allchanges"
							};

			$scope.toggleCollapsed = function() {
				if ($scope.collapsed) {
					$scope.collapsed = false;
				} else {
					$scope.collapsed = true;
				}
			}
			$scope.select = function(menu) {
				$scope.selected = menu;
			}
			$scope.addAllPropsFilter = function() {
				var filter = {};
				filter["name"] = $scope.filters.allProposals.name;
				filter["value"] = $scope.filters.allProposals.value;
				$scope.preferences.allProposals.push(filter);
				$scope.filters.allProposals.value = "";
			}
			$scope.addMyChangesFilter = function() {
				var filter = {};
				filter["name"] = $scope.filters.myChanges.name;
				filter["value"] = $scope.filters.myChanges.value;
				$scope.preferences.myChanges.push(filter);
				$scope.filters.myChanges.value = "";
			}
			$scope.removeAllPropsFilter = function(filter) {
				var idx = $scope.preferences.allProposals.indexOf(filter);
				$scope.preferences.allProposals.splice(idx,1);
			}
			$scope.removeMyChangesFilter = function(filter) {
				var idx = $scope.preferences.myChanges.indexOf(filter);
				$scope.preferences.myChanges.splice(idx,1);
			}

			$scope.savePreferences = function() {
				$scope.user.preferences = $scope.preferences;
				userSrv.updateUser($scope.memberDepts);
			}
		}],
		scope : {
			depts : "=",
			user : "="
		}
	}
}