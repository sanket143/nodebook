const net = require("net")
const repl = require("repl")
const REPL_PORT = 41431
const router = require('express-ws-routes')();

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

router.get("/", function(req, res, next){
  res.send("test")
})

router.websocket("/socket", (info, cb) => {

  cb(ws => {
    console.log(ws.upgradeReq)
    ws.on("message", (msg) => {
      sock.write(msg + "\r\n")
    })

    ws.on("close", () => {
      console.log("Close")
    })

    sock.on("data", (msg) => {
      try {
        ws.send(msg.toString())
      }
      catch(e) {
        console.log(e)
      }
    })

    sock.on("connect", () => {
      process.stdin.resume()
      process.stdin.setRawMode(true)
    })

    sock.on("close", function done(){
      process.stdin.setRawMode(false)
      process.stdin.pause()
      sock.removeListener("close", done)
    })

    sock.on("error", (err) => {
      console.log(err)
    })
  })
})

module.exports = router
