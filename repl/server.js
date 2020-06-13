var repl = require('repl')
var net = require('net')

net.createServer(function (socket) {
  var r = repl.start({
    prompt: "",
    input: socket,
    output: socket,
    terminal: false,
    useGlobal: false,
    ignoreUndefined: true
  })
  r.on('exit', function () {
    socket.end()
  })
  r.context.socket = socket
}).listen(4144)
