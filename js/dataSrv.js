var app = angular.module("CourseProposalApp");

//app.constant("DATA_URL", "http://localhost:8000/data");
app.constant("DATA_URL", "http://knuth.luther.edu:8000/data");

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
		deleteProposal : deleteProposal
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
		var data = {};
		data["d"] = proposal;
		data["q"] = "create";
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
		data["q"] = "edituser";
		data["u"] = user.email;
		return $http.post(DATA_URL, data)
		.then(function success(response) {
			$log.info("User profile updated");
		}, function(response){
			handleError(response);
		});
	}

/**
	 *
	 */
	function saveProposal(proposal) {
		var data = {};
		data["q"] = "save";
		data["d"] = proposal;
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
		var data = { "d" : proposal, "q" : "delete"};
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			$log.info("Proposal deleted");
		}, function(response){
			handleError(response);
		});
	}

	function handleError(response){
		$log.error("ERROR :"+response.data);
	}
}]);
