var app = angular.module("CourseProposalApp");
app.controller('dashboardCtrl', ['$rootScope', '$scope', '$log', '$q', '$filter', 'dataSrv',
                                function($rootScope, $scope, $log, $q, $filter, dataSrv) {

    $scope.courseName = "cs150";

    $scope.retrievingData = true;
	$q.all([dataSrv.getCourses()]).then((data) => {
		$scope.allCourses = data[0];
        // console.log($scope.allCourses);
		$scope.retrievingData = false;
	});
}]);
