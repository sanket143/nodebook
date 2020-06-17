<template>
  <div class="container">
    <div v-for="block in blocks" :key="block.id">
      <CodeBlock :payload="block" @message="messageHandler" />
      <MarkDownBlock />
    </div>
  </div>
</template>

<script>
import CodeBlock from "~/components/code-block.vue"
import MarkDownBlock from "~/components/markdown-block.vue"

export default {
  components: {
    CodeBlock,
    MarkDownBlock
  },
  data(){
    return {
      currentCell: 0,
      blocks: [
        { id: 0, output: "" },
        { id: 1, output: "" },
        { id: 2, output: "" }
      ]
    }
  },
  computed: {
    socket(){
      return this.$nuxtSocket({
        channel: "/"
      })
    }
  },
  mounted(){
    this.socket.on("message", (data) => {
      this.blocks[this.currentCell].output += data
    })
  },
  methods: {
    messageHandler(data){
      this.currentCell = data.cell_id
      this.blocks[this.currentCell].output = ""
      this.socket.emit("message", data.code)
    }
  }
}
</script>
