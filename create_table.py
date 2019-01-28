from project.ticket.models import Ticket
from database import TicketSQL

TicketSQL.create_table()

test_ticket1 = Ticket(1, "admin", "Breathe", "Meeting", 'Okay', "2019-01-21T08:30:00", "2019-01-21T09:15:00", 1548086400000)
test_ticket2 = Ticket(2, "a0201353", "Breathe", "Project", 'Okay123', "2019-01-21T09:45:00", "2019-01-21T10:30:00", 1548086400000)
test_ticket3 = Ticket(3, "dpham756", "Breathe", "Meeting123", 'Okay', "2019-01-25T07:30:00", "2019-01-25T08:45:00", 1548259200000)

TicketSQL.insert(test_ticket1)
TicketSQL.insert(test_ticket2)
TicketSQL.insert(test_ticket3)

print("Ticket 1: ", test_ticket1)
print("Ticket 2: ", test_ticket2)
print("Ticket 3: ", test_ticket3)

# TicketSQL.drop_table()
