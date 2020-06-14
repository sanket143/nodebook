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
    this.socket = this.$nuxtSocket({
      channel: "/"
    })

    this.socket.on("message", (msg) => {
      console.log(msg)
    })
  },
  methods: {
    execute(){
      this.socket.emit("message", {
        foo: "bar"
      }, (resp) => {
        console.log(resp)
      })
    },
    onCodeChange(newCode){
      this.code = newCode
    }
  }
})
</script>
