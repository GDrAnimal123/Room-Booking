(function() {
    'use strict';

    angular.module('app.roomDirective', ['app.roomService'])
        .directive('roomDropdown', roomDropdown)
        .directive('modalBoxes', modalBox);

    function roomDropdown() {

        return {
            restrict: 'EA',
            templateUrl: 'core/room/roomView.html',
            controller: "RoomController",
            controllerAs: "room_ctrl"
        }
    }

    modalBox.$inject = ["ROOM_COMPONENTS", "roomService"]
    function modalBox(ROOM_COMPONENTS, roomService) {

        return {
            restrict: 'EA',
            templateUrl: 'core/room/modal.html',
            controller: "RoomController",
            controllerAs: "room_ctrl",
            link: function(scope, element, attributes, parentCtrl) {

                // $("#myModal").on('hidden.bs.modal', function(){
                //     parentCtrl.init();
                // });

                var $start_input = $("#starttime")
                var $end_input = $("#endtime")
                var $modal = $("#myModal")

                $modal.on('show.bs.modal', function(){
                    /*
                        Calculate the endtime when modal is opening
                    */

                    parentCtrl.selectTicket()

                    var start_date = $start_input.timepicker('getTime', '');
                    // var end_date = new Date(start_date.valueOf());
                    // end_date.setMinutes(start_date.getMinutes() + 15);

                    var format = roomService.calculateEndtimeFormat(start_date);
                    $end_input.timepicker('remove').timepicker(copy(format));
                });

                $start_input.on('changeTime', function() {
                    /*
                        Recalculate the endtime when start time changed
                    */
                    var start_date = $start_input.timepicker('getTime', '');
                    // var end_date = new Date(start_date.valueOf());
                    // end_date.setMinutes(start_date.getMinutes() + 15);

                    var format = roomService.calculateEndtimeFormat(start_date);
                    $end_input.timepicker('remove').timepicker(copy(format));
                });
            }
        }
    }
})()
