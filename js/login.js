var app = angular.module('CourseProposalApp');

app.directive("signInButton", signInButton);

app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  userNotFound: 'user-not-found',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized',
  userChanged : 'auth-user-changed'
});

// "depts" needs to get added back in
app.controller("authCtrl", ["$scope", "$rootScope", "$log", "authSrv", "dataSrv", "AUTH_EVENTS",
	function($scope, $rootScope, $log, authSrv, dataSrv, AUTH_EVENTS) {
		$scope.loginfailure = false;

		$scope.login = authSrv.login;

	    $scope.loginFailed = authSrv.loginFailed;

	    $rootScope.$on(AUTH_EVENTS.loginFailed, function() {
	    	$scope.loginfailure = true;
	    });

	    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
	    	$scope.loginfailure = false;
	    });

	    //code for extra department information
        // ope.depts = depts;
        // ope.required = true;
        // ope.selectedDept;
        // ope.memberDepts = [];
        // ope.addDept = function() {
	 //   		if ($scope.memberDepts.indexOf($scope.selectedDept) == -1){
	 //   			$scope.memberDepts.push($scope.selectedDept);
	 //   		}
        //
        // ope.removeDept = function(dept) {
	 //   		var index = $scope.memberDepts.indexOf(dept);
	 //   		$scope.memberDepts.splice(index,1);
        //
        //
        // ope.updateUser = updateUser;
        //
        // ction updateUser() {
	 //   		var user = $rootScope.user;
	 //   		$log.debug("updating user", $rootScope.user);
	 //   		user.dept = [];
	 //   		user.division = [];
	 //   		user.recentlyViewed = [];
	 //   		angular.forEach($scope.memberDepts, function(dept){
	 //   			if (user.division.indexOf(dept.division) == -1) {
	 //   				user.division.push(dept.division);
	 //   			}
	 //   			user.dept.push(dept.abbrev);
	 //   		});
	 //   		dataSrv.editUser(user).then(function(resp){
	 //   			authSrv.userInfoFound(user);
	 //   		}, function(err) {
	 //   			$log.error("Unable to update user. Logging out...");
	 //   			authSrv.logout();
	 //   		});
        //
}]);

app.factory("authSrv", ["$log", "$rootScope", "$location", "AUTH_EVENTS", "dataSrv",
			 function($log, $rootScope, $location, AUTH_EVENTS, dataSrv){
	return {
		signinChanged : signinChanged,
		userChanged : userChanged,
		refreshValues : refreshValues,
		login : login,
		logout : logout,
		loginFailed : loginFailed,
		userInfoFound : userInfoFound
	}


	function logout() {
    	auth2 = gapi.auth2.getAuthInstance();
    	auth2.disconnect();
    	auth2.signOut().then(function () {
      		$log.info('User signed out.');
      		$rootScope.user = null;
      		$location.url("/login");
      		$rootScope.$digest();
    	});
    }

	function login(googleUser) {
		var user = {};
		var profile = googleUser.getBasicProfile();
		user["name"] = profile.getName();
		user["email"] = profile.getEmail();

		$rootScope.user = user;

		dataSrv.getUser(user).then( function(data) {
			if (data) {
				$log.debug(data);
			} else {
				$log.debug("No User data found");
				var dialog = angular.element("#more-user-data");
				dialog.modal('show');
				return;
			}
			userInfoFound(user);
		});
	}

	function userInfoFound(user) {
		$rootScope.user = user;
		$log.info("logged in as " + $rootScope.user.name);

		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

		//if we have a requested url, redirect to it. otherwise go to the dash
		if ($rootScope.next){
			$location.path($rootScope.next).replace();
		} else {
			$location.path("/").replace();
		}
	}

	function loginFailed(error) {
    	$log.info("login failed: "+error.reason);
    	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		$location.url("/login");
		$rootScope.$digest();
    }
	/**
	 * Updates signinStatus
	 *
	 * @param loggedIn boolean value of login status
	 */
	function signinChanged(loggedIn) {
		if (loggedIn) {
			refreshValues();
		} else {
			logout();
		}
	}

	function userChanged(user) {
		updateUser(user);
	}

	/**
	 * Retrieves the current user and signed in states from the GoogleAuth
	 * object.
	 */
	function refreshValues() {
	  if (auth2){
	    googleUser = auth2.currentUser.get();

	    if (auth2.isSignedIn.get()) {
	    	updateUser(googleUser);
	    }
	  }
	}

	function updateUser(user){
		var profile = user.getBasicProfile();
		if (profile) {
			if (!$rootScope.user) {
				$rootScope.user = {};
			}
			$rootScope.user.name = profile.getName();
			$rootScope.user.email = profile.getEmail();
			//get rest of user data with backside call
		} else {
			$rootScope.user = null;
		}
	};
}]);

signInButton.$inject = ["authSrv"];
function signInButton(authSrv) {
	return {
		restrict : 'E',
		template: '<div></div>',
        link: function(scope, element, attrs) {
        	var div = element.find('div')[0];
            div.id = "signInBtn";
            gapi.signin2.render(div.id, {
        		'scope': 'profile email',
		        'width': 240,
		        'height': 50,
		        'longtitle': true,
		        'theme': 'light',
		        'onsuccess': scope.login,
		        'onfailure': scope.loginFailed
		    });
        }
	}
}
