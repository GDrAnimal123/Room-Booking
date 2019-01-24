Date.prototype.printCurrentDate = function() {
    const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = this.getDate();
    const month = this.getMonth()
    const year = this.getFullYear()
    return day + " " + MONTH_NAMES[month] + " " + year
}

// Date.prototype.formatDate = function() {
//     const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const day = this.getDate();
//     const month = this.getMonth()
//     return DAYS[this.getDay()] + " " + day 
// }

Date.prototype.getDayName = function() {
    // const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    // const day = this.getDate();
    // const month = this.getMonth()
    return DAYS[this.getDay()] 
}

Date.prototype.getTimestamp = function() {
    /**
     Return timestamp given date.

     @date : given date
     */

    // Set Date with only (year, month, date) and no time involved
    var tempDate = new Date(this.getFullYear(),
        this.getMonth(),
        this.getDate())

    return tempDate.getTime()
}

Date.prototype.addDate = function(by) {

    /**
     Return a add date given a date by specific amount

     @date : given date
     @by   : amount to shift
     */

    var diff = this.getDate() + by
    return new Date(this.setDate(diff));
}

Date.prototype.subtractDate = function(by) {

    /**
     Return a subtract date given a date by specific amount

     @date : given date
     @by   : amount to shift
     */

    var diff = this.getDate() - by

    return new Date(this.setDate(diff));
}

Date.prototype.getMonday = function() {
    /**
     Return a Monday's date of that week given specific date

     @date : given date
     */
    var day = this.getDay(),
        diff = this.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday

    return new Date(this.setDate(diff));
}

Date.prototype.diff = function(date) {
    var this_date_moment = moment(this)
    var param_date_moment = moment(date)

    var time = Math.abs(param_date_moment.diff(this_date_moment))

    var seconds = moment.duration(time).seconds();
    var minutes = moment.duration(time).minutes();
    var hours = moment.duration(time).hours();
    var days = moment.duration(time).days();

    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

Date.prototype.isValid = function() {
    // An invalid date object returns NaN for getTime() and NaN is the only
    // object not strictly equal to itself.
    return this.getTime() === this.getTime();
};

Date.prototype.toISOString = function() {
    return moment(this).format("YYYY-MM-DDTHH:mm:ss");
};

Date.prototype.parseTimeRange = function() {
    var hours = (this.getHours()).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
    var mins = (this.getMinutes()).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    return hours + ":" + mins
}

Date.prototype.isBeforeNow = function() {

    var selectedTime = this.getTime()
    var present = new Date().setSeconds(0)

    if (present > selectedTime) {
        return true
    } else {
        return false
    }
}