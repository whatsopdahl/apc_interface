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
		controller : "dashboardCtrl"
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
	.when("/courseinfo", {
		templateUrl : "templates/course-info.html"
	})
	.when("/:course", {
		templateUrl : "templates/welcome.html"
	})
	.when("/:course/edit", {
		templateUrl : "templates/welcome.html"
	})
	.when("/", {
		redirectTo : "/dashboard"
	})
	.when("/:course", {
		templateUrl : "templates/welcome.html"
	})
	.when("/:course/edit", {
		templateUrl : "templates/welcome.html"
	})
	.otherwise({ redirectTo : "/"});

});
