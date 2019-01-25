(function() {
    angular.module('app.tableTrans', [])
        .factory("tableTrans", tableTrans);

    tableTrans.$inject = ["$http"];

    function tableTrans($http) {

        var tableTrans = {};

        tableTrans.getTickets = function(room, timestamps) {
            // Rootscope the ipaddress...
            return $http.get('/api/tickets', {
                    params: {
                        room: room,
                        listOfTimestamps: JSON.stringify(timestamps)
                    }
                })
                .then(function(response) {
                    return response.data.map(JSON.parse)
                })
                .catch(function(response) {
                    console.log(response)
                    alert("Direct to error page")
                });
        }

        tableTrans.saveTicket = function(ticket) {
            // Rootscope the ipaddress...

            console.log("Ticket to save: ", JSON.stringify(ticket))
            return $http.post('/api/tickets', JSON.stringify(ticket))

            .then(function(response) {
                    return "Successfully saved";
                })
                .catch(function(error) {
                    alert("Direct to error page");
                });
        }

        tableTrans.deleteTicket = function(ticket) {
            // Rootscope the ipaddress...
            // 'http://192.168.1.181:5000/template'
            return $http.put('/api/tickets', JSON.stringify(ticket))
                .then(function(response) {
                    return "Successfully deleted";
                })
                .catch(function(error) {
                    alert("$http update facing some error");
                    console.log(error);
                });
        }

        return tableTrans;
    }
})()