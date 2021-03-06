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