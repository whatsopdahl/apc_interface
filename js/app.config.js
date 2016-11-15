var app = angular.module('CourseProposalApp');

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when("/login", {
		templateUrl : "templates/login.html",
		controller : "authCtrl",
		resolve : {
			depts : ['dataSrv', function(dataSrv) {
				return dataSrv.getDepts();
			}]
		},
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
		templateUrl : "templates/changes.html", 
		controller : "changeCtrl",
		resolve : {
			view : function() {
				return "mychanges";
			}
		}
	})
	.when("/dashboard/allchanges", {
		templateUrl : "templates/changes.html",
		controller : "changeCtrl",
		resolve : {
			view : function() {
				return "allchanges";
			}
		}
	})
	.when("/dashboard/recentlyviewed", {
		templateUrl : "templates/changes.html",
		controller : "changeCtrl",
		resolve : {
			view : function(){
				return "recent";
			}
		}
	})
	.when("/", {
		redirectTo : "/dashboard"
	})
	.when("/:course", {
		templateUrl : "templates/course-info.html",
		controller : "courseCtrl"
	})
	.when("/:course/edit", {
		templateUrl : "templates/welcome.html"
	})
	.otherwise({ redirectTo : "/"});
}]);
