describe('HeaderController', function() {
  beforeEach(module('cartApp'));

  var $controller, // controller
      vm, // viewModel
      scope; // scope

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    
    vm = $controller('HeaderController', { $scope: scope });

    // mock the data, also can be done by mocking service using $httpBackend
    vm.products = mock_data;

  }));

  describe('total items in cart', function() {
    it('should return the correct total items in cart', function() {

      // generates random value of count
      // calculates the total items in cart
      var localCount = 0;
      vm.products.forEach(function (item) {
        item.count = Math.floor(Math.random() * 6);
        localCount += item.count;
      });
      
      expect(localCount).toEqual(vm.grandCount());
    });
  });

  describe('total price for count of an item', function() {
    it('should return the correct total price of an item in cart', function() {

      // generates random value of count
      // calculates the total items in cart
      var localCount = 0;
      vm.products.forEach(function (item) {
        item.count = Math.ceil(Math.random() * 6);
        localCount += item.count;
      });

      var randomProduct = Math.ceil(Math.random() * vm.products.length-1);
      
      // price * quantity for test
      var localTotal = vm.products[randomProduct].price * vm.products[randomProduct].count;
      
      // price * quantity from controller
      var total = vm.getTotal(vm.products[randomProduct].price, vm.products[randomProduct].count);

      expect(localTotal).toEqual(total);
    });
  });

  describe('calculate grand total', function() {
    it('should return the correct grand total of all items in cart', function() {

      // generates random value of count
      // calculates the total items in cart
      var localCount = 0,
          localGrandTotal = 0,
          localTotalPriceOfItem = 0;

      vm.products.forEach(function (item) {
        item.count = Math.floor(Math.random() * 6);
        localGrandTotal+= item.count*item.price;
      });

      expect(localGrandTotal).toEqual(vm.grandTotal());
    });
  });

  describe('remove product', function() {
    it('should return the reduced count of total items in cart when removed', function() {

      // generates random value of count
      // calculates the total items in cart
      var localCount = 0,
          localGrandTotal = 0,
          indexOfItem = Math.floor(Math.random() * vm.products.length-1); 

      // call controller method to remove the element by id //
      vm.remove(undefined ,indexOfItem);

      // calculate grand total
      vm.products.forEach(function (item) {
        item.count = Math.floor(Math.random() * 6);
        localGrandTotal+= item.count*item.price;
      });

      // expect grand total be equal to grand total after removal of product
      expect(localGrandTotal).toEqual(vm.grandTotal());
    });
  });


});