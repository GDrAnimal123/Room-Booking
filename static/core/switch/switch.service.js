(function() {
    'use strict';

    angular.module('app.switchService', [])
        .service('switchService', switchService);

    switchService.$inject = [];

    function switchService() {
        this.selectedVar = 'week';
    }
})();