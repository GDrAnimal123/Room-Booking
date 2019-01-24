(function() {
    angular.module('app.roomService', ['app.tableService'])
        .service("roomService", roomService)

    roomService.$inject = ["$rootScope", "ROOM_COMPONENTS", "tableService"]

    function roomService($rootScope, ROOM_COMPONENTS, tableService) {
        // Retrieve from database
        var self = this

        this.room = "Breathe";

        this.default_time = {
            hours: 0,
            minutes: 0,
        }

        this.isNewRequest = function(title) {
            if (title == "") {
                return true
            }
            return false
        }

        this.isReadonly = function(userID) {
            var timecircle = this.timeCircle.get();
            var selectedDate = new Date(tableService.selectedTicket.timestamp);
            selectedDate.setHours(timecircle.start.getHours(), timecircle.start.getMinutes());

            if ($rootScope.user.admin == true) {
                // If user is admin...
                return false
            } else if (!selectedDate.isBeforeNow() && userID == $rootScope.user.userID) {
                // If userID is correct...
                return false
            }
            return true
        }

        this.timeCircle = {
            timeCircle: null,
            getSelectedTimeLoop: function() {
                var hours = self.default_time.hours;
                var minutes = self.default_time.minutes;

                var start = new Date()
                start.setHours(hours, minutes, 0);

                var end = new Date();
                end.setHours(hours, minutes + 15, 0);

                return {
                    start: start,
                    end: end
                }
            },
            defaultTimeCircle: function() {
                if (tableService.selectedTicket.start != "" && tableService.selectedTicket.start.isValid() ||
                    tableService.selectedTicket.end != "" && tableService.selectedTicket.end.isValid()) {
                    // If valid then set start and end for timepicker
                    this.timeCircle = {
                        start: tableService.selectedTicket.start,
                        end: tableService.selectedTicket.end
                    }
                } else {
                    this.timeCircle = this.getSelectedTimeLoop();
                    $rootScope.$emit("InitializeTicket");
                }
            },
            get: function() {
                // console.log("This timecircle: ", this.timeCircle)
                return this.timeCircle;
            },
            init: function() {
                // console.log("Initialize circle()")
                this.defaultTimeCircle();
            },
        }

        this.format = {
            format: null,
            spliceTimeRangesIfExist: function(timeCircle, disableTimes) {
                /*
                    Splice/Remove disable start:end from disableTimeRange for timePicker
                 */

                var str_start = timeCircle.start.parseTimeRange();
                var str_end = timeCircle.end.parseTimeRange();

                for (var i = 0; i < disableTimes.length; i++) {
                    if (disableTimes[i][0] == str_start && disableTimes[i][1] == str_end) {
                        disableTimes.splice(i, 1);
                    }
                }
            },
            calculateFormat: function(timeCircle) {
                var disableTimes = copy(tableService.disableTimes);

                // // Process to change the format
                this.format = copy(ROOM_COMPONENTS.TIMEPICKER_OPTIONS);
                // console.log("Bfore in calculateFormat: ", disableTimes)

                this.spliceTimeRangesIfExist(timeCircle, disableTimes);
                // console.log("AFter in splice: ", disableTimes)
                this.format["disableTimeRanges"] = disableTimes.slice(0);
            },
            get: function() {
                // console.log("Get is called: ", this.format)
                return this.format;
            },
            init: function(timeCircle) {
                // Init the displayed format...
                // console.log("Initialize format()")
                this.calculateFormat(timeCircle);
            },
        };

        this.renderTimePicker = function() {
            // Refresh Format everytime new ticket selected

            this.timeCircle.init();
            var timeCircle = this.timeCircle.get();

            this.format.init(timeCircle);
            var format = this.format.get();

            var $start = $('#starttime');
            var $end = $('#endtime');

            // console.log("WTF: ", format)

            this.drawTimePicker($start, timeCircle.start, format);
            this.drawTimePicker($end, timeCircle.end, format);

            var datepair = new Datepair(document.getElementById('timePair'));
        }

        this.calculateEndtimeFormat = function(start_date) {
            // If selected start and format are not null
            var DEFAULT_START = 600;
            var DEFAULT_END = 2100;

            var start_time = timeStringToInteger(start_date.parseTimeRange());

            var format = copy(self.format.get());

            var selected_time_list = flatten(format["disableTimeRanges"]);
            selected_time_list = selected_time_list.map(x => timeStringToInteger(x));
            selected_time_list.unshift(DEFAULT_START);
            selected_time_list.push(DEFAULT_END);       

            var end_time = findEndtime(start_time, selected_time_list);
            // console.log("End time man: ", end_time)

            format["disableTimeRanges"] = [];
            format["minTime"] = integerToTimeString(start_time);
            format["maxTime"] = integerToTimeString(end_time);

            return format
        }

        this.drawTimePicker = function($timepicker, date, format) {
            /*
                Reinitialize timepicker given:
                    - $timepicker: jquery of timepicker
                    - time: updated time
                    - format: updated format for timepicker
             */

            $timepicker.timepicker('remove').timepicker(copy(format)).timepicker('setTime', date);
            // $end.timepicker('remove').timepicker(format).timepicker('setTime', timeCircle.end);
        }
    }
})()



            // var default_start = integerToTimeString(DEFAULT_START)
            // var cal_start = integerToTimeString(start_time)
            // var cal_end = integerToTimeString(end_time)
            // var default_end = integerToTimeString(DEFAULT_END)
            
            // var endtime_format = copy(format)
            // endtime_format["disableTimeRanges"] = [[integerToTimeString(end_time), 
            //                                         integerToTimeString(DEFAULT_END)]];

            // var end_date = new Date(start_date.valueOf())
            // end_date.setMinutes(end_date.getMinutes() + 15)
            // $('#endtime').timepicker('remove').timepicker(endtime_format).timepicker('setTime', end_date);