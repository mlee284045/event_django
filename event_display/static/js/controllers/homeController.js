function homeController($scope, $http) {

    var target;

    $scope.urlSearch = function() {
        target = $scope.targetUrl;

        //set list style as displayStyle's base class
        $scope.displayStyle = 'listStyle';

        $http.post('/scrape/', target).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.list = data;
            }).
            error(function(data, status, headers, config) {
                console.log(data);
            });
    };

    $scope.removeItem = function(item) {
        var eventList = $scope.list;
        var idx = eventList.indexOf(item);
        eventList.splice(idx, 1);
    };

    $scope.listStyle = function() {
        $scope.displayStyle = 'listStyle';
    };

    $scope.gridStyle = function() {
        $scope.displayStyle = 'gridStyle';
    }

}