var fs = require("fs");

if(fs.existsSync("lib2")) {
	console.log("Directory already there");
} else{

	fs.mkdir("lib2", function(err){
		if(err){
			console.log(err);
		} else {
			console.log("Directory Created");
		}
	});

}