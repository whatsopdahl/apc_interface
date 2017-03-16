var app = angular.module('CourseProposalApp', ['ngRoute']);

var gapi;
var auth2;

app.constant("auth_config", {
	client_id: '118685821641-30uo5v5evufhdqdlabs2a71p711qla3e.apps.googleusercontent.com',
	hosted_domain : "luther.edu",
    scope: 'profile email'
});

app.constant("EVENTS",{
    PROPOSAL_ADDED : 'proposal-added',
    PROPOSAL_REMOVED : 'proposal-removed',
    PROPOSAL_UPDATED : 'proposal-updated'
});

app.controller("mainCtrl", mainCtrl);

//initialization funciton
app.run(["$rootScope", "authSrv", "auth_config", "$location", "AUTH_EVENTS", "$log", "dataSrv",
			 function($rootScope, authSrv, auth_config, $location, AUTH_EVENTS, $log, dataSrv) {

	var postLogInRoute;

	gapi.load("auth2", function() {
		auth2 = gapi.auth2.init( auth_config );
	});

	$rootScope.$on('$locationChangeStart', function(event, next, prev){
		//if login required (i.e. is not login page) and you're logged out, capture the current path
        if (!$rootScope.user) {
        	nextPath = next.split('#')[1];
        	if (!( nextPath == '/login')) {
	        	$rootScope.next = $location.url();
			}
        	$location.url('/login');
        }
        $rootScope.prev = prev;
	});
}]);

mainCtrl.$inject = ["$rootScope", "$scope", "$log", "$location", "$q", "$filter","authSrv", "dataSrv", "userSrv"];
function mainCtrl($rootScope, $scope, $log, $location, $q, $filter, authSrv, dataSrv, userSrv) {
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

    $scope.retrievingData = true;
     
    initData();

    function initData() { 
        return $q.all([dataSrv.getProposals(), dataSrv.getCourses(), dataSrv.getDepts()]).then(function(data){
            $scope.allProposals.elements = data[0];
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

    $rootScope.$on('proposal-added', function(event, courseName) {
        initData().then(function(){
            userSrv.addToRecentlyViewed(courseName, $scope.courses, $scope.allProposals);
        });
    });

    $rootScope.$on('proposal-removed', function() {
        initData();
    });

    $rootScope.$on('proposal-updated', function() {
        initData();
    });
};
