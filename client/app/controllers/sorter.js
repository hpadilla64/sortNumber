app.controller('ControllerSorter', function ($window, $scope, $mdToast, $http, $mdDialog) {
    $scope.selectedNumbers = [];
    $scope.toAddNumber = 0;
    $scope.historial = [];

    $scope.addNumber = function () {
        var numbers = this.selectedNumbers;
        var numberExists = false;
        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] == this.toAddNumber) {
                numberExists = true;
                break;
            }
        }
        if (!numberExists) {
            numbers.push(this.toAddNumber);
            numbers.customSort();
            this.selectedNumbers = numbers;
        }
    }

    $scope.removeNumber = function (obj) {
        var numbers = this.selectedNumbers;
        var targetValue = obj.number;
        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] == targetValue) {
                numbers.splice(i, 1);
                //break;
            }
        }
        numbers.customSort();
        this.selectedNumbers = numbers;
    }

    $scope.saveNumbers = function () {
        var numbers = this.selectedNumbers;
        $http({
                method: 'POST',
                url: '/api/numbers',
                data: numbers,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function successCallback(response) {
                if (response.data.success) {
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(response.data.data)
                        .position('top right')
                        .hideDelay(3000)
                    );
                }
            }, function errorCallback(response) {
                console.log('http error: ', response)
            });
    }

    $scope.getNumbers = function () {
        $http({
                method: 'GET',
                url: '/api/numbers',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(function successCallback(response) {
                if (response.data.success) {
                    $scope.historial = response.data.data.numbers;
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent(response.data.info)
                        .position('top right')
                        .hideDelay(3000)
                    );
                } else {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Datos cargados')
                        .textContent(response.data.info)
                        .ariaLabel(response.data.info)
                        .ok('Aceptar')
                    );
                }
            }, function errorCallback(response) {
                console.log(response)
            });
    }
});

Array.prototype.customSort = function () {
    this.sort(function (a, b) {
        return b - a;
    })
};