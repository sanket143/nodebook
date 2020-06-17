import Vue from "vue"

if (process.browser){
  const VueCodemirror = require("vue-codemirror")
  require("codemirror/mode/javascript/javascript")
  require("codemirror/mode/markdown/markdown")
  Vue.use(VueCodemirror)
}
