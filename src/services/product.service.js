// fetch the products //
ProductService.$inject = ['$http', 'constants', '$rootScope', '$interval'];

function ProductService($http, constants, $rootScope, $interval) {
	var dataFactory = {},
 		urlBase = constants.HOST,
 		interval,
 		remappingStatus;

	// request to get products  //
	dataFactory.getProducts = function (uri) {
		return $http.get('data/dataModel.json');
    };

    return dataFactory;
}

module.exports = ProductService;
