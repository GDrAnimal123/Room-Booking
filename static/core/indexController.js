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
                    },
                    resolve: {
                        auth: function($rootScope, AuthService) {
                            $rootScope.user = null;
                            AuthService.profile();
                        }
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

            // async function getProfile() {
            //     try {
            //         const user = await AuthService.profile();
            //         console.log("Await", user);
            //         $rootScope.user = await user;
            //         console.log("$rootScope.user 123", $rootScope.user);
            //     } catch (err) {
            //         console.log('fetch failed', err);
            //     }
            // }
            AuthService.getUserStatus()
                .then(function() {
                    if (typeof next.access !== "undefined") {
                        if (next.access.restricted && !AuthService.isLoggedIn()) {
                            $location.path('/login');
                            $route.reload();
                        }
                        else if (next.access.restricted && AuthService.isLoggedIn()) {
                            
                            // AuthService.profile()
                            //     .then(function() {
                            //         console.log("HELLOW: ", $rootScope.user);

                            //     })
                        }
                    }
                });
        });
    })

    IndexController.$inject = ['$rootScope', 'AuthService']

    function IndexController($rootScope, AuthService) {

    }

})();