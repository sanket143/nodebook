var express = require('express');
var router = express.Router();
var expressWs = require('express-ws')(router);

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
