Categories = new Mongo.Collection("categories");
Products = new Mongo.Collection("products");

//Product Image Collection using GridFS store
ProductsImages = new FS.Collection("ProductsImages", {
	stores: [new FS.Store.GridFS("ProductsImages")]
});

ProductsImages.allow({
	insert: function(fileId, doc){
		return true;
	},
	download: function(fileId, doc){
		return true;
	}
});
