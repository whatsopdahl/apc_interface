var app = angular.module("CourseProposalApp");

app.controller("userCtrl", userCtrl);
app.factory("userSrv", userSrv);
app.directive("editPermissionsModal", editPermissionsModal);
app.directive("userPreferencesModal", userPreferencesModal);

userCtrl.$inject = ["$rootScope", "$scope", "$log", "$filter","allProposals", "userSrv"];
function userCtrl($rootScope, $scope, $log, $filter, allProposals, userSrv) {
	$scope.user = $rootScope.user;
        $scope.allProposals = allProposals;
        $scope.myChanges = { elements  : $filter('filter')($scope.allProposals, { owner : $scope.user.name })};

	$scope.openEditModal= function(type) {
		if (type == "permissions") {
			angular.element("#permission-modal").modal("show");
		} else if (type == "preferences") {
			userSrv.openPreferencesModal();
		}
	}
        
        $rootScope.$on("user-updated", function() {
           $scope.user = $rootScope.user; 
        });
}

userSrv.$inject = ["$rootScope", "$filter", "$log", "$q", "$compile", "dataSrv", "authSrv", "filterList"];
function userSrv($rootScope, $filter, $log, $q, $compile, dataSrv, authSrv, filterList) {
    return {
            addToRecentlyViewed : addToRecentlyViewed,
            removeFromRecentlyViewed : removeFromRecentlyViewed,
            openPreferencesModal : openPreferencesModal,
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
                    if ( checkProposal && ( (checkProposal.oldCourse && checkProposal.oldCourse.name == course.name) || 
                            (checkProposal.newCourse && checkProposal.newCourse.name == course.name) ) ) {
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
                    var limit = 7;
                    if ($rootScope.user.preferences) {
                        limit = $rootScope.user.preferences.recentlyViewed.number;
                    }
                    if ($rootScope.user.recentlyViewed.length > limit) {
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

    /**
     * This function dynamically creates the preferences modal. Due to async
     * nature of the login function, this needs to be done dynamically. 
     */
    function openPreferencesModal() {
        var modal = angular.element("#preferences-modal");
        var scope = $rootScope.$new();

        // append the record to the scope
        scope.user = $rootScope.user;
        $q.all([dataSrv.getDepts()]).then( function(data) {
            scope.depts = data[0];
            var memberDepts = [];
            if (scope.user.dept) {
                angular.forEach(scope.user.dept, function(d){
                    memberDepts.push($filter("filter")(scope.depts, { abbrev : d})[0]);
                });
            }
            scope.memberDepts = memberDepts;
            scope.selectedDept = {"dept" : scope.depts[0]};
            //initialize user preferences
            if (!scope.user.preferences) {
                scope.preferences = {  "filters" : {},
                                        "recentlyViewed" : {"number" : 7}
                                    }
            } else {
                scope.preferences = scope.user.preferences;
            }

            scope.addDept = function() {
                if (scope.memberDepts.indexOf(scope.selectedDept.dept) == -1){
                    scope.memberDepts.push(scope.selectedDept.dept);
                }
            }

            scope.removeDept = function(dept) {
                var index = scope.memberDepts.indexOf(dept);
                scope.memberDepts.splice(index,1);
            } 

            scope.selected;
            // filters options
            scope.filterList = filterList;
            scope.filters = { "name" : scope.filterList[0].name,
                              "value" : ""};

            scope.toggleCollapsed = function() {
                if (scope.collapsed) {
                        scope.collapsed = false;
                } else {
                        scope.collapsed = true;
                }
            }
            scope.select = function(menu) {
                    scope.selected = menu;
            }
            scope.addAllPropsFilter = function() {
                    scope.preferences.filters["name"] = scope.filters.name;
                    scope.preferences.filters["value"] = scope.filters.value;
                    scope.filters.value = "";
            }
            scope.removeAllPropsFilter = function(filter) {
                    scope.preferences.filters = {};
            }

            scope.savePreferences = function() {
                    scope.user.preferences = scope.preferences;
                    var modal = angular.element("#preferences-modal");
                    modal.modal('hide');
                    angular.element(".modal-backdrop")[0].remove();
                    angular.element("body").removeClass("modal-open");
                    scope.user.division = [];
                    scope.user.dept = [];
                    angular.forEach(scope.memberDepts, function(dept){
                            if (scope.user.division.indexOf(dept.division) == -1) {
                                    scope.user.division.push(dept.division);
                            }
                            if (scope.user.dept.indexOf(dept.abbrev) == -1) {
                                scope.user.dept.push(dept.abbrev);
                            }
                    });
                    scope.user.recentlyViewed = scope.user.recentlyViewed.slice(0,scope.user.preferences.recentlyViewed.number);
                    dataSrv.editUser(scope.user).then(function(resp){
                        $rootScope.user = scope.user;
                        authSrv.userUpdated();
                    }, function(err) {
                            $log.error("Unable to update user. Logging out...");
                            authSrv.logout();
                    });
            }   

            scope.clearData = function() {
                scope.filters = { "name" : scope.filterList[0].name,
                              "value" : ""};
                var memberDepts = [];
                if (scope.user.dept) {
                    angular.forEach(scope.user.dept, function(d){
                        memberDepts.push($filter("filter")(scope.depts, { abbrev : d})[0]);
                    });
                }
                scope.memberDepts = memberDepts;
                scope.selectedDept = {"dept" : scope.depts[0]};
            }
            var content = modal.find("#preferences-modal-content");
            //clear old modal content
            content.empty();
            //load new content
            content.append($compile(
                    "<div class=\"modal-header\">"
                            +"<button type=\"button\" ng-click=\"clearData()\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><a href=\"\"><span aria-hidden=\"true\">&times;</span></a></button>"
                            +"<h4 class=\"modal-title\" id=\"user-preferences\">User Preferences</h4>"
                    +"</div>"
                    +"<div class=\"modal-body\">"
                    +"<div class=\"container-fluid\">"
                        +"<div class=\"col-xs-4\">"
                            +"<div class=\"list-group\">"
                                +"<a href=\"\" title=\"Edit department membership\" class=\"list-group-item\" ng-class=\"{'active' : selected=='depts'}\" ng-click=\"select('depts')\">Departments</a>"
                                +"<a href=\"\" title=\"Default Filters\" class=\"list-group-item\" ng-class=\"{'active' : selected=='All Proposals'}\" ng-click=\"select('All Proposals')\">Default Filters</a>"
                                +"<a href=\"\" title=\"Recently Viewed\" class=\"list-group-item\" ng-class=\"{'active' : selected=='Recently Viewed'}\"ng-click=\"select('Recently Viewed')\">Recently Viewed</a>"
                            +"</div>"
                        +"</div>"
                        +"<div class=\"col-xs-8\" id=\"view-port\" ng-switch=\"selected\">"
                            +"<div class=\"container-fluid\" ng-switch-when=\"depts\">"
                                +"<div class=\"container-fluid\">"
                                    +"<label>Department<span style=\"color: red;\">*</label>"
                                    +"<form class=\"form-inline\">"
                                        +"<div class=\"form-group\">"
                                                        +"<select class=\"form-control\" ng-required=\"required\" ng-model=\"selectedDept.dept\" ng-options=\"dept as dept.name for dept in depts | orderBy : 'name' track by dept.abbrev\">"
                                                        +"</select>"
                                                        +"<div class=\"col-xs-4 col-xs-offset-4 btn btn-primary\" ng-click=\"addDept()\">Add</div>"
                                                +"</div>"
                                        +"</form>"
                                +"</div>"
                                +"<div class=\"container-fluid\">"
                                        +"<div class=\"col-xs-4 btn-removable\" ng-repeat=\"dept in memberDepts track by dept.abbrev\">{{dept.abbrev}}<div class=\"pull-right\" aria-hidden=\"true\" ng-click=\"removeDept(dept)\">&times;</div>"
                                        +"</div>"
                                +"</div>"
                            +"</div>"
                            +"<div class=\"container-fluid\" ng-switch-when=\"All Proposals\">"
                                +"<h5>All Proposals</h5>"
                                +"<p>Select the default filters you would like applied to the 'All Proposals' view. You can always override them when you visit the 'All Proposals' page. </p>"
                                +"<form> "
                                    +"<div class=\"form-group\" title=\"Select your default filters\">"
                                        +"<label>Filters</label>"
                                        +"<select class=\"form-control\" ng-model=\"filters.name\" ng-options=\"item.name as item.name for item in filterList\">"
                                        +"</select>"
                                    +"</div>"
                                +"</form>"
                                +"<label>Value</label>"
                                +"<form class=\"form-inline\">"
                                    +"<div class=\"form-group\" title=\"Enter the filter value\">"
                                        +"<input type=\"text\" class=\"form-control\" ng-model=\"filters.value\"/>"
                                        +"<div class=\"btn btn-primary\" ng-click=\"addAllPropsFilter()\">Add</div>"
                                    +"</div>"
                                +"</form>"
                                +"<div class=\"container-fluid\">"
                                     +"<div ng-if=\"preferences.filters.name && preferences.filters.value\" class=\"col-xs-12 btn-removable\">"
                                     +"{{preferences.filters.name}} = {{preferences.filters.value}}<div class=\"pull-right\" aria-hidden=\"true\" ng-click=\"removeAllPropsFilter(filter)\">&times;</div>"
                                    +"</div>"
                                 +"</div>"
                            +"</div>"
                            +"<div class=\"container-fluid\" ng-switch-when=\"Recently Viewed\">"
                                +"<h5>Recently Viewed</h5>"
                                +"<p>Enter how many recently viewed pages you would like to see.</p>"
                                +"<form>" 
                                    +"<div class=\"form-group\" title=\"Select your default filters\">"
                                        +"<input type=\"number\" class=\"form-control\"  ng-model=\"preferences.recentlyViewed.number\">"
                                        +"</input>"
                                    +"</div>"
                                +"</form>"
                            +"</div>"
                        +"</div>"
                    +"</div>"
                +"</div>" //end of modal body
                +"<div class=\"modal-footer\">"
                    +"<button class=\"btn btn-default\" ng-click=\"clearData()\" data-dismiss=\"modal\">Close</button>"
                    +"<button class=\"btn btn-success\" ng-click=\"savePreferences()\">Save</button>"
                +"</div>")(scope)
            );
    
            modal.modal("show");
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
			
			$scope.chairs = [ "APC", "History and Social Sciences","Humanities and Fine Arts", "Mathematics, Science and Physical Education" ].concat(deptAbbrevs);

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
		restrict : "E",
		templateUrl : "templates/preferences-modal.html"
	}
}