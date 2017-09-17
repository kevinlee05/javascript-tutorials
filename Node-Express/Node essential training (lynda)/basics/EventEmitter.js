var EventEmitter = require('events').EventEmitter;
var util = require('util');

var Person = function(name){
	this.name = name;
};

util.inherits(Person, EventEmitter);

var Kevin = new Person("Kevin Lee");

Kevin.on('speak', function(said){
	console.log(`${this.name}: ${said}`);
});

Kevin.emit('speak', "cool shit");


// var events = require('events');

// var emitter = new events.EventEmitter();

// emitter.on('customEvent', function(message, status){

// 	console.log(`${status}: ${message}`);

// });

// emitter.emit('customEvent', "Hello World", 200);