import json
from project.ticket.models import Ticket
from project.user.models import User


def object_decoder(obj):
    if '__type__' in obj:
        if obj['__type__'] == 'User':
            return User(obj['userID'], obj['password'], obj['admin'])
        elif obj['__type__'] == 'Ticket':
            return Ticket(obj['id'], obj['userID'], obj["room"], obj["title"],
                          obj["description"], obj["start"], obj["end"], obj["timestamp"])
    return obj


class ObjectEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, User):
            json = {
                "userID": obj.userID,
                "password": obj.password,
                "admin": obj.admin
            }
            return json
        elif isinstance(obj, Ticket):
            json = {
                "id": obj.id,
                "userID": obj.userID,
                "room": obj.room,
                "title": obj.title,
                "description": obj.description,
                "start": obj.start,
                "end": obj.end,
                "timestamp": obj.timestamp
            }
            return json
        return json.JSONEncoder.default(self, obj)
