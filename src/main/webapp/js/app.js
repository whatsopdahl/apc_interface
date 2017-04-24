var app = angular.module('CourseProposalApp', ['ngRoute']);

app.constant("EVENTS",{
    PROPOSAL_ADDED : 'proposal-added',
    PROPOSAL_REMOVED : 'proposal-removed',
    PROPOSAL_UPDATED : 'proposal-updated',
    PROPOSAL_ARCHIVED : 'proposal-archived'
});

app.controller("mainCtrl", mainCtrl);

//initialization funciton
app.run(["$rootScope", "authSrv", "$location", "AUTH_EVENTS", "$log", "dataSrv", "userSrv",
			 function($rootScope, authSrv, $location, AUTH_EVENTS, $log, dataSrv, userSrv) {
	$rootScope.$on('$locationChangeStart', function(event, next, prev){
            $rootScope.prev=prev;
            $rootScope.next=next;
        if (!$rootScope.user) {
            dataSrv.getUser().then(function (user) {
                $rootScope.user = user;
                $rootScope.$broadcast(AUTH_EVENTS.userUpdated);
            });
        }
	});
}]);

mainCtrl.$inject = ["$rootScope", "$scope", "$log", "$location", "$q", "$filter","authSrv", "dataSrv", "userSrv", "AUTH_EVENTS", "EVENTS"];
function mainCtrl($rootScope, $scope, $log, $location, $q, $filter, authSrv, dataSrv, userSrv, AUTH_EVENTS, EVENTS) {
	$scope.logout = authSrv.logout;
	$scope.user = null;
    $scope.test = "hello";
    $scope.allProposals = {	title: "All Proposals",
                            emptyMsg : "No Current Proposals",
                        	link:"allchanges"};
    $scope.recentlyViewed = {	title: "Recently Viewed",
                            	emptyMsg: "No recently viewed proposals or courses",
                        		elements : [],
                        		link: "recentlyviewed"};
                        		//returns an array of proposals filtered out by user
	$scope.myChanges = {	title:"My Changes",
							emptyMsg: "You currently do not own any proposals",
							link:"mychanges"};
    $scope.registrarData = {    title: "Ready for Registrar",
                                emptyMsg: "There are no proposals that have made it through all stages.",
                                link: "registrar"};

    $scope.retrievingData = true;
    
    function pastAllStages(proposal) {
        return proposal.stage == 4;
    }
     
    initData();
    
    function initData() { 
        return $q.all([dataSrv.getProposals(), dataSrv.getCourses(), dataSrv.getDepts()]).then(function(data){
            $scope.allProposals.elements = data[0];
            $scope.registrarData.elements = data[0].filter(pastAllStages);
            $scope.courses = data[1];
            $scope.depts = data[2];
            $scope.retrievingData = false;
        });
    }

    $scope.closeModal = function() {
        var errModal = angular.element("#error-modal");
        errModal.modal('hide');
    }


    $rootScope.$watch(function(){
            $scope.user = $rootScope.user;
            $scope.page = $location.path();
            if ($scope.user && $rootScope.user && $scope.allProposals && $scope.courses){
                $scope.recentlyViewed.elements = [];
                var allCoursesAndProposals = $scope.allProposals.elements.concat($scope.courses);
                angular.forEach($scope.user.recentlyViewed, function(objId) {
                    $scope.recentlyViewed.elements.push($filter("filter")(allCoursesAndProposals, {_id : {$oid: objId}})[0]);
                });
                    $scope.myChanges["elements"] = $filter('filter')($scope.allProposals.elements, { owner : $scope.user.name });
            }
    });

    $rootScope.$on(EVENTS.PROPOSAL_ADDED, function(event, courseName) {
        initData().then(function(){
            userSrv.addToRecentlyViewed(courseName, $scope.courses, $scope.allProposals);
        });
    });

    $rootScope.$on(EVENTS.PROPOSAL_REMOVED, function() {
        initData();
    });

    $rootScope.$on(EVENTS.PROPOSAL_UPDATED, function() {
        initData();
    });
    
    $rootScope.$on(EVENTS.PROPOSAL_ARCHIVED, function() {
        initData();
    });
    
    $rootScope.$on('auth-login-success', function() {
       initData(); 
    });
};
