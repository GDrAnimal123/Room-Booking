(function() {
    'use strict';

    angular.module('app.switch', ['app.switchService', 'app.switchDirective'])
        .controller('SwitchController', SwitchController);

    SwitchController.$inject = ["$scope", "$rootScope", 
                                "switchService"];

    function SwitchController($scope, $rootScope, 
                              switchService) {
        var self = this;
        this.selectedVar = switchService.selectedVar

        this.render = function() {
            /**
             Refresh table.
             */
            switchService.selectedVar = this.selectedVar
            $scope.$emit("RefetchTableEvent");
        }
    }
})();