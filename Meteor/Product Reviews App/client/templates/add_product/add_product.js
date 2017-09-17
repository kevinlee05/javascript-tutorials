Template.add_product.helpers({
	categories: function(){
		return Categories.find({}, {
			sort:{
				name: 1
			}
		})
	}
})

Template.add_product.events({
	"submit .add_product": function(event){

		var product, productImage;
		
		var name = event.target.name.value;
		var category = event.target.category.value;
		var description = event.target.description.value;
		var is_featured = event.target.is_featured.value;
		
		var file = $('#productImage').get(0).files[0];
		console.log(file);
		
		Meteor.call('addProduct', file, name, category, description, is_featured, function(error, result){
			
			if(error){
				FlashMessages.sendAlert(error);
			} else {
				FlashMessages.sendSuccess("Product Added");
			}
			
			//clear form
			event.target.name.value = '';
			event.target.category.value = '';
			event.target.description.value = '';
			event.target.is_featured.value = '';
			
			Router.go('/');
						
		}); 
		
		
		//cancel submission
		return false;
	}
})
