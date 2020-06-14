const router = require('express')();

router.get("/", function(req, res, next){
  res.send("test")
})

module.exports = router
