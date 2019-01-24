var Ticket = function (id=0, userID="", room="", title="", description="", start="", end="", timestamp=0) {
    this.id = id;
    this.userID = userID;
    this.room = room;
    this.title = title;
    this.description = description;
    this.start = new Date(start);
    this.end = new Date(end);
    this.timestamp = timestamp;

    return {
        __type__: "Ticket",
        id: this.id,
        userID: this.userID,
        room: this.room,
        title: this.title,
        description: this.description,
        start: this.start,
        end: this.end,
        timestamp: this.timestamp
    }
}
