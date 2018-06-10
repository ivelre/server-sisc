var socket = io.connect('localhost:8080',{'forceNew':true})
casilla = Math.floor(Math.random() * 100)

socket.on('whoAreYou', function(){
	socket.emit('IAm', {casilla})
})

socket.on('boxesList',function(data){
	$('#chips').empty()
	for(i = 0; i < data.length; i++){
		$('#chips').append('<div class="chip">' + data[i].box + '</div>')
	}
})

function updateChat(data){
	var html = data.map(function(elem, index){
		return(`<div>
							<strong>${elem.author}</strong>:
							<em>${elem.text}</em>
						</div>`)
	}).join(" ")

	document.getElementById('messages').innerHTML = html
}

function addMessage(){
	var payload ={
		author: document.getElementById('username').value,
		text: document.getElementById('text').value
	}

	socket.emit('new-message', payload)
	return false
}

$(".button-collapse").sideNav();

