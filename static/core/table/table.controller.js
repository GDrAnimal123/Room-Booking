(function() {
    'use strict';

    angular.module('app.table', ['app.tableTrans', 'app.calendarService', 'app.roomService', 'app.switchService', "app.tableDirective"])
        .controller('TableController', TableController)
        .service("tableService", function () {
            this.disableTimes = [];
            this.selectedTicket = new Ticket();
        })

    TableController.$inject = ["$scope", "$rootScope", "$compile", "$interval", 
                               "CALENDAR_COMPONENTS", "ROOM_COMPONENTS", 
                               "tableService", "tableTrans", "calendarService", "switchService"]

    function TableController($scope, $rootScope, $compile, $interval, 
                             CALENDAR_COMPONENTS, ROOM_COMPONENTS, 
                             tableService, tableTrans, calendarService, switchService) {

        var self = this

        // NOT CHANGEABLE
        var STEPPINGS = 15
        var RATIO = 100 / 60 // 100 stands for 100% not pixel size
            // ALTER ACCORDING TO CSS.
        var BORDER_SIZE = 1
        var STEP_PIXELS = 30

        this.selectCell = function(row, col, step) {
            /*
                Select table cell (only Logic not DOM)

                @table: table
                @hour : row
                @day : column
            */

            if (typeof this.table != "undefined") {

                ROOM_COMPONENTS.default_time = {
                    hours: this.hours[row],
                    minutes: this.steppings[step]
                }

                tableService.disableTimes = this.schedule[col];

                tableService.selectedTicket = this.table[row][col][step];
                tableService.selectedTicket.timestamp = this.timestamps[col];

                $("#myModal").modal()
            }

        }

        this.showPresentTime = function() {
            /**
                Show the Present line (RED LINE)
            */

            var today = new Date()
            var timestamp = today.getTimestamp()
            var hour = today.getHours()
            var minute = today.getMinutes()

            var row = self.hours.indexOf(hour)
            var col = self.timestamps.indexOf(timestamp)
            var height = minute * RATIO

            if (col != -1) {
                if (row == -1) {
                    row = 0
                    col += 1
                    height = 0
                }

                var attributes = {
                    row: row,
                    col: col,
                    height: height
                }

                drawPresent(attributes)
            }
        }

        this.renderBookedTickets = function() {
            /**
                Render Overlays on DOM
            */

            // List of booked tickets
            if (typeof self.bookedTickets != "undefined") {
                self.bookedTickets.forEach(function(ticket) {
                    if (ticket.start != "" &&
                        ticket.end != "" &&
                        ticket.room == self.room &&
                        self.timestamps.includes(ticket.timestamp)) {
                        var attributes = calculateOverlayAttributes(ticket)
                        drawOverlay(attributes)
                    }
                })
            }
        }

        function drawPresent(attributes) {
            /**
                Draw booked present line on DOM.
            */

            // console.log("Draw present time");
            var className = "present"
            var $td = $('tbody tr').eq(attributes.row).find('td').eq(attributes.col)
            var html = "<div class='"+ className +"' style='top: " + attributes.height + "%;'></div>"

            removeElementsByClass(className)
            draw($td, html, className)

        }

        function drawOverlay(attributes) {
            /**
                Draw booked tickets on DOM.
            */

            var className = "overlay"
            var $td = $('tbody tr').eq(attributes.row).find('td').eq(attributes.col)
            var html = "<div class='"+className+"' style='top: " + attributes.top + "%; height: " + attributes.height + "px;' ng-click='table_ctrl.selectCell(" + attributes.row + ", " + attributes.col + ", " + attributes.step + ");'> \
                            <div class='text'>" + "<span style='font-weight:bold; font-size: 18px;'>" + attributes.ticket.title + "</span>" + "</div> \
                            <div class='text'>" + "<span style='font-size: 14px;'>" + attributes.ticket.userID + "</span>" + "</div> \
                         </div> \
                         <div style='top: " + attributes.top + "%; height: " + attributes.height + "px;' class='decorator'></div> \
                         "

            draw($td, html, className)

        }

        function draw($element, html, className) {
            angular.element($element).append($compile(html)($scope))
        }

        function calculateOverlayAttributes(ticket) {
            /**
                Calculate attributes to draw on DOM:
                    - row: the hour index
                    - col: the timestamp index
                    - step: the stepping index
                    - top: starting location of overlay
                    - height: length of the overlay.
                    - ticket: details of the ticket to show on overlay

            */

            var start_date = ticket.start,
                end_date = ticket.end,
                timestamp = ticket.timestamp,
                difference = start_date.diff(end_date);

            return {
                row: self.hours.indexOf(start_date.getHours()),
                col: self.timestamps.indexOf(timestamp),
                step: self.steppings.indexOf(start_date.getMinutes()),
                top: start_date.getMinutes() * RATIO,
                height: ((difference.hours * 60 + difference.minutes) / STEPPINGS) * STEP_PIXELS + BORDER_SIZE * difference.hours,
                ticket: ticket
            }

        }

        this.render = function() {
            /**
                render() will update all data to their latest state
            */

            // Initialize necessary informations but not $watch 
            this.room = ROOM_COMPONENTS.room
            this.hours = CALENDAR_COMPONENTS.HOURS;
            this.timestamps = calendarService.getTimestampsFromDate(calendarService.currentDate);
            this.steppings = CALENDAR_COMPONENTS.STEPPINGS;

            // Informations to be $watch 
            self.readableDates = calendarService.convertTimestampsToDates(this.timestamps)
            self.table = new Table(this.hours, this.timestamps, this.steppings).init(Array());
            self.schedule = new Schedule(this.timestamps).init(Array());

            tableTrans.getTickets(this.room, this.timestamps)
                .then(function(objects) {
                    self.bookedTickets = convertObjectsToTickets(objects);
                    self.table = new Table(self.hours, self.timestamps, self.steppings)
                        .init(self.bookedTickets);
                    self.schedule = new Schedule(self.timestamps).init(self.bookedTickets);
                })
                .catch(function(error) {
                    console.log("Error: ", error);
                });
        }

        // Refresh table and auto $apply
        $rootScope.$on("RefetchTableEvent", function(e) {
            self.render();
        })

        $interval(self.showPresentTime, 60000) //60000

        this.render()

    }

})();
