(function() {

    angular.module('app.calendarDirective', [])
        .directive('calendarBar', calendarBar);

    function calendarBar() {
        return {
            restrict: 'EA',
            templateUrl: 'core/calendar/calendarView.html',
            controller: "CalendarController",
            controllerAs: "calendar_ctrl",
            link: function(scope, element, attributes, parentCtrl) {

                var $datepicker = $('#datepicker')
                $datepicker.datepicker({
                    autoclose: true,
                })
                .on("show", function(e) {
                    $datepicker.datepicker('update', parentCtrl.currentDate);
                })
                .on("changeDate", function(e) {
                    var selectedDate = $datepicker.datepicker('getDate', '');
                    parentCtrl.changeCurrentDate(selectedDate);
                    scope.$digest();
                });
            }
        }
    }
})()