function getDomain(website){
  var i = website.indexOf("://") + 3
  var domain = ""

  while(website.length > i){
    domain += website[i]
    i++

    if(website[i] === "/"){
      break
    }
  }

  return domain
}

function sendMessage(msg){
  socket.send(msg)
}
var domain = getDomain(location.toString())
var socket = new WebSocket(`ws://${domain}/socket`)

socket.onopen = function(event){
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

$("#the-form").on("submit", (e) =>{
  e.preventDefault()
  msg = $("#message").val()

  sendMessage(msg)
})
