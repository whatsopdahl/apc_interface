var app = angular.module("CourseProposalApp");
app.controller('dashboardCtrl', ['$rootScope', '$scope', '$log', '$q', '$filter', 'dataSrv',
								 function($rootScope, $scope, $log, $q, $filter, dataSrv) {
    // this variable should be used to display a loading bar while loading the data
   	$scope.user = $rootScope.user;
	//returns an array of proposals filtered out by user
	$scope.myChanges = {title:"My Changes",
							emptyMsg: "You currently do not own any proposals"};
	$scope.myChanges["elements"] = $filter('filter')($scope.allProposals.elements, { owner : $scope.user.name });
	
	$log.debug($scope.myChanges);
}]);
