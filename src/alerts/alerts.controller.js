// controller to manage global alerts //
AlertsController.$inject = ['AlertService'];

function AlertsController(AlertService) {
    
	var vm = this;	
    vm.alerts = AlertService.get();
}

module.exports = AlertsController;

