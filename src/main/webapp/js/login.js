var app = angular.module('CourseProposalApp');

app.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  userUpdated : 'user-updated'
});

app.factory("authSrv", ["$log", "$rootScope", "$location", "AUTH_EVENTS", "dataSrv", "$http",
			 function($log, $rootScope, $location, AUTH_EVENTS, dataSrv, $http){
	return {
		logout : logout,
		loginFailed : loginFailed,
		userInfoFound : userInfoFound,
                userUpdated: userUpdated
	}


	function logout() {
            $location.url("logout.jsp")
        }

	function userInfoFound(user) {		
		$rootScope.user = user;
		$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

		$log.info("logged in as " + $rootScope.user.name);
		//if we have a requested url, redirect to it. otherwise go to the dash
                if ($rootScope.user.role.length == 1 && $rootScope.user.role.indexOf('Registrars_Office') > -1) {
			$location.path("/dashboard/allchanges").replace();
		} else if ($rootScope.next){
			$location.path($rootScope.next).replace();
		} else {
			$location.path("/").replace();
		}
	}

        function userUpdated() {
            $rootScope.$broadcast(AUTH_EVENTS.userUpdated);
        }

	function loginFailed(error) {
            $log.info("login failed: "+error.reason);
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $location.url("/login.html");
        }
}]);