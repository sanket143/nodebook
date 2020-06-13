var net = require('net')

var sock = net.connect(1431)

process.stdin.pipe(sock)
sock.on("data", function(msg){
  console.log("This is: ", msg.toString())
})

sock.on('connect', function () {
  process.stdin.resume();
  process.stdin.setRawMode(true)
})

sock.on('close', function done () {
  process.stdin.setRawMode(false)
  process.stdin.pause()
  sock.removeListener('close', done)
})

process.stdin.on('end', function () {
  sock.destroy()
  console.log()
})

process.stdin.on('data', function (b) {
  if (b.length === 1 && b[0] === 4) {
    process.stdin.emit('end')
  }
})
