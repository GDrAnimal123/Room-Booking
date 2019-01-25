(function() {
    angular.module('app.calendarService', ["app.switchService"])
        .service("calendarService", calendarService)

    calendarService.$inject = ['switchService'];

    function calendarService(switchService) {

        var self = this

        this.calculateDatesInWeek = function(date) {
            /**
             Return a Array of dates in weeks of given date.

             @date : given date
             */

            var datesInWeek = Array(7)
            for (i = 0; i < 7; i++) {
                var mondayDate = date.getMonday();
                datesInWeek[i] = mondayDate.addDate(i)
            }

            return datesInWeek
        }

        this.convertTimestampToDate = function(timestamp) {
            /**
             Return date given timestamp.

             @date : given timestamp
             */

            return new Date(timestamp)
        }

        this.convertTimestampsToDates = function(timestamps) {
            /**
             Return multiple timestamps given multiple dates.

             @dates : given multiple dates
             */

            var dates = Array()
            timestamps.forEach(function(t) {
                dates.push(self.convertTimestampToDate(t))
            });

            return dates
        }

        this.convertDatesToTimestamps = function(dates) {
            /**
             Return multiple dates given multiple timestamps.

             @dates : given multiple dates
             */
            var timestamps = Array()
            dates.forEach(function(d) {
                timestamps.push(d.getTimestamp())
            });

            return timestamps
        }

        this.getTimestampsFromDate = function(date) {

            /**
                Return Array of timestamps by DAY/WEEK

                @date : given date
                @type : give type (DAY or WEEK)
            */
            var type = switchService.selectedVar
                // Avoid object reference which makes weird change in currentDate
            var copyOfCurrentDate = new Date(date.valueOf())

            if (type == "day") {
                return this.convertDatesToTimestamps(Array(copyOfCurrentDate))
            } else if (type == "week") {
                var datesInWeek = this.calculateDatesInWeek(copyOfCurrentDate)
                return this.convertDatesToTimestamps(datesInWeek)
            }
        }

        this.changeCurrentDate = function(date) {
            /**
                Update current date and ignore time

                @date : given date
            */

            var copyOfCurrentDate = new Date(date.valueOf())

            this.currentDate = new Date(copyOfCurrentDate.getFullYear(),
                copyOfCurrentDate.getMonth(),
                copyOfCurrentDate.getDate())
        }

        this.isToday = function() {
            
            var date = new Date().getDate(),
                month = new Date().getMonth(),
                year = new Date().getFullYear();

            var today = new Date(year, month, date);

            if (today.getTime() != this.currentDate.getTime()) {
                return false
            }
            return true
        }

        this.init = function() {
            /**
             Initialize current date and current timestamps of today date
             */
            var year = new Date().getFullYear(),
                month = new Date().getMonth(),
                date = new Date().getDate()

            var today = new Date(year, month, date)

            this.currentDate = new Date(year, month, date)
            this.currentTimestamps = this.getTimestampsFromDate(new Date(year, month, date))
        }

        this.init();
    }
})()