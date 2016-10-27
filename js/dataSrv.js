var app = angular.module("CourseProposalApp");

app.constant("DATA_URL", "http://localhost:8080/data");

app.factory("dataSrv", ["$http", "$log", "DATA_URL", function($http, $log, DATA_URL){
	return {
		getUser : getUser,
		getUsers : getUsers,
		getCourses : getCourses,
		getProposals : getProposals,
		getRecentlyViewed : getRecent
		//addComment : addComment
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
		}, handleError(response) );
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
		}, handleError(response) );
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
		}, handleError(response) );
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
		}, handleError(response) );
	}


	/**
	 *
	 */
	function createProposal(data) {
		data["q"] = "create";
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			$log.info("Proposal successfully created");
		},handleError(response) );
	}

/**
	 *
	 */
	function editUser(data, user) {
		data["q"] = "edit";
		data["u"] = user.email
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success(response) {
			$log.info("User profile updated");
		}, handleError(response) );
	}

/**
	 *
	 */
	function saveProposal(data) {
		data["q"] = "save";
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			$log.info("Propsal saved");
		}, handleError(response) );
	}

/**
	 *
	 */
	function deleteProposal(data) {
		data["q"] = "delete";
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			$log.info("Proposal deleted");
		}, handleError(response) );
	}

	function handleError(response){
		$log.error("ERROR :"+response.data);
		return null
	}
}]);


