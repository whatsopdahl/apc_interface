var app = angular.module('CourseProposalApp');

app.config(function($routeProvider){
	$routeProvider
	.when("/login", {
		templateUrl : "templates/login.html",
		controller : "authCtrl",
		isLogin : true
	})
	.when("/dashboard", {
		templateUrl : "templates/dashboard.html",
		controller : "dashboardCtrl",
		scope : {'allCourses': "=",
				 'allProposals' : "=",
				 'retrievingData' : "="
				}
	})
	.when("/newproposal", {
		templateUrl : "templates/new-proposal.html",
		conroller : "proposalCtrl"
	})
	.when("/dashboard/mychanges",{
		templateUrl : "templates/welcome.html"
	})
	.when("/dashboard/allchanges", {
		templateUrl : "templates/welcome.html"
	})
	.when("/dashboard/recentlyviewed", {
		templateUrl : "templates/welcome.html"
	})
	.when("/:courseName", {
		templateUrl : "templates/course-info.html",
		resolve: {'courseName': courseParams}
	})
	.when("/:course/edit", {
		templateUrl : "templates/welcome.html"
	})
	.when("/", {
		redirectTo : "/dashboard"
	})
	.otherwise({ redirectTo : "/"});

	courseParams.$inject = ['$routeParams'];
	function courseParams($routeParams) {
		return $routeParams['courseName']
	}

});
