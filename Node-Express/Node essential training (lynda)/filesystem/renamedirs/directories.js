var fs = require('fs');

fs.rmdir("./assets", function(err){
	if(err){
		throw err;
	}

	console.log("assets directory removed");
});

fs.readdirSync("./logs").forEach(function(fileName){
	fs.unlinkSync("./logs/" + fileName);
});

fs.rmdir("./logs", function(err){
	if(err){
		throw err;
	}

	console.log("logs directory removed")
})

// fs.renameSync("./assets/logs", "./logs");

// console.log("directory moved");

