var app = angular.module('CourseProposalApp', []);

app.directive("navbar", function() {
    return {
        restrict: "E",
        templateUrl: "../html/navbar.html"
    };
});

app.directive("dashboard", function() {
    return {
        restrict: "E",
        templateUrl: "../html/dashboard.html"
    };
});

app.directive("courseList", function() {
    return {
        restrict: "E",
        templateUrl: "../html/course-list.html",
        scope: {data: '='}
    };
});
