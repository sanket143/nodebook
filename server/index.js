const express = require("express")
const consola = require("consola")
const { Nuxt, Builder } = require("nuxt")
const logger = require("morgan")

const app = express()
const http = require('http').createServer(app)
const io = require("socket.io")(http)

const PORT = 41430

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js")
const socketRouter = require("./routes/socket")
config.dev = process.env.NODE_ENV !== "production"

async function start(){
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev){
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express

  app.use(logger("dev"))
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  // error handler
  app.use(function(err, req, res, next){
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render("error")
  })

  app.use(nuxt.render)
  // Listen the server
  
  io.on('connection', socketRouter) 

  http.listen(PORT)
  consola.ready({
    message: `Server listening on http://${host}:${PORT}`,
    badge: true
  })
}
start()
