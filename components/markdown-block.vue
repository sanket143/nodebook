<template>
  <div>
    <client-only>
      <div class="code-wrapper">
        <codemirror
          :options="cmOptions"
          @input="onCodeChange"
        />
      </div>
    </client-only>
    <div v-show="output.length > 0" class="markdown-wrapper">
      <client-only>
        <vue-markdown :source="output" />
      </client-only>
    </div>
    <div class="block-options">
      <div class="block-option link" @click="addCell('CODE')">
        [ code ]
      </div>
      <div class="block-option link" @click="addCell('MARKDOWN')">
        [ markdown ]
      </div>
    </div>
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown"

export default {
  components: {
    VueMarkdown
  },
  props: {
    payload: {
      required: true,
      type: Object
    }
  },
  data(){
    return {
      code: "",
      output: "",
      cmOptions: {
        tabSize: 4,
        theme: "github-light",
        lineNumbers: false,
        mode: "markdown",
        line: true,
        indentWithTabs: false,
        extraKeys: {
          "Ctrl-Enter": () => {
            this.execute()
          }
        }
      }
    }
  },
  methods: {
    execute(){
      this.output = this.code
    },
    onCodeChange(newCode){
      this.code = newCode
    },
    addCell(type){
      console.log("New code")
      const obj = {
        action: "NEWCELL",
        payload: {
          type,
          cell_id: this.payload.id
        }
      }

      this.$emit("message", obj)
    }
  }
}
</script>

<style>
ul {
  padding-left: 20px;
}
.markdown-wrapper {
  padding: var(--space-1) 4px;
}
</style>

<style scoped>
.block-options {
  padding: 10px 4px;
  display: flex;
}

.block-option {
  margin-right: var(--space-1);
}
</style>
