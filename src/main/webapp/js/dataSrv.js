var app = angular.module("CourseProposalApp");

app.constant("DATA_URL", "data");

app.factory("dataSrv", ["$http", "$log", "$rootScope", "$filter", "DATA_URL", "EVENTS",  
    function($http, $log, $rootScope, $filter, DATA_URL, EVENTS){
	return {
		getUser : getUser,
		getUsers : getUsers,
		getCourses : getCourses,
		getProposals : getProposals,
		getRecentlyViewed : getRecent,
		getDepts : getDepts,
		editUser : editUser,
		saveProposal : saveProposal,
		createProposal : createProposal,
		deleteProposal : deleteProposal,
		getArchive : getArchive,
		getAllArchives : getAllArchives,
		searchArchive : searchArchive,
		archiveProposal : archiveProposal,
                addToRecentlyViewed : addToRecentlyViewed,
                removeFromRecentlyViewed : removeFromRecentlyViewed
	}

	/**
	 *
	 */
	function getCourses() {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "courses"
				}
		}).then(function success(response) {
			$log.info("Retrieved Courses");
			return response.data;
		}, function(response){
			handleError(response);
		});
	}

	/**
	 *
	 */
	function getProposals() {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "proposals"
				}
		}).then(function success(response) {
			$log.info("Retrieved Proposals");
			return response.data;
		}, function(response){
			handleError(response);
		});
	}

	/**
	 *
	 */
	function getUser() {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "getUser"
                                }
		}).then(function success(response) {
			$log.info("Retrieved user data");
			return response.data;
		}, function(response){
			handleError(response);
		});
	}

	/**
	 *
	 */
	function getUsers() {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "users"
				}
		}).then(function success(response) {
			$log.info("Retrieved all user data");
			return response.data;
		}, function(response){
			handleError(response);
		});
	}

	function getDepts() {
		return $http({
					method : "GET",
					url : DATA_URL,
					params : {
						q : "departments"
					}
		}).then(function success(response) {
			$log.info("Retrieved department data");
			return response.data;
		}, function(response) {
			handleError(response);
		});
	}

	/**
	 *
	 */
	function getRecent(user) {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "recent",
					u : user.email
				}
		}).then(function(response) {
			$log.info("Retieved recently viewed");
			return response.data;
		}, function(response){
			handleError(response);
		});
	}


	/**
	 *
	 */
	function createProposal(proposal) {
		var data = {"d" : proposal,
					"q" : "create"};
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success(response) {
			$log.info("Proposal successfully created");
                        $rootScope.$broadcast(EVENTS.PROPOSAL_ADDED, proposal.newCourse.name, proposal.newCourse.title);
			return response.data;
		}, function(response){
			handleError(response);
		});
	}

/**
	 *
	 */
	function editUser(user) {
		var data = {};
		data["d"] = user;
		data["u"] = user.email;
		data["q"] = "edituser";
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success(response) {
			$log.info("User profile updated");
		}, function(response){
			handleError(response);
		});
	}

/**
	 *
	 */
	function saveProposal(proposal) {
		var data = { "d" : proposal,
					 "q" : "save" };
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			$log.info("Proposal saved");
                        $rootScope.$broadcast(EVENTS.PROPOSAL_UPDATED);
		}, function(response){
			handleError(response);
		});
	}

/**
	 *
	 */
	function deleteProposal(proposal) {
		var data = { "d" : proposal,
					 "q" : "delete"};
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			$log.info("Proposal deleted");
                        $rootScope.$broadcast(EVENTS.PROPOSAL_REMOVED);
		}, function(response){
			handleError(response);
		});
	}

	/**
	 * This function takes a proposal object and the ID of the course it's
	 * replacing and places it in its proper archive table. The backend will
	 * handle creating new archives if necessary.
	 */	
	function archiveProposal(proposal) {
		var data = { "d" : proposal, 
					 "q" : "archive" };
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
                    removeFromRecentlyViewed(proposal);
                    //add new course to recently viewed
                    $rootScope.user.recentlyViewed.unshift(proposal.newCourse._id.$oid);
                    var limit = 7;
                    if ($rootScope.user.preferences) {
                        limit = $rootScope.user.preferences.recentlyViewed.number;
                    }
                    while ($rootScope.user.recentlyViewed.length > limit) {
                            $rootScope.user.recentlyViewed.pop();
                    }
                    editUser($rootScope.user).then(function(data) {
                        $log.info("Proposal archived");
                        $rootScope.$broadcast(EVENTS.PROPOSAL_ARCHIVED);
                    });
		}, function(response) {
			handleError(response);
		});
	}
	
	/**
	 *
	 */

	function searchArchive(query, field) {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "archiveSearch",
					s : query,
					f : field
				}
		}).then(function success(response) {
			$log.info("Received search results from archive query");
			return response.data;
		}, function(response) {
			handleError(response);
		}); 
	}
	
	/**
	 *
	 */
	function getArchive(courseID) {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "archiveGet",
					i : courseID
				}
		}).then(function success(response) {
			$log.info("Retrieved archive");
			return response.data;
		}, function(response) {
			handleError(response);
		});
	}
	
	
	function getAllArchives() {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "archiveGetAll"
				}
		}).then(function success(response) {
			$log.info("Retrieved all archive data");
			return response.data;
		}, function(response){
			handleError(response);
		});
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
       function addToRecentlyViewed(courseName, courseTitle, courses, allProposals) {
               //the course must exist in the database, so find it first

               var course = $filter("filter")(courses, {name: courseName, title: courseTitle}, true)[0];

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
                       while ($rootScope.user.recentlyViewed.length > limit) {
                               $rootScope.user.recentlyViewed.pop();
                       }
               } else {
                       var lastViewed = $rootScope.user.recentlyViewed[0];
                       $rootScope.user.recentlyViewed[0] = course._id.$oid;
                       $rootScope.user.recentlyViewed[courseIdx] = lastViewed;
               }
               editUser($rootScope.user).then(function(data) {
                       $log.info("Saved Recently Viewed");
               });
               return course;
       }

       function removeFromRecentlyViewed(course) {
               var idx = $rootScope.user.recentlyViewed.indexOf(course._id.$oid);
               if (idx != -1) {
                       $rootScope.user.recentlyViewed.splice(idx,1);
                       editUser($rootScope.user).then(function(data) {
                               $log.info("Saved Recently Viewed");
                       });
               }
       }

	function handleError(response){
		$log.error("ERROR :"+response.data);
	}
}]);
