<template>
  <div class="container">
    <div v-for="(block, index) in blocks" :key="block.id">
      <CodeBlock :payload="{ id: index, current: currentCell, block }" @message="messageHandler" />
      <MarkDownBlock :payload="{ id: index, current: currentCell, block }" @message="messageHandler" />
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
        { output: "" },
        { output: "" },
        { output: "" }
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
    },
    getPayload(index){
      return {
        block: this.block[index],
        active: index === this.currentCell
      }
    }
  }
}
</script>
