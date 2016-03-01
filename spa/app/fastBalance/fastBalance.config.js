(function () {
    'use strict';

    angular
        .module('hybridApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/fastBalance', {
                templateUrl: 'app/fastBalance/fastBalance.template.html',
                controller: 'FastBalanceController',
                controllerAs: 'fastBalanceViewModel'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();