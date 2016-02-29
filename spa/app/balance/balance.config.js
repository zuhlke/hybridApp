(function () {
    'use strict';

    angular
        .module('hybridApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/balance', {
                templateUrl: 'app/balance/balance.template.html',
                controller: 'BalanceController',
                controllerAs: 'balanceViewModel'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();