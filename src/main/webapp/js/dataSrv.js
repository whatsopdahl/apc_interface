var app = angular.module("CourseProposalApp");

//app.constant("DATA_URL", "http://localhost:8000/data");
app.constant("DATA_URL", "data");

app.factory("dataSrv", ["$http", "$log", "DATA_URL", function($http, $log, DATA_URL){
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
		archiveProposal : archiveProposal
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
	function getUser(user) {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "users",
					u : user.email
				}
		}).then(function success(response) {
			$log.info("Retieved user data");
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
			$log.info("Proposal deleted");
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
	 * This function takes a proposal object and the ID of the course it's
	 * replacing and places it in its proper archive table. The backend will
	 * handle creating new archives if necessary.
	 */	
	function archiveProposal(proposal, oldCourseID) {
		var data = { "d" : proposal, 
					 "i" : oldCourseID,
					 "q" : "archive" };
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			$log.info("Proposal deleted");
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

	function handleError(response){
		$log.error("ERROR :"+response.data);
	}
}]);
