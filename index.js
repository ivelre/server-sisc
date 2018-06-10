var express = require('express')
var app = express()
var server = require('http').Server(app)
var io = require('socket.io')(server)

app.use(express.static('dev'))

var clients = []

io.on('connection', function(socket){
	console.log('Someone is connected');
	socket.emit('whoAreYou')

	socket.on('IAm', function(data){
		var element = clients.findIndex(function(e){return e.id == socket.id;});
		if(element == -1)
			clients.push({id:socket.id,box:data.casilla})
		else
			clients[element].box = data.casilla
		io.sockets.emit('boxesList',clients)
	})

	socket.on('upEvidence', function(data){
		io.sockets.emit('messages', messages)
		socket.emit('responseEvidence',{status:true,message:'ok'})
	})

	socket.on('disconnect', function(reazon){
		console.log('Someone is disconnect: ' + reazon)
		var element = clients.findIndex(function(e){return e.id == socket.id;});
		clients.splice(element, 1)
		io.sockets.emit('boxesList',clients)
	})
})

server.listen(8080, function(){
	console.log("***Se inicio el servidor***")
})

function clientsList(){
	console.log('clients list:');
	console.log(clients);
}