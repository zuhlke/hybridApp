(function () {
    'use strict';

    angular
        .module('hybridApp')
        .controller('BalanceController', BalanceController);

    BalanceController.$inject = [];
    function BalanceController() {
        var balanceViewModel = this;
        balanceViewModel.currentBalance = 1000;
    }
})();