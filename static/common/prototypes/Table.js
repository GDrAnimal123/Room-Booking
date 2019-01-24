var Table = function (rows, columns, steppings) {
    this.rows = rows;
    this.columns = columns;
    this.steppings = steppings;
    this.table = [];

    this.update = function (tickets) {
        if (tickets.length != 0) {
            try {
                tickets.forEach(ticket => {

                    var start_date = ticket.start,
                        end_date = ticket.end
                        timestamp = ticket.timestamp

                    var start_mins = start_date.getMinutes() // starting mins
                    var start_hours = start_date.getHours()

                    var row_index = this.rows.indexOf(start_hours)
                    var col_index = this.columns.indexOf(timestamp)

                    var difference = start_date.diff(end_date)
                    var stepping_index = this.steppings.indexOf(start_mins)
                    var steps = (difference.hours * 60 + difference.minutes) / 15

                    for (var i = 0; i < steps; i++) {
                        if (stepping_index >= 4) {
                            stepping_index = 0;
                            row_index += 1;
                        }
                        this.table[row_index][col_index][stepping_index] = new Ticket(ticket.id, ticket.userID, ticket.room, ticket.title, ticket.description, ticket.start, ticket.end, ticket.timestamp);

                        stepping_index += 1;
                    }
                });
            } catch(err) {
                console.log(err)
            }
        }
    }

    this.init = function (objects) {
        this.table = this._createBlank(this.rows.length, this.columns.length, this.steppings.length)
        this.update(objects)

        return this.table
    }

    this._createBlank = function (rows_length, columns_length, steppings_length) {
        var table = new Array();
        for (var r = 0; r < rows_length; r++) {
            table[r] = new Array(columns_length);
            for (var c = 0; c < columns_length; c++) {
                table[r][c] = new Array(steppings_length).fill(Ticket());
            }
        }

        return table
    }

}
