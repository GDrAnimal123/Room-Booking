import json

from flask import request, jsonify, Blueprint


blueprint = Blueprint(
    'ticket', __name__
)

################
#### routes ####
################


@blueprint.route('/api/tickets')
def get_ticket():
    '''
    Get all tickets given:
        - room: name of the room
        - listOfTimestamps: a collection of timestamps

    Return collection of tickets in JSON format
    '''
    from database import TicketSQL
    from utils import object_decoder, ObjectEncoder

    # userID = request.args.get('userID')

    room = request.args.get('room')
    timestamps = json.loads(request.args.get('listOfTimestamps'))

    tickets = TicketSQL.selectByRoomAndTimestamps(room, timestamps)

    if len(tickets) == 0:
        print("Found nothing!!")
        return jsonify([])

    # build_json_from_ticket(x, timestamps), tickets)
    # json.dumps(x, cls=ObjectEncoder)
    json_tickets = list(map(lambda x: json.dumps(x, cls=ObjectEncoder), tickets))

    return jsonify(json_tickets)


@blueprint.route('/api/tickets', methods=["POST"])
def save_ticket():
    '''
    Post/Update accordingly a ticket given:
        - ticket

    Return sucessful message or error.
    '''
    from database import TicketSQL
    from utils import object_decoder, ObjectEncoder

    ticket = json.loads(request.data, object_hook=object_decoder)

    try:
        if TicketSQL.isExisted(ticket):
            print("Updating...")
            # Update ticket if it exists in Database
            TicketSQL.update(ticket)
        else:
            print("Inserting...")
            # Insert ticket if it not
            TicketSQL.insert(ticket)

        return "You have successfully saved..."

    except Exception as e:
        print("Posted error: ", e)
        return "Failed to book your room"


@blueprint.route('/api/tickets', methods=["PUT"])
def delete_ticket():
    '''
    Delete a ticket given:
        - ticket

    Return sucessful message or error.
    '''
    from database import TicketSQL
    from utils import object_decoder, ObjectEncoder

    ticket = json.loads(request.data, object_hook=object_decoder)

    try:
        TicketSQL.delete(ticket)
        return "You have successfully deleted..."
    except Exception as e:
        print("Delete error: ", e)
        return "Failed to delete your ticket"
