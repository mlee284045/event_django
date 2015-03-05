function homeController($scope, $http) {
    console.log('home');

    var target;

    $scope.testing = function() {
        console.log('testing completed!!!!!')
    };

    $scope.urlSearch = function() {
        target = $scope.targetUrl;

        //set list style as displayStyle's base class
        $scope.displayStyle = 'listStyle';

        $http.post('/scrape/', target).
            success(function(data, status, headers, config) {
                console.log('success');
                console.log(data);
                $scope.list = data;
            }).
            error(function(data, status, headers, config) {
                console.log(data);
                console.log('failed');
            });
    };

    $scope.removeItem = function(item) {
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