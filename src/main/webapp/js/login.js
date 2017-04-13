var app = angular.module('CourseProposalApp');

app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  userNotFound: 'user-not-found',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized',
  userChanged : 'auth-user-changed',
  authenticating : 'auth-in-progress',
  moreUserData : 'gathering-user-data'
});

// "depts" needs to get added back in
app.controller("authCtrl", ["$scope", "$rootScope", "$log", "authSrv", "dataSrv", "userSrv", "AUTH_EVENTS",
	function($scope, $rootScope, $log, authSrv, dataSrv, userSrv, AUTH_EVENTS) {
            $scope.loginfailure = false;
            $scope.j_username;
            $scope.j_password;

	    $scope.loginFailed = authSrv.loginFailed;

	    $rootScope.$on(AUTH_EVENTS.loginFailed, function() {
	    	$scope.loginfailure = true;
	    });

	    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(){
	    	$scope.loginfailure = false;
                $scope.depts = dataSrv.getDepts();
	    });
        
            $scope.memberDepts = [];
            $scope.user = $rootScope.user;
            
            $scope.authenticate = function() {
                $rootScope.$broadcast(AUTH_EVENTS.authenticating);
                authSrv.login($scope.j_username, $scope.j_password);
            }

            $scope.updateDepts = userSrv.updateDepts;        
}]);

app.factory("authSrv", ["$log", "$rootScope", "$location", "AUTH_EVENTS", "dataSrv", "$http",
			 function($log, $rootScope, $location, AUTH_EVENTS, dataSrv, $http){
	return {
		login : login,
		logout : logout,
		loginFailed : loginFailed,
		userInfoFound : userInfoFound
	}


	function logout() {
            $log.info('User signed out.');
            $rootScope.user = null;
            $location.url("/login");
            $rootScope.$digest();
        }

	function login(username, password) {
            $http( { method : "POST",
                     url : "j_security_check",
                     data : {
                         j_username : username,
                         j_password : password
                     }
            }).then(function success(response) {
                $log.debug(response);
                dataSrv.getUser().then( function(data) {
			if (!data) {
				$log.debug("User not in database, prompting for more data");
				var dialog = angular.element("#preferences-modal");
				dialog.modal('show');
                                $rootScope.$broadcast(AUTH_EVENTS.moreUserData);
				return;
			}
			userInfoFound(data);
		});
            }, function error(response) {
                loginFailed(response);
            });
	}

	function userInfoFound(user) {		
		$rootScope.user = user;
		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

		$log.info("logged in as " + $rootScope.user.name);
		//if we have a requested url, redirect to it. otherwise go to the dash
		if ($rootScope.next){
			$location.path($rootScope.next).replace();
		} else if ($rootScope.user.preferences) {
			var url = $rootScope.user.preferences.homepage;
			if (url == "/user/") {
				url += $rootScope.user.name;
			}
			$location.path(url).replace();
		} else {
			$location.path("/").replace();
		}
	}

	function loginFailed(error) {
    	$log.info("login failed: "+error.reason);
    	$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
		$location.url("/login");
        }
}]);