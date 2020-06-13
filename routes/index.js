const express = require('express')
const router = express.Router()
const expressWs = require('express-ws')(router)
const net = require('net')

const sock = net.connect(4144)


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.ws('/socket', (ws, req) => {
  ws.on('message', function(msg) {
    sock.write(msg + "\r\n")
  })

  ws.on("close", () => {
    console.log("Close")
  })

  sock.on("data", (msg) => {
    ws.send(msg.toString())
  })

  sock.on('connect', () => {
    process.stdin.resume();
    process.stdin.setRawMode(true)
  })

  sock.on('close', function done(){
    process.stdin.setRawMode(false)
    process.stdin.pause()
    sock.removeListener('close', done)
  })

  sock.on("error", (err) => {
    console.log(err)
  })
})

module.exports = router;
