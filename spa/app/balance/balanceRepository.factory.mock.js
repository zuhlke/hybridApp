(function () {
    'use strict';

    angular
        .module('hybridApp')
        .factory('balanceRepository', balanceRepository);

    balanceRepository.$inject = ['Balance'];
    function balanceRepository(Balance) {
        return {
            getBalance: getBalance
        };

        function getBalance() {
            return Balance
                .get({id: 1})
                .$promise;
        }
    }

})();