var app = angular.module("CourseProposalApp");

app.controller("archivesCtrl", archivesCtrl);
app.factory("archiveSrv", archiveSrv);
app.directive("archivesModal", archivesModal);

archiveSrv.$inject=["$log", "dataSrv", "$compile", "$rootScope"];
function archiveSrv($log, dataSrv, $compile, $rootScope) {
    return {
            archiveProposal : archiveProposal,
            archiveSearch : archiveSearch,
            getArchiveById : getArchiveById,
            openArchiveModal : openArchiveModal,
            closeArchiveModal : closeArchiveModal
    }

    function archiveProposal(proposal) {
        var oldCourseId = proposal.oldCourse._id;
        dataSrv.archiveProposal(proposal, oldCourseId).then(function(data) {
            $log.info("Proposal Archived");
        })
    }

    function getArchiveById(courseId) {
        dataSrv.getArchive(courseId).then(function(data) {
            openArchiveModal(data);
        })
    }

    function archiveSearch(query, type) {
        return dataSrv.searchArchive(query, type).then(function(data) {
            return data;
        })
    }

    function openArchiveModal(record) {
        var modal = angular.element("#show-archives");
        var scope = $rootScope.$new();

        // append the record to the scope
        scope.record = record;
        scope.hideButtons = true;
        // used to hide status bar
        scope.isArchive = true;

        var content = modal.find("#archive-content");
        //clear old modal content
        content.empty();
        //load new content
        content.append($compile(
                "<div class=\"modal-header\">"
                    +"<button ng-if=\"!required\" type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>"
                    +"<h4 class=\"modal-title\">Current Course: {{record.proposals[ (record.proposals.length-1) ].newCourse.name}} - {{record.proposals[ (record.proposals.length-1) ].newCourse.title}} </h4>"
                +"</div>"
                +"<div class=\"modal-body\">"   
                    +"<div class=\"well well-sm\" ng-repeat=\"course in record.proposals\">"
                        +"<div class=\"archiveHover container-fluid\" data-toggle=\"collapse\" ng-href=\"#{{course.newCourse._id.$oid}}\">"
                            +"<div class=\"col-xs-8\">" 
                                +"<h4>{{course.newCourse.name}}</h4>"
                                +"<h5>{{course.newCourse.title}}</h5>"
                            +"</div>"
                            +"<div class=\"col-xs-4\">"
                                +"<h5 class=\"pull-right\">{{course.date | toDate | date : 'MMM d, yyyy'}}</h5>"
                            +"</div>"
                        +"</div>"
                        +"<div class=\"collapse\" id=\"{{course.newCourse._id.$oid}}\">"
                            +"<course-info></course-info>"
                        +"</div>"
                    +"</div>"
                +"</div>")(scope));

        modal.modal("show");
    }

    function closeArchiveModal() {
        var modal = angular.element("#show-archives");
        modal.modal("hide");
        angular.element(".modal-backdrop")[0].remove();
        angular.element("body").removeClass("modal-open");
    }
}

archivesCtrl.$inject = ["$scope", "$rootScope", "$log", "archiveSrv"];
function archivesCtrl($scope, $rootScope, $log, archiveSrv) {
    $scope.openArchiveModal = archiveSrv.openArchiveModal;

    $scope.results = [];
    $scope.types = ["name", "title", "year", ];
    $scope.type = $scope.types[0];
    $scope.query = "";

    $scope.searching = false;
    $scope.archiveSearch = function() {
        $scope.searching = true;
        archiveSrv.archiveSearch($scope.query, $scope.type).then(function(data) {
            $scope.results = data;
            $scope.searching = false;
        });
    }

}

function archivesModal() {
	return {
		restrict : "E",
		templateUrl : "templates/course-archive.html",
        controller : ["$scope", "$log", "archiveSrv", function($scope, $log, archiveSrv) {
        }]
	}
}
