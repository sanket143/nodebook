<template>
  <div>
    <client-only>
      <codemirror
        :options="cmOptions"
        @input="onCodeChange"
      />
    </client-only>
  </div>
</template>

<script>
import Vue from "vue"

import "codemirror/lib/codemirror.css"
import "codemirror/theme/elegant.css"

export default Vue.extend({
  data(){
    return {
      socket: false,
      cmOptions: {
        tabSize: 4,
        mode: "javascript",
        theme: "elegant",
        lineNumbers: false,
        line: true,
        extraKeys: {
          "Ctrl-Enter": () => {
            this.execute()
          }
        }
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
