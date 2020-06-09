var socket = new WebSocket("ws://localhost:3000/echo")

socket.onopen = function(event){
  socket.send("hellooooo")
  console.log("opened")
}

socket.onmessage = function(event){
  console.log(event)
}

socket.onerror = function(event){
  console.log(event)
}

socket.onclose = function(event){
  console.log(event)
}
