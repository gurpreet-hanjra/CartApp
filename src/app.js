require('angular');
var uib = require('angular-ui-bootstrap'),
    routes = require('angular-route');
    // import controllers //
var AlertsController = require('./alerts/alerts.controller'),
    HeaderController = require('./header/header.controller'),
    // import services //
    ProductService = require('./services/product.service'),
    AlertService = require('./services/alert.service'),
    // import constants //
    constants = require('./core/constants'),
    // import directives //
    ContentHolder = require('./components/content-holder.directive'),
    // import routes //
    Routes = require('./core/routes');

angular
    .module('cartApp', [uib, routes])
    // constants
    .constant('constants', constants)
    // controllers
    .controller('AlertsController', AlertsController)
    .controller('HeaderController',HeaderController)
    // directives
    .directive('contentHolder', ContentHolder)
    // factories
    .factory('ProductService', ProductService)
    .factory('AlertService', AlertService)
    // configs
    .config(Routes);
