var app = angular.module('CourseProposalApp');

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when("/dashboard", {
		templateUrl : "templates/dashboard.html",
		controller : "dashboardCtrl"
	})
	.when("/newproposal", {
		templateUrl : "templates/edit-proposal.html",
		controller : "proposalCtrl",
		resolve : {
			params : resolveProposalParams
		}
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
        .when("/dashboard/registrarView", {
		templateUrl : "templates/changes.html",
		controller : "changeCtrl",
                resolve : {
                        view : function(){
                                return "registrar";
                        }
                }
	})
	.when("/dashboard/archives", {
		templateUrl : "templates/archives.html",
		controller : "archivesCtrl"
	})
	.when("/user/:user", {
		templateUrl : "templates/user-profile.html",
		controller : "userCtrl",
		resolve : {
			allProposals : ["dataSrv", function(dataSrv) {
				return dataSrv.getProposals();
			}]
		}
	})
	.when("/", {
		redirectTo : "/dashboard"
	})
	.when("/:course", {
		templateUrl : "templates/course-info.html",
        controller : "courseCtrl",
	})
	.when("/:course/edit", {
		templateUrl : "templates/edit-proposal.html",
		controller : "proposalCtrl",
		resolve : {
			params : resolveProposalParams
		}
	})
	.otherwise({ redirectTo : "/"});
}]);

resolveProposalParams.$inject=["dataSrv", "$q", "$rootScope"];
function resolveProposalParams(dataSrv, $q, $rootScope) {
	return $q.all([dataSrv.getDepts(), dataSrv.getUsers()]).then(function(data) {
		return { depts : data[0],
				 faculty : data[1]}
	});
}