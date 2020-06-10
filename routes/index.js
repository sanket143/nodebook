const express = require('express')
const router = express.Router()
const expressWs = require('express-ws')(router)

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})

router.ws('/socket', (ws, req) => {
  ws.on('message', function(msg) {
    ws.send(msg);
  })

  ws.on("close", () => {
    console.log("Close")
  })
})

module.exports = router;
