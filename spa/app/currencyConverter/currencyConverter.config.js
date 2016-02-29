(function () {
    'use strict';

    angular
        .module('hybridApp')
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider) {
        $routeProvider
            .when('/currencyConverter', {
                templateUrl: 'app/currencyConverter/currencyConverter.template.html',
                controller: 'CurrencyConverterController',
                controllerAs: 'currencyConverterViewModel'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
})();