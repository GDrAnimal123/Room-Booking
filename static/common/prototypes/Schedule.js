var Schedule = function (timestamps) {
    this.timestamps = timestamps;
    this.schedule = [];

    this.update = function (tickets) {
        if (tickets.length > 0) {
            try {
                tickets.forEach(ticket => {

                    var start_date = ticket.start,
                        end_date = ticket.end
                        timestamp = ticket.timestamp        

                    var str_time_range_start = start_date.parseTimeRange()
                    var str_time_range_end = end_date.parseTimeRange()
                
                    var col_index = this.timestamps.indexOf(timestamp)

                    this.schedule[col_index].push([str_time_range_start, str_time_range_end])
                });
            } catch(err) {
                console.log(err)
            }
        }
    }

    this.init = function (tickets) {
        this.schedule = this._createBlank(this.timestamps.length)
        this.update(tickets)

        return this.schedule
    }

    this._createBlank = function (timestamps_length) {
        var schedule = new Array(timestamps_length);
        for (var r = 0; r < timestamps_length; r++) {
            schedule[r] = new Array();
        }
    
        return schedule
    }

}
