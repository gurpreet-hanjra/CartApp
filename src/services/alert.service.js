// service to manage global alerts //
function AlertService() {
    var service = {
        add,
        closeAlert,
        closeAlertIdx,
        clear,
        clearAll,
        get
    },
    alerts = [];

    return service;

    // add message and its type (success/warning/danger) 
    function add(type, msg) {
        return alerts.push({
            type,
            msg,
            close: function() {
                return closeAlert(this);
            }
        });
    }

    // close single alert //
    function closeAlert(alert) {
        return closeAlertIdx(alerts.indexOf(alert));
    }

    function closeAlertIdx(index) {
        return alerts.splice(index, 1);
    }

    // clear the alerts //
    function clear(){
        alerts = [];
    }

    // get already created alerts //
    function get() {
        return alerts;
    }

    // clear all existing ones //
    function clearAll() {
    	alerts.splice(0,alerts.length);
    }
}

module.exports = AlertService;