(function() {
    'use strict';

    angular.module('app.login', ['AuthService'])
        .controller('LoginController', LoginController)
        .controller('LogoutController', LogoutController)

    LoginController.$inject = ["$location", "AuthService"];
    LogoutController.$inject = ["$location", "AuthService"];

    function LoginController($location, AuthService) {
        var self = this;

        this.login = function() {

            // inital values
            this.error = false;
            this.disabled = true;

            // call login from service
            AuthService.login(this.loginForm.userID, this.loginForm.password)
                .then(function() {
                    console.log("Proceed to main page")
                    $location.path('/');
                    self.disabled = false;
                    self.loginForm = {};
                })
                .catch(function() {
                    console.log("Catch error")
                    self.error = true;
                    self.errorMessage = "Invalid userID and/or password";
                    self.disabled = false;
                    self.loginForm = {};
                });
        };
    }

    function LogoutController($location, AuthService) {

        this.logout = function() {

            // call logout from service
            AuthService.logout()
                .then(function() {
                    $location.path('/login');
                });

        };

    }
})();
