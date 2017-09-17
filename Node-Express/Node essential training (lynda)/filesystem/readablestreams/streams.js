var fs = require("fs");

var stream = fs.createReadStream("./chat.log", "UTF-8");

var data = "";

stream.once("data", function (){
	console.log("\n started reading file \n");
});

stream.on("data", function(chunk){
	process.stdout.write(`chunk: ${chunk.length} | `)

	data += chunk;
});

stream.on("end", function(){
	console.log("\n");
	console.log(`ended reading file ${data.length}`);
	console.log("\n");
});

// fs.readFile("./chat.log", "UTF-8", function(err,chatlog){
// 	console.log(`File Read ${chatlog.length}`);
// });

// console.log("Reading File");