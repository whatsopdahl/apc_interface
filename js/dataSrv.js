var app = angular.module("CourseProposalApp");

app.constant("DATA_URL", "/data");

app.factory("dataSrv", ["$http", "DATA_URL", function($http, DATA_URL){
	return {
		getUser : getUser,
		getUsers : getusers,
		getCourses : getCourses,
		getProposals : getPropsals,
		getRecentlyViewed : getRecentlyViewed,

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
			return response
		}, function error(){
			console.log("There was an error with the request")
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
			return response
		}, function error(){
			console.log("There was an error with the request")
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
					u : user.email.split("@")[0]
				}
		}).then(function success(response) {
			return response
		}, function error(){
			console.log("There was an error with the request")
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
			return response
		}, function error(){
			console.log("There was an error with the request")
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
					u : user.email.split("@")[0]
				}
		}).then(function success(response) {
			return response
		}, function error(){
			console.log("There was an error with the request")
		});
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
			console.log('Successful.')
		}, function fail(){
			console.log("It failed.")
		});
	}
}]);

/**
	 *
	 */
	function editUser(data, user) {
		data["q"] = "edit";
		data["u"] = user.email.split("@")[0]
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			console.log('Successful.')
		}, function fail(){
			console.log("It failed.")
		});
	}
}]);

/**
	 *
	 */
	function saveProposal(data) {
		data["q"] = "save";
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			console.log('Successful')
		}, function fail(){
			console.log('It failed.')
		});
	}
}]);

/**
	 *
	 */
	function deleteProposal(data) {
		data["q"] = "delete";
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {
			console.log('Successful')
		}, function fail(){
			console.log('It failed.')
		});
	}
}]);
