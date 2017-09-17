myApp.directive('confirmationNeeded', function(){
	return {
		priority: 1,
		terminal: true,
		link: function(scope, element, attr){
			var msg = attr.confirmationNeeded || "are you sure you want to delete?";
			var clickAction = attr.ngClick;
			element.bind('click', function(){
				if (window.confirm(msg)){
					scope.$eval(clickAction);
				}; //confirm
			}); // click
		} // link
	} // return
}); // confirmation needed directive