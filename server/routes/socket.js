module.exports = (socket) => {
  socket.on("message", (msg) => {
    socket.emit("message", msg)
  })

  console.log("A user connected")
}
