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