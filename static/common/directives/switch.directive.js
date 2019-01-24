(function() {
    'use strict';

    angular.module('app.switchDirective', [])
        .directive('switch', switchOptions);

    function switchOptions() {
        return {
            restrict: 'EA',
            templateUrl: 'core/switch/switchView.html',
            controller: 'SwitchController',
            controllerAs: 'switch_ctrl'
        }
    }

})();