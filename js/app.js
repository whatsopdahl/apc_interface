var app = angular.module('CourseProposalApp', ['ngRoute']);

var gapi;
var auth2;

app.constant("auth_config", {
	client_id: '118685821641-30uo5v5evufhdqdlabs2a71p711qla3e.apps.googleusercontent.com',
	hosted_domain : "luther.edu",
    scope: 'profile email'
});

app.constant("EVENTS",{
    PROPOSAL_ADDED : 'proposal-added'
});

app.controller("mainCtrl", mainCtrl);

//initialization funciton
app.run(["$rootScope", "authSrv", "auth_config", "$location", "AUTH_EVENTS", "$log", "dataSrv",
			 function($rootScope, authSrv, auth_config, $location, AUTH_EVENTS, $log, dataSrv) {

	var postLogInRoute;

	gapi.load("auth2", function() {
		auth2 = gapi.auth2.init( auth_config );
	});

	$rootScope.$on('$locationChangeStart', function(event, next){
		//if login required (i.e. is not login page) and you're logged out, capture the current path
        if (!$rootScope.user) {
        	nextPath = next.split('#')[1];
        	if (!( nextPath == '/login')) {
	        	$rootScope.next = $location.url();
			}
        	$location.url('/login');
        }

	});
}]);

mainCtrl.$inject = ["$rootScope", "$scope", "$log", "$location", "$q", "$filter","authSrv", "dataSrv"];
function mainCtrl($rootScope, $scope, $log, $location, $q, $filter, authSrv, dataSrv) {
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
        return $q.all([dataSrv.getProposals(), dataSrv.getCourses()]).then(function(data){
            $scope.allProposals.elements = data[0];
            $scope.courses = data[1];
            $scope.retrievingData = false;
        });
    }

	$rootScope.$watch(function(){
		$scope.user = $rootScope.user;
		$scope.page = $location.path();
		if ($scope.user && $rootScope.user){
            $scope.recentlyViewed.elements = [];
            var allCoursesAndProposals = $scope.allProposals.elements.concat($scope.courses);
            angular.forEach($scope.user.recentlyViewed, function(objId) {
                $scope.recentlyViewed.elements.push($filter("filter")(allCoursesAndProposals, {_id : {$oid: objId}})[0]);
            });
       		$scope.myChanges["elements"] = $filter('filter')($scope.allProposals.elements, { owner : $scope.user.name });
       	}
	});

    $rootScope.$on('proposal-added', function(event, args) {
        initData();
        
    });
};
