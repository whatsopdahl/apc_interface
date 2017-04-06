var app = angular.module("CourseProposalApp");

app.controller("navCtrl", navCtrl);

navCtrl.$inject = ["$scope", "$rootScope", "$log", "$filter", "dataSrv"];
function navCtrl($scope, $rootScope, $log, $filter, dataSrv) {
	$scope.courseQuery = { query : ""};

	$rootScope.$watch("user", function(){
		$scope.user = $rootScope.user;
	});

	$scope.clearSearch = function() {
		$scope.courseQuery = { query : ""};
	};

    $scope.openPermissionsModal = function() {
        var modal = angular.element("#permission-modal");
        modal.modal("show");
    }

    $scope.openUserPreferences = function() {
    	var modal = angular.element("#preferences-modal");
    	modal.modal("show");
    }
}

app.directive("navbar", function() {
    return {
        restrict: "E",
        templateUrl: "templates/navbar.html",
        controller : "navCtrl"
    };
});

app.filter("searchFilter", function(){
	return function(courses, query) {
		var output = [];
		query = query.toLowerCase();

		angular.forEach(courses, function(course){
			if ( course.title.toLowerCase().indexOf(query) > -1 || 
				 course.name.toLowerCase().indexOf(query) > -1 ){
				output.push(course);
			}
		});

		return output;
	}	
});