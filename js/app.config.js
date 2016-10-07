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
	.when("/:course", {
		templateUrl : "templates/welcome.html"
	})
	.when("/:course/edit", {
		templateUrl : "templates/welcome.html"
	})
	.when("/newproposal", {
		templateUrl : "templates/welcome.html"
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
	.when("/", {
		redirectTo : "/dashboard"
	})
	.otherwise({ redirectTo : "/"});

});