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