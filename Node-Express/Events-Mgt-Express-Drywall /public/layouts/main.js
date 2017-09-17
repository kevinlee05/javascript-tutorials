(function(){

	"use strict";

	$(document).ready(function(){
		$('.deleteEvent').on('click', function(){
			var deleteId = $('.deleteEvent').data('delete');
			$.ajax({
				url: '/events/delete/'+ deleteId,
				type: 'DELETE',
				success: function(){
					
				}
			});

			window.location = '/myevents';

		});
	});


}());

