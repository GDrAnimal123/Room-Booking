(function() {
    angular.module('app.roomService', [])
        .service("roomService", roomService)

    roomService.$inject = ["$rootScope", 
                           "ROOM_COMPONENTS", 
                           "tableService"]

    function roomService($rootScope, 
                         ROOM_COMPONENTS, 
                         tableService) {
        // Retrieve from database
        var self = this

        this.timeCircle = {
            /**
             Calculate time START and END for Timepicker's FORMAT
             */

            timeCircle: null,
            getSelectedTimeLoop: function() {
                var hours = ROOM_COMPONENTS.default_time.hours;
                var minutes = ROOM_COMPONENTS.default_time.minutes;

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
                return this.timeCircle;
            },
            init: function() {
                this.defaultTimeCircle();
            },
        }

        this.format = {
            /**
             Calculate FORMAT for timepicker jquery.
             All the smart time-handling logic are here
             */
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
                this.spliceTimeRangesIfExist(timeCircle, disableTimes);
                this.format["disableTimeRanges"] = disableTimes.slice(0);
            },
            get: function() {
                // console.log("Get is called: ", this.format)
                return this.format;
            },
            init: function(timeCircle) {
                // Init the displayed format...
                this.calculateFormat(timeCircle);
            },
        };


        this.isNewRequest = function(title) {
            /**
             Decide if DELETE button is clickable.
             */

            if (title == "") {
                return true
            }
            return false
        }

        this.isReadonly = function(userID) {
            /**
             Decide if $scope fields are readonly by 2 ways:
                - By User profile
                - By Time (If before NOW, return readonly == true)
             */

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

        this.renderTimePicker = function() {
            /**
             Overwrite Timepicker with corresponding format.
             */

            this.timeCircle.init();
            var timeCircle = this.timeCircle.get();

            this.format.init(timeCircle);
            var format = this.format.get();

            this.drawTimePicker($('#starttime'), timeCircle.start, format);
            this.drawTimePicker($('#endtime'), timeCircle.end, format);

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
        }
    }
})()