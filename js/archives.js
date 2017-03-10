var app = angular.module("CourseProposalApp");

app.controller("archivesCtrl", archivesCtrl);
app.directive("archivesModal", archivesModal);


archivesCtrl.$inject = ["$scope", "$rootScope"];
function archivesCtrl($scope, $rootScope) {
    $scope.openArchiveModal= function() {
        console.log("HELLLLOOOOOOOO");
        var theModal;

        theModal = angular.element("#show-archives");
		theModal.modal("show");
	}
}

function archivesModal() {
	return {
		restrict : "E",
		templateUrl : "templates/course-archive.html"
	}
}
