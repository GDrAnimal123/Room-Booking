(function() {
    'use strict';

    angular.module('AuthService', [])
        .factory('AuthService', AuthService);

    AuthService.$inject = ["$q", "$http", "$timeout", "$rootScope"];

    function AuthService($q, $http, $timeout, $rootScope) {

        /*
			Logic related to authentication and authorization (access control)
    	*/
        var authService = {};
        var user = null;

        authService.isLoggedIn = function() {
            if (user) {
                return true;
            } else {
                return false;
            }
        };

        authService.login = function(userID, password) {
            /*
                Compare given credentials with Database
                then push user into Session stack.
            */

            // create a new instance of deferred
            var deferred = $q.defer();

            // send a post request to the server
            $http.post('/api/login', {
                    userID: userID,
                    password: password
                })
                .then(
                    // Handle success
                    function(data) {
                        var status = data.status
                        var response = data.data

                        if (status === 200 && response.result) {
                            user = true;
                            deferred.resolve();
                        } else {
                            user = false;
                            deferred.reject()
                        }
                    },
                    // Handle error
                    function(data) {
                        user = false;
                        deferred.reject();
                    }
                );

            // return promise object
            return deferred.promise;
        }

        authService.logout = function(userID, password) {
            /*
                Remove user from Session stack.
            */
            var deferred = $q.defer();

            // send a post request to the server
            $http.get('/api/logout')
                .then(
                    function(data) {
                        user = false;
                        deferred.resolve();
                    },
                    function(data) {
                        user = false;
                        deferred.reject();
                    }
                );

            // return promise object
            return deferred.promise;
        }

        authService.getUserStatus = function() {
            /*
                GET if any user has logged in (Remains in Session).
            */
            return $http.get('/api/status')
                .then(
                    function(data) {
                        var response = data.data
                        if (response.status) {
                            user = true;
                        } else {
                            user = false;
                        }
                    },
                    function(data) {
                        console.log("user is false: -- ", user)
                    }
                );
        };

        authService.profile = function() {
            /*
                GET user profile (userID, password, admin) by SESSION ID
            */
            $http.get('/api/profile')
                .then(
                    function(data) {
                        // console.log("Retrieve")
                        var response = data.data;
                        $rootScope.user = JSON.parse(response["user"]);
                    },
                    function(data) {
                        $rootScope.user = null
                        console.log("Failed...", data)
                    }
                );
        };

        return authService
    }
})();