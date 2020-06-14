import Vue from "vue"

if (process.browser){
  const VueCodemirror = require("vue-codemirror")
  require("codemirror/mode/javascript/javascript")
  Vue.use(VueCodemirror)
}
