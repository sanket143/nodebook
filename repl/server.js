const Repl = require("repl")
const fs = require("fs")
const stream = fs.createWriteStream("./output")

Repl.start({
  output: stream,
  input: process.stdin
})
