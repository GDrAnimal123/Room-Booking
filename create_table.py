import pymysql
pymysql.install_as_MySQLdb()

from models.Ticket import Ticket
from sql_extensions import TicketSQL

TicketSQL.create_table()

test_ticket1 = Ticket(1, "dpham756", "Breathe", "Meeting", 'Okay', "2019-01-02T06:30:00", "2019-01-02T07:30:00", 1544457600000)
test_ticket2 = Ticket(2, "a0201353", "Breathe", "Project", 'Okay123', "2019-01-02T14:30:00", "2019-01-02T20:45:00", 1546358400000)
test_ticket3 = Ticket(3, "dpham756", "Breathe", "Meeting123", 'Okay', "2019-01-02T11:30:00", "2019-01-02T13:15:00", 1546358400000)

TicketSQL.insert(test_ticket1)
TicketSQL.insert(test_ticket2)
TicketSQL.insert(test_ticket3)

TicketSQL.drop_table()
