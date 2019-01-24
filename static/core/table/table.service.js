(function() {
    angular.module('app.tableService', ['app.calendarService'])
        .service("tableService", tableService);

        tableService.$inject = ['$rootScope', '$http', 'calendarService'];

        function tableService($rootScope, $http, calendarService){
            
            var address = "127.0.0.1"
            var port = "50"
            var ipaddress = "http://" + address + ":" + port

            this.disableTimes = [];
            this.selectedTicket = new Ticket();

            this.getTickets = function(room, timestamps) {
                // Rootscope the ipaddress...
                return $http.get(ipaddress + '/api/tickets', {
                        params: {
                            room: room,
                            listOfTimestamps: JSON.stringify(timestamps)
                        }
                    })
                    .then(function(response) {
                        if (response.data.length == 0) {
                            return Array()
                        }
                        return response.data.map(JSON.parse)
                    })
                    .catch(function(error) {
                        alert("$http facing some error")
                        console.log(error)
                    })
            }

            this.saveTicket = function(ticket) {
                // Rootscope the ipaddress...

                console.log("Ticket to save: ", JSON.stringify(ticket))
                return $http.post(ipaddress + '/api/tickets', JSON.stringify(ticket))

                .then(function(response) {
                        return "Successfully saved"
                    })
                    .catch(function(error) {
                        alert("$http facing some error")
                        return error
                    })
            }

            this.deleteTicket = function(ticket) {
                // Rootscope the ipaddress...
                // 'http://192.168.1.181:5000/template'
                return $http.put(ipaddress + '/api/tickets', JSON.stringify(ticket))
                    .then(function(response) {
                        return "Successfully deleted"
                    })
                    .catch(function(error) {
                        alert("$http update facing some error")
                        console.log(error)
                    })
            }
        }
})()
