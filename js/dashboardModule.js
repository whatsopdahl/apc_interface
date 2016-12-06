var app = angular.module("CourseProposalApp");
app.controller('dashboardCtrl', ['$rootScope', '$scope', 
								 function($rootScope, $scope) {
    // this variable should be used to display a loading bar while loading the data
   	$scope.user = $rootScope.user;
}]);

app.controller("changeCtrl", ["$scope", "view", function($scope, view) {
	$scope.view = view;
	$scope.extendedView = true;
}]);

app.controller("courseListCtrl", ["$scope", "$log", "$filter", function($scope, $log, $filter){

	$scope.filterList = [ { idx : 0, name : "All"},
						  { idx : 1, name : "Title/Name"},
						  { idx : 2, name : "Department"},
						  { idx : 3, name : "Division"}, 
						  { idx : 4, name : "Owner"}
						];

	$scope.sortList = [ { idx : -1, name:"None"},
						{ idx : 0, name : "Stage"},
					  	{ idx : 1, name : "Department"},
					  	{ idx : 2, name : "Division"},
					  	{ idx : 3, name : "Date"},
					  	{ idx : 4, name : "Owner"}
						];

	$scope.queries = { "filter" : null, 
					   "sort" 	: null
					   };

	$scope.currFilter = $scope.filterList[0];
	$scope.currSort = $scope.sortList[0];

	//direction is 1 or 0: 0-A-Z, 1-Z-A
	$scope.zToa = false;

	$scope.toggleDir = function() {
		if ($scope.zToa) {
			$scope.zToa = false;
		} else {
			$scope.zToa = true;
		}
	}

	$scope.clearFilter = function() {
		$scope.queries.filter = null;
	}

	$scope.clearSort = function() {
		$scope.queries.sort = null;
	}

	$scope.filterBy = function(index) {
		$scope.currFilter = $scope.filterList[index];
	}

	$scope.sortBy = function(index){
		if (index == 0 && $scope.currSort.idx != 0) $scope.toggleDir();
		$scope.currSort = $scope.sortList[index];
	}

	$scope.filter = function(elems) {
		if ($scope.data.title != "All Proposals" || !$scope.queries.filter) {
			return elems;
		}
		var filter = $scope.queries.filter;
		switch ($scope.currFilter.idx) {
			case 0:
				return $filter('searchProposal')(elems, filter, ["stage", "owner"], ["title","name","dept","division"]);
			case 1:
				return $filter('searchProposal')(elems, filter, [], ["title", "name"]);
			case 2:
				return $filter('searchProposal')(elems, filter, [], ["dept"]);
			case 3: 
				return $filter('searchProposal')(elems, filter, [], ["division"]);
			case 4:
				return $filter('searchProposal')(elems, filter, ["owner"], []);
			default:
				return elems;
		}
	}

	$scope.sort = function(elem) {
		switch($scope.currSort.idx) {
			case 0:
				return elem.stage;
			case 1:
			 	return elem.newCourse.dept;
			case 2:
				return elem.newCourse.division;
			case 3:
				return elem.date;
			case 4:
				return elem.owner;
			default:
				return elem.newCourse.name;
		}
	}
}]);

/**
 * This function implements a filter on both the old and new course in a proposal given a field
 * in the course and a value to match. 
 *
 * @param proposals 	the proposals to filter 
 * @param value 		the value to match against
 * @param propAttrs		the attributes of the propsal to check against
 * @param courseAttrs 	the attributes to check against in the old and new course
 *
 * @return a function that returns an array of the proposals matching the given criteria
 */
app.filter('searchProposal', ["$log", function($log){
	return function(proposals, value, propAttrs, courseAttrs){
		filtered = [];
		value = value.toLowerCase();
		for (var i =0; i < proposals.length; i++) {
			var prop = proposals[i];
			var added = false;
			for (var pa = 0; pa < propAttrs; pa++) {
				if (prop[propAttrs[pa]].toLowerCase().indexOf(value) > -1){
					filtered.push(prop);
					break;
				}
			}

			if (added) continue;

			for (var ca=0; ca < courseAttrs.length; ca++) {
				var attr = courseAttrs[ca];

				if (prop.oldCourse && prop.oldCourse != null) {
					if (prop.oldCourse[attr].toLowerCase().indexOf(value) > -1){
						filtered.push(prop);
						break;
					}
				} 

				if (prop.newCourse[attr].toLowerCase().indexOf(value) > -1 ){
					filtered.push(prop);
					break;
				}
				if (added) break;
			}
		}
		return filtered;
	}
}]);