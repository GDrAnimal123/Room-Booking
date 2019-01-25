(function() {
    'use strict';

    angular.module('app.calendar', ["app.calendarService", "app.switchService", "app.calendarDirective"])
        .controller('CalendarController', CalendarController)
        .constant('CALENDAR_COMPONENTS', {
            HOURS: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
            STEPPINGS: [0, 15, 30, 45]
        })

    CalendarController.$inject = ["$scope", "$rootScope", 
                                  "calendarService", "switchService"];

    function CalendarController($scope, $rootScope, 
                                calendarService, switchService) {
            // Utility
        this.next = function() {
            /**
             DOM event when click Next

             *** Update Current date and daysInWeek.
             */

            var date = calendarService.currentDate

            if (switchService.selectedVar == 'day') {
                date = date.addDate(1);
            } else {
                date = date.addDate(7);
            }

            this.changeCurrentDate(date)
        }

        this.previous = function() {
            /**
             DOM event when click Back

             *** Update Current date and daysInWeek.
             */

            var date = calendarService.currentDate

            if (switchService.selectedVar == 'day') {
                date = date.subtractDate(1);
            } else {
                date = date.subtractDate(7);
            }

            this.changeCurrentDate(date)
        }

        this.today = function() {
            /**
             DOM event when click Today

             *** Update Current date and daysInWeek.
             */

            calendarService.init()
            this.render()
        }

        this.changeCurrentDate = function(date) {

            calendarService.changeCurrentDate(date)
            this.render()
        }

        this.render = function() {
            /**
                - UPDATE calendar directives $scope 
                - REFRESH table
            */
            this.currentDate = new Date(calendarService.currentDate.valueOf())
            this.date_display = this.currentDate.printCurrentDate()

            this.isToday = calendarService.isToday()

            $scope.$emit("RefetchTableEvent");
        }

        this.render()
    }

})();