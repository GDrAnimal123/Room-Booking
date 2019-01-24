# import sys
# sys.path.append("..")


class Ticket():

    def __init__(self, id=0, userID="", room="", title="", description="", start="", end="", timestamp=0):
        self.id = id
        self.userID = userID
        self.room = room
        self.title = title
        self.description = description
        self.start = start
        self.end = end
        self.timestamp = timestamp

    def __repr__(self):
        return '(userID-{}, room-{}, title-{}, description-{}, start-{}, end-{}, timestamp-{})'.format(self.userID, self.room, self.title, self.description, self.start, self.end, self.timestamp)
