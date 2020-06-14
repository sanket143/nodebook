const net = require("net")
const repl = require("repl")
const REPL_PORT = 41431
const router = require('express')()
const { Writable, Readable } = require("stream")

module.exports = (socket) => {
  const repl_out = new Writable({
    write(chunk, encoding, callback){
      socket.emit("message", chunk.toString())
      callback()
    }
  })

  const repl_in = new Readable({
    read(){}
  })

  socket.resume = (msg) => {
    console.log(msg)
  }

  socket.on("message", (msg) => {
    repl_in.push(msg)
  })

  const r = repl.start({
    prompt: "",
    input: repl_in,
    output: repl_out,
    preview: false,
    terminal: false,
    useGlobal: false,
    completer: false,
    ignoreUndefined: true
  })

  r.on("exit", function(){
    repl_in.push(null)
  })

  r.displayPrompt = () => {
    return
  }
  console.log("A user connected")
}
