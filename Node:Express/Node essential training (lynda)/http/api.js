var http = require("http");
var data = require("./data/inventory");

http.createServer(function(req,res){

	if(req.url === "/"){

		res.writeHead(200,{"Content-Type":"text/json"});
		res.end(JSON.stringify(data));

	} else if (req.url === "/instock") {
		res.writeHead(200,{"Content-Type":"text/json"});
		listInStock(res);
	} else if (req.url === "/backorder") {
		res.writeHead(200,{"Content-Type":"text/json"});
		listOnBackOrder(res);
	} else {
		res.writeHead(404,{"Content-Type":"text/plain"});
		res.end("404 error");
	}

}).listen(3000);

console.log("listening 3000");

function listInStock(res){
	var inStock = data.filter(function(item){
		return item.avail === "In stock";
	});

	res.end(JSON.stringify(inStock));
}

function listOnBackOrder(res){
	var onOrder = data.filter(function(item){
		return item.avail === "On back order";
	});

	res.end(JSON.stringify(onOrder));
}