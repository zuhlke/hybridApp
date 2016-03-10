(function () {
    'use strict';

    angular.module('hybridApp', [
        'ngRoute',
        'ngResource'
    ]);
})();
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
(function () {
    'use strict';

    angular
        .module('hybridApp')
        .controller('FastBalanceController', FastBalanceController);

    FastBalanceController.$inject = ['balanceRepository'];
    function FastBalanceController(balanceRepository) {
        var fastBalanceViewModel = this;
        balanceRepository
            .getBalance()
            .then(function(balance){
                fastBalanceViewModel.currentBalance = balance.currentBalance;
            })
            .catch(function(error) {
                console.error(error);
            });
    }
})();
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
(function () {
    'use strict';

    angular
        .module('hybridApp')
        .controller('CurrencyConverterController', CurrencyConverterController);

    CurrencyConverterController.$inject = [];
    function CurrencyConverterController() {
        var currencyConverterViewModel = this;
        currencyConverterViewModel.result = 234;
    }
})();
(function () {
    'use strict';

    angular
        .module('hybridApp')
        .factory('Balance', Balance);

    Balance.$inject = ['$resource'];
    function Balance($resource) {
        return $resource('http://localhost:8888/balances/:id')
    }

})();
(function () {
    'use strict';

    angular
        .module('hybridApp')
        .factory('balanceRepository', balanceRepository);

    balanceRepository.$inject = ['$q', 'SecretGeneratorPlugin'];
    function balanceRepository($q, SecretGeneratorPlugin) {
        return {
            getBalance: getBalance
        };

        function getBalance() {
            return $q(function (resolve, reject) {
                SecretGeneratorPlugin.generateSecret(['World!'], function (result) {
                    resolve({currentBalance: result});
                }, reject);
            });
        }
    }

})();