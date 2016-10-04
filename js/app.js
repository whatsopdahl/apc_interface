var app = angular.module('CourseProposalApp', []);

app.directive("dashHeader", function() {
    return {
        restrict: "E",
        templateUrl: "../dashboard/dash-header.html"
    };
});
