HeaderController.$inject = ['AlertService', 'constants', 'ProductService'];

function HeaderController(AlertService, constants, ProductService) {
    var vm = this; // view model
    vm.products = []; // products array
    vm.imgPath = constants.IMG_SRC; // image path constant

    // get products from data api //
    const getProducts = () => {
        ProductService
            .getProducts()
            .then((response) => {
                console.log(response);
                vm.products = response.data;
            }, (error) => {
                console.log(error);
            });
    };

    // validate input on change event
    vm.change = (item) => {
        if (item.count < 0 || !item.count) {
            item.count = 1;
        }
    };

    // return total price of product with quantity
    vm.getTotal = (price, count) => {
        return (price * count);
    };

    // return quantity of product
    vm.grandCount = () => {
        let sum = 0;
        vm.products.forEach((val) => {
            sum += val.count;
        });

        return sum;
    };

    // return grand total
    vm.grandTotal = () => {
        let sum = 0;
        vm.products.forEach((val) => {
            sum += (val.price * val.count);
        });

        return sum;
    };

    // remove selected item
    vm.remove = ($event, id) => {
        vm.products.splice(id, 1);
    };

    // get products
    getProducts();
}

module.exports = HeaderController;
