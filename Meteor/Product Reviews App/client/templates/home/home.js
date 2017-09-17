Template.home.helpers({
	products: function () {
		return	Products.find({is_featured: "1"});
	}
});