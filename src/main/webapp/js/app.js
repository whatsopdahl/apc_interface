var app = angular.module('CourseProposalApp', ['ngRoute']);

app.constant("EVENTS",{
    PROPOSAL_ADDED : 'proposal-added',
    PROPOSAL_REMOVED : 'proposal-removed',
    PROPOSAL_UPDATED : 'proposal-updated'
});

app.controller("mainCtrl", mainCtrl);

//initialization funciton
app.run(["$rootScope", "authSrv", "$location", "AUTH_EVENTS", "$log", "dataSrv",
			 function($rootScope, authSrv, $location, AUTH_EVENTS, $log, dataSrv) {
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

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);

mainCtrl.$inject = ["$rootScope", "$scope", "$log", "$location", "$q", "$filter","authSrv", "dataSrv", "userSrv", "AUTH_EVENTS"];
function mainCtrl($rootScope, $scope, $log, $location, $q, $filter, authSrv, dataSrv, userSrv, AUTH_EVENTS) {
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
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
       initData(); 
    });
     
    $rootScope.$on(AUTH_EVENTS.authenticating, function() {
        $scope.retrievingData = true;
    });
    
    $rootScope.$on(AUTH_EVENTS.moreUserData, function() {
       $scope.retrievingData = false; 
    });
     
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
