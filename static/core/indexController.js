(function() {
    'use strict';

    var myApp = angular.module('app.index', ["ngRoute", "AuthService"])

    myApp.config(function($routeProvider) {
            // console.log("Route provider config")
            $routeProvider
                .when('/', {
                    templateUrl: 'core/home.html',
                    access: {
                        restricted: true
                    }
                })
                .when("/login", {
                    templateUrl: 'core/login/loginView.html',
                    controller: 'LoginController',
                    controllerAs: 'login_ctrl',
                    access: {
                        restricted: false
                    }
                })
                .when("/logout", {
                    templateUrl: 'core/login/loginView.html',
                    access: {
                        restricted: true
                    }
                })
                .otherwise({
                    redirectTo: "/"
                });
        })
        .controller("IndexController", IndexController)

    myApp.run(function($rootScope, $location, $route, AuthService) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            /*
                First go to index (restricted is set to True)
                --> if Auth cannot find any user -> direct to "/login"
            */

            AuthService.getUserStatus()
                .then(function() {
                    if (typeof next.access !== "undefined") {
                        if (next.access.restricted && !AuthService.isLoggedIn()) {
                            $location.path('/login');
                            $route.reload();
                        } else if (next.access.restricted && AuthService.isLoggedIn()) {
                            // call /profile
                            console.log("Getting profile")
                            AuthService.profile()
                                .then(function(user) {
                                    console.log("Response: ", user)
                                    $rootScope.user = user;

                                })
                        } else {
                            console.log("Do nothing");
                        }
                    }
                })
        });
    })

    IndexController.$inject = ['$rootScope', 'AuthService']

    function IndexController($rootScope, AuthService) {

    }

})();
