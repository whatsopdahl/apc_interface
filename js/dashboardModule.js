var app = angular.module("CourseProposalApp");
app.controller('dashboardCtrl', ['$scope', 'dataSrv', function($scope, dataSrv) {
    $scope.myProposals = {title: "My Proposals"}
}]);
