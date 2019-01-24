(function() {
    'use strict';

    angular.module('app.room', ['app.roomService', 'app.tableService', 'app.roomDirective'])
        .constant('ROOM_COMPONENTS', {
            ROOMS: ["Breathe", "Aspire", "Moments", "Connect", "Strategy", "Tactics", "Talents", "Tribute"].sort(),
            TIMEPICKER_OPTIONS: {
                'timeFormat': 'H:i',
                'step': 15,
                // 'forceRoundTime': true,
                'minTime': '06:00',
                'maxTime': '21:00'
            }
        })
        .controller('RoomController', RoomController);

    RoomController.$inject = ["$scope", "$rootScope", "ROOM_COMPONENTS", "roomService", "tableService"]

    function RoomController($scope, $rootScope, ROOM_COMPONENTS, roomService, tableService) {

        var self = this
        this.ROOMS = ROOM_COMPONENTS.ROOMS
        this.room = roomService.room

        this.selectTicket = function() {

            roomService.renderTimePicker()

            this.selectedTicket = copy(tableService.selectedTicket)
            // console.log("tableService.selectedTicket: ", tableService.selectedTicket)
            this.readableDate = new Date(this.selectedTicket.timestamp).printCurrentDate()
            this.readOnly = roomService.isReadonly(this.selectedTicket.userID)
            this.isNewRequest = roomService.isNewRequest(this.selectedTicket.title)

        }

        /*
            HTTP calls
        */
        this.saveTicket = function() {
            /**
             Save handles calls POST method which handles:

                INSERT: for non-existing object
                UPDATE: for exisiting object in Database

             ***
             */

            // ** Jquery objects so we mannually update instead!!
            this.selectedTicket.start = $('#starttime').timepicker('getTime', "")
            this.selectedTicket.end = $('#endtime').timepicker('getTime', "")

            tableService.saveTicket(this.selectedTicket)
                .then(function(message) {
                    self.render();
                });
        }


        this.deleteTicket = function() {
            tableService.deleteTicket(this.selectedTicket)
                .then(function(message) {
                    self.render();
                });
        }

        this.render = function() {
            roomService.room = this.room

            this.init();
            $scope.$emit("RefetchTableEvent");
        }

        this.init = function() {
            // console.log("Re init... in room")
            self.selectedTicket = tableService.selectedTicket

            self.selectedTicket.userID = $rootScope.user.userID;
            self.selectedTicket.room = roomService.room;
            self.selectedTicket.title = ""
            self.selectedTicket.description = ""
            self.selectedTicket.start = ""
            self.selectedTicket.end = ""
        }

        $rootScope.$on("InitializeTicket", function(e) {
            // console.log("InitializeTicket 1231231");
            self.init();
        })

        this.init();
    }

})();
