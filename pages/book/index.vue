<template>
  <div class="container">
    <div v-for="(block, index) in blocks" :key="block.id">
      <CodeBlock v-if="block.type == 'CODE'" :payload="{ id: index, current: currentCell, block }" @message="messageHandler" />
      <MarkDownBlock v-else-if="block.type == 'MARKDOWN'" :payload="{ id: index, current: currentCell, block }" @message="messageHandler" />
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
        {
          type: "MARKDOWN",
          output: ""
        },
        {
          type: "CODE",
          output: ""
        }
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
      const payload = data.payload

      if(data.action === "EXECUTE"){
        this.currentCell = payload.cell_id
        this.blocks[this.currentCell].output = ""
        this.socket.emit("message", data.payload.code)
      } else if(data.action === "NEWCELL"){
        this.blocks.splice(payload.cell_id + 1, 0, {
          type: payload.type,
          output: ""
        })
      }
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
