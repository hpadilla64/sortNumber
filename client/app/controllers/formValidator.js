app.controller('FormValidator', function ($window, $scope, $mdToast, $http, $mdDialog) {
    $scope.nameValidator = '';
    $scope.nameIsCorrect = '';
    $scope.nameIcon = false;


    $scope.checkName = function () {
        if (/\S/.test(this.nameValidator)) {
            var numbers = this.nameValidator.match(/\d+/g);
            if (numbers != null) {
                $scope.nameIsCorrect = 'error';
            } else {
                $scope.nameIsCorrect = 'check';
            }
        } else {
            $scope.nameIsCorrect = '';
        }
    }

    $scope.restrictName = function () {
        var lastChar = this.nameValidator.substr(this.nameValidator.length - 1);
        if (!isNaN(parseInt(lastChar + 1))) {
            this.nameValidator = this.nameValidator.slice(0, -1);
        }
    }
})

app.directive('customEmail', function () {
    var mailRegexp = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@midominio\.com$/i;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            if (ctrl && ctrl.$validators.email) {
                ctrl.$validators.email = function (modelValue) {
                    return ctrl.$isEmpty(modelValue) || mailRegexp.test(modelValue);
                };
            }
        }
    };
})

app.directive('rfc', function () {
    var rfcRegexp = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.rfc = function (modelValue) {
                var toUpper = '';
                if (modelValue) {
                    toUpper = modelValue.toUpperCase()
                }
                console.log(ctrl.$isEmpty(toUpper), rfcRegexp.test(toUpper), toUpper)
                return ctrl.$isEmpty(toUpper) || rfcRegexp.test(toUpper);
            }
        }
    }
})