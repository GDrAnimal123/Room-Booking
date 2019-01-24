// function covertTimeToInteger(time) {
//     // convert this "14:30" --> 1430
//     return parseInt(time.split(":").join(""))
// }

function convertObjectsToTickets(objects) {
    var tickets = Array()
    objects.forEach(o => {
        var ticket = new Ticket(o.id, o.userID, o.room, o.title, o.description, o.start, o.end, o.timestamp)
        tickets.push(ticket)
    })

    return tickets
}

function removeElementsByClass(className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function flatten(twoDimsArray) {
    return [].concat.apply([], twoDimsArray);
}

function findEndtime(start_time, timeList) {
    for (var i = 0; i <= timeList.length; i++) {
        var end_time = timeList[i]
        if (start_time < end_time) {
            return end_time
        }
    }
}

function integerToTimeString(integer) {
    if (integer < 100) {
        console.log("Wrong Integer timerange man")
        return
    }

    var hours = (Math.floor(integer / 100)).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })
    var mins = (integer % 100).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    return hours + ":" + mins
}

function timeStringToInteger(timeString) {
    return parseInt(timeString.split(":").join(""))
}

function copy(object) {
    return JSON.parse(JSON.stringify(object));
}