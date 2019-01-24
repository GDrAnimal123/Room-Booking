(function() {

    angular.module('app.tableDirective', [])
        .directive('schedule', scheduleView);

    function scheduleView($timeout, $animate, $compile) {
        return {
            restrict: 'EA',
            templateUrl: 'core/table/tableView.html',
            controller: "TableController",
            controllerAs: "table_ctrl",
            link: function(scope, element, attributes, parentCtrl) {
            }
        }
    }
})()


//          var animate = function() {
//              console.log("Animate me...")
// //               $animate.addClass(element, 'fadeInLeft').then(function() {
// //                   console.log(element)
// //   element.removeClass('fadeInLeft');
// // });
// $animate.on('enter', element,
//    function callback(element, phase) {
//          console.log("Enter...")
//      console.log(element)
//    }
// );
// $animate.on('move', element,
//    function callback(element, phase) {
//          console.log("Move...")
//      console.log(element)
//    }
// );
// $animate.on('leave', element,
//    function callback(element, phase) {
//          console.log("Leave...")
//      console.log(element)
//    }
// );
//          }

//            scope.$watch('table_ctrl.table', function(newValue, oldValue) {
//              console.log("$watch table is called")
//              if (newValue === oldValue) return;
//              animate();
//            });

//            $timeout(animate, 600)