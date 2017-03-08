var app = angular.module("CourseProposalApp");

app.controller("archivesCtrl", archivesCtrl);
app.directive("archivesModal", archivesModal);


archivesCtrl.$inject = ["$scope", "$rootScope", "dataSrv"];
function archivesCtrl($scope, $rootScope, dataSrv) {

    getData();
    function getData() {
        return dataSrv.searchArchive("CS-75", "name").then(function(data){
            $scope.allArchives = data;
        });
    }
    // console.log($scope.allArchives);

    $scope.openArchiveModal= function() {
        var theModal;

        theModal = angular.element("#show-archives");
		theModal.modal("show");
	}
}

function archivesModal() {
	return {
		restrict : "E",
		templateUrl : "templates/course-archive.html",

        // NEW
        link : function(scope) {
            scope.blockComments = true;
        }
	}
}
