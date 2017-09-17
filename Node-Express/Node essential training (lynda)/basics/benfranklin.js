var Person = require("./lib/Person");

var Kevin = new Person("Kevin Lee");
var george = new Person("George Washington");

george.on('speak',function(said){
	console.log(`${this.name} -> ${said}`);
});

Kevin.on('speak', function(said){
	console.log(`${this.name}: ${said}`);
});

Kevin.emit('speak', "cool shit");
george.emit('speak', "yadadadada");


// var events = require('events');

// var emitter = new events.EventEmitter();

// emitter.on('customEvent', function(message, status){

// 	console.log(`${status}: ${message}`);

// });

// emitter.emit('customEvent', "Hello World", 200);