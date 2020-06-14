const net = require("net")
const repl = require("repl")
const REPL_PORT = 41431
const router = require('express')();

net.createServer((socket) => {
  const r = repl.start({
    prompt: "",
    input: socket,
    output: socket,
    preview: false,
    terminal: false,
    useGlobal: false,
    completer: false,
    ignoreUndefined: true
  })

  r.on("exit", function(){
    socket.end()
  })

  r.displayPrompt = () => {
    return
  }

  r.context.socket = socket
}).listen(REPL_PORT)

const sock = net.connect(41431)

module.exports = (socket) => {
  socket.on("message", (msg) => {
    sock.write(msg.code + "\r\n")
  })

  sock.on("data", (msg) => {
    try {
      socket.emit("message", msg.toString())
    }
    catch(e) {
      console.log(e)
    }
  })

  sock.on("close", function done(){
    sock.removeListener("close", done)
  })

  sock.on("error", (err) => {
    console.log(err)
  })
  console.log("A user connected")
}
