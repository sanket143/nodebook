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
      code: "",
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

    this.socket.on("message", (data) => {
      console.log(data)
    })

    window.socket = this.socket
  },
  methods: {
    execute(){
      this.socket.emit("message", this.code + "\r\n")
    },
    onCodeChange(newCode){
      this.code = newCode
    }
  }
})
</script>
