function ControllerHistoricalEntry($window, $scope, $element, $attrs, $mdToast, $http, $mdDialog) {
    var self = this;

    self.$onInit = function () {
        this.entryIndex = this.data.index;
        this.originalNumbers = this.data.entry;

        $scope.showEdit = false;
        $scope.showData = true;
        $scope.editField = this.data.entry.toString();

    }

    $scope.editEntry = function () {
        this.showEdit = true;
        this.showData = false;
    }

    $scope.patchEntry = function () {
        var numbers = JSON.parse('[' + this.editField + ']');
        numbers.customSort();
        var obj = {
            index: self.entryIndex,
            numbers: numbers
        }
        $http({
                method: 'PATCH',
                url: '/api/numbers',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: obj
            })
            .then(function successCallback(response) {
                if (response.data.success) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(response.data.info)
                        .position('top right')
                        .hideDelay(3000)
                    );
                    $scope.showEdit = false;
                    $scope.showData = true;
                    $scope.$emit('dataChanged');
                }
            }, function errorCallback(response) {
                console.log(response)
            });
    }

    $scope.deleteEntry = function(){
        $http({
                method: 'DELETE',
                url: '/api/numbers',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    index: self.entryIndex
                }
            })
            .then(function successCallback(response) {
                if (response.data.success) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(response.data.info)
                        .position('top right')
                        .hideDelay(3000)
                    );
                    $scope.showEdit = false;
                    $scope.showData = true;
                    $scope.$emit('dataChanged');
                }
            }, function errorCallback(response) {
                console.log(response)
            });
    }
}

angular.module('AppSortNumbers').component('historicalEntry', {
    templateUrl: '../../app/views/components/historicalEntry.html',
    controller: ControllerHistoricalEntry,
    bindings: {
        data: '='
    }
});

Array.prototype.customSort = function () {
    this.sort(function (a, b) {
        return b - a;
    })
};