var fs = require("fs");

try{
	fs.unlinkSync("./lib/config.json");
} catch (err) {
	console.log(err);
}

fs.unlinkSync("notes.md", function(err){
	if (err){
		console.log(err);
	} else {
		console.log("notes.md removed");
	}
});

