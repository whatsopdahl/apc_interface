var app = angular.module("CourseProposalApp");
app.controller('dashboardCtrl', ['$scope', function($scope) {
    $scope.myProposals = {title: "My Proposals"};
    $scope.courseName = "cs150";
}]);
