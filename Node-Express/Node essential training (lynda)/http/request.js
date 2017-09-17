var https = require("https");
var fs = require("fs");

var options = {
	hostname: "en.wikipedia.org",
	port: 443,
	path: "/wiki/George_Washington",
	method: "GET"
};

var req = https.request(options, function(res){
	var responseBody = "";
	console.log("Response from server has started");
	console.log(`Server Status: ${res.statusCode}`);
	console.log("Response Headers: %j", res.headers);

	res.setEncoding("UTF-8");

	res.once("data", function(chunk){
		console.log("FIRST CHUNK!! \n");

	});

	res.on("data",function(chunk){
		console.log(chunk + "\n");
		console.log(`--chunk-- ${chunk.length}`);
		responseBody += chunk;
	});

	res.on("end", function(){
		fs.writeFile("george-washington.html", responseBody, function(err){
			if(err){
				throw err;
			}
			console.log("file downloaded");
		});
	});
});

req.on("error",function(err){
	console.log(`problem with request: %{err.message}`);
});

req.end();



