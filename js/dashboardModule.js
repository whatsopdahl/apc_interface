var app = angular.module("CourseProposalApp");
app.controller('dashboardCtrl', ['$rootScope', '$scope', '$log', '$q', '$filter', 'dataSrv',
                                function($rootScope, $scope, $log, $q, $filter, dataSrv) {

    // $scope.retrievingData = true;
	// $q.all([dataSrv.getCourses()]).then((data) => {
	// 	$scope.allCourses = data[0];
	// 	$scope.retrievingData = false;
	// });

    console.log($scope.allCourses);
}]);
