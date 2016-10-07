var app = angular.module('CourseProposalApp', ['ngRoute']);

var gapi;
var auth2;

app.constant("auth_config", {
	client_id: '118685821641-30uo5v5evufhdqdlabs2a71p711qla3e.apps.googleusercontent.com',
	hosted_domain : "luther.edu",
    scope: 'profile email'
});


app.controller("mainCtrl", mainCtrl);

//initialization funciton
app.run(["$rootScope", "authSrv", "auth_config", "$location", "AUTH_EVENTS", "$log",
			 function($rootScope, authSrv, auth_config, $location, AUTH_EVENTS, $log){
	var postLogInRoute;

	gapi.load("auth2", function() {
		auth2 = gapi.auth2.init( auth_config );
	});

	$rootScope.$on('$locationChangeStart', function(event, next){
		//if login required (i.e. is not login page) and you're logged out, capture the current path
        if (!$rootScope.user) {
        	$log.debug(next);
        	if (!next.isLogin) {
	        	$rootScope.next = $location.url();
	        	$log.debug($rootScope.next);
			}    
        	$location.url('/login');
        }
	});
}]); 

mainCtrl.$inject = ["$rootScope", "$scope", "$log", "$location", "authSrv"];
function mainCtrl($rootScope, $scope, $log, $location, authSrv) {
	$scope.logout = authSrv.logout;
	$scope.user = null;

	$rootScope.$watch(function(){
		$scope.user = $rootScope.user;
	});
};

app.directive("navbar", function() {
    return {
        restrict: "E",
        templateUrl: "templates/navbar.html"
    };
});

app.directive("courseList", function() {
    return {
        restrict: "E",
        templateUrl: "templates/course-list.html",
        scope: {data: '='}
    };
});
