var app = angular.module("CourseProposalApp");
app.controller('dashboardCtrl', ['$rootScope', '$scope', '$log', '$q', 'dataSrv',
								 function($rootScope, $scope, $log, $q, dataSrv) {
    // this variable should be used to display a loading bar while loading the data
   	$scope.user = $rootScope.user;
}]);

app.controller("changeCtrl", ["$scope", "view", function($scope, view) {
	$scope.view = view;
	$scope.extendedView = true;
}]);
