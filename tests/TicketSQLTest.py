import sys
sys.path.append("..")

import unittest

from project.ticket.models import Ticket
from database import TicketSQL


class TicketSQLTest(unittest.TestCase):

    def setUp(self):
        print("Setup...")
        TicketSQL.create_table()

        self.test_ticket1 = Ticket(1, "dpham756", "Breathe", "Meeting", 'Okay', "2019-01-02T06:30:00", "2019-01-02T07:30:00", 1544457600000)
        self.test_ticket2 = Ticket(2, "a0201353", "Breathe", "Project", 'Okay123', "2019-01-02T14:30:00", "2019-01-02T20:45:00", 1547136000000)
        self.test_ticket3 = Ticket(3, "dpham756", "Breathe", "Meeting123", 'Okay', "2019-01-02T11:30:00", "2019-01-02T13:15:00", 1547136000000)

        # print(self.test_ticket1)
        TicketSQL.insert(self.test_ticket1)
        TicketSQL.insert(self.test_ticket2)
        TicketSQL.insert(self.test_ticket3)

    def tearDown(self):
        pass
        # print("Tear down...")
        # TicketSQL.drop_table()

    def test_select_all(self):
        print("Testing select_all...")
        tickets = TicketSQL.selectAll()
        self.assertEqual(len(tickets), 3)

    def test_select_by_room_and_timestamp(self):
        print("Testing select_by_room_and_timestamp...")
        room = "Breathe"
        timestamps = [1546790400000, 1546876800000, 1546963200000, 1547049600000, 1547136000000, 1547222400000, 1547308800000]
        tickets = TicketSQL.selectByRoomAndTimestamps(room, timestamps)
        self.assertEqual(len(tickets), 2)

    def test_insert(self):
        print("Testing insert...")
        test_ticket = Ticket(4, "third", "Heartbeat", "third", 'third', "2019-01-02T06:30:00", "2019-01-02T07:30:00", 1544457600000)

        TicketSQL.insert(test_ticket)
        tickets = TicketSQL.selectAll()

        self.assertEqual(len(tickets), 4)

    def test_update(self):
        print("Testing update...")
        test_ticket = self.test_ticket1
        test_ticket.title = "updated"
        test_ticket.description = "updated"
        test_ticket.start = "2019-01-02T07:00:00"
        test_ticket.end = "2019-01-02T08:30:00"

        TicketSQL.update(test_ticket)
        tickets = TicketSQL.selectAll()

        self.assertEqual(len(tickets), 3)
        self.assertEqual(tickets[0].title, test_ticket.title)
        self.assertEqual(tickets[0].description, test_ticket.description)
        self.assertEqual(tickets[0].start, test_ticket.start)
        self.assertEqual(tickets[0].end, test_ticket.end)

    def test_isExisted(self):
        print("Testing isExisted ...")

        status = TicketSQL.isExisted(self.test_ticket1)
        self.assertEqual(status, True)

    def test_delete(self):
        print("Testing delete...")
        test_ticket = self.test_ticket1
        test_ticket.title = ""
        test_ticket.description = ""

        TicketSQL.delete(test_ticket)
        tickets = TicketSQL.selectAll()

        self.assertEqual(len(tickets), 2)


if __name__ == '__main__':
    unittest.main()
