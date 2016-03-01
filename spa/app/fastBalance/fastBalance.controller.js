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