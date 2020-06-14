<template>
  <div>
    <h1>Gag reflex</h1>
    <form @submit.prevent="execute">
      <input v-model="msg">
      <client-only>
        <codemirror
          :value="code"
          :options="cmOptions"
          @input="onCodeChange"
        />
      </client-only>
    </form>
  </div>
</template>

<script>
import Vue from "vue"
import "codemirror/lib/codemirror.css"
import "codemirror/theme/neo.css"

export default Vue.extend({
  data(){
    return {
      msg: "",
      socket: false,
      code: "const i = 10",
      cmOptions: {
        tabSize: 4,
        mode: "javascript",
        theme: "neo",
        lineNumbers: true,
        line: true
      }
    }
  },
  mounted(){
    const domain = getDomain(location.toString())
    this.socket = new WebSocket(`ws://${domain}/api/socket`)

    this.socket.onopen = function(event){
      console.log("opened")
    }

    this.socket.onmessage = function(event){
      console.log(event)
    }

    this.socket.onerror = function(event){
      console.log(event)
    }

    this.socket.onclose = function(event){
      console.log(event)
    }
  },
  methods: {
    execute(){
      this.socket.send(this.code)
    },
    onCodeChange(newCode){
      this.code = newCode
    }
  }
})

function getDomain(website){
  let i = website.indexOf("://") + 3
  let domain = ""

  while(website.length > i){
    domain += website[i]
    i++

    if(website[i] === "/"){
      break
    }
  }

  return domain
}
</script>
