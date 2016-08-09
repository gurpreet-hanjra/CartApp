// directive to set height of table container as per user's screen height //
ContentHolder.$inject = ['$window'];

function ContentHolder($window) {
	return function (scope, element, attrs) {
	    var windowHeight = $window.innerHeight;
	    element.css('height', windowHeight - 250 + 'px');
	};	
}

module.exports = ContentHolder;
