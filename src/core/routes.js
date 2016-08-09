// various routes used in app //
Routes.$inject = ['$routeProvider'];

function Routes($routeProvider) {
  $routeProvider.
    // default route in case invalid route
    otherwise({
      redirectTo: '/landing'
    });
}

module.exports = Routes;