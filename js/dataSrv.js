var app = angular.module("CourseProposalApp");

app.constant("DATA_URL", "/test");

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
	function getUser(user) {
		return $http({ method : "GET",
				url : DATA_URL,
				params : {
					q : "users",
					u : user.email.split("@")[0]
				}
		}).then(function success(response) {
			
		}, function error(){

		});

	}


	/**
	 * Data is all the data to insert as JSON object
	 */
	function createProposal(data) {
		data["q"] = "create";
		return $http({ method: "POST",
				url : DATA_URL,
				data : data
		}).then(function success() {

		}, function fail(){ 

		});
	}

}]);