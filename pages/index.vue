<template>
  <div class="container">
    <h1>HomePage</h1>
    <form @submit.prevent="execute">
      <input v-model="msg">
    </form>
  </div>
</template>

<script>
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

export default {
  data(){
    return {
      msg: "",
      socket: false
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
      const msg = this.msg

      this.socket.send(msg)
    }
  }
}
</script>
