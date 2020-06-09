var express = require('express');
var router = express.Router();
var expressWs = require('express-ws')(router);

router.ws('/echo', (ws, req) => {
  ws.on('message', function(msg) {
    ws.send(msg);
  })

  ws.on("close", () => {
    console.log("Close")
  })
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
