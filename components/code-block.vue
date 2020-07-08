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
    <div v-show="payload.block.output.length > 0" class="output-wrapper">
      <pre>{{ payload.block.output }}</pre>
    </div>
    <div v-show="payload.index === payload.current" class="block-options">
      <div class="block-option link" @click="addCell('CODE')">
        [ code ]
      </div>
      <div class="block-option link" @click="addCell('MARKDOWN')">
        [ markdown ]
      </div>
      <div class="block-option link" @click="deleteCell">
        [ delete ]
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue"

import "codemirror/lib/codemirror.css"
import "codemirror-github-light/lib/codemirror-github-light-theme.css"

export default Vue.extend({
  props: {
    payload: {
      required: true,
      type: Object
    }
  },
  data(){
    return {
      code: "",
      cmOptions: {
        tabSize: 4,
        theme: "github-light",
        lineNumbers: false,
        mode: "javascript",
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
      const obj = {
        action: "EXECUTE",
        payload: {
          cell_index: this.payload.index,
          code: this.code + "\r\n"
        }
      }
      this.$emit("message", obj)
    },
    onCodeChange(newCode){
      this.code = newCode
    },
    addCell(type){
      const obj = {
        action: "NEWCELL",
        payload: {
          type,
          cell_index: this.payload.index
        }
      }

      this.$emit("message", obj)
    },
    deleteCell(){
      const obj = {
        action: "DELETE",
        payload: {
          cell_index: this.payload.index
        }
      }

      this.$emit("message", obj)
    }
  }
})
</script>

<style>
.CodeMirror {
  height: auto;
}

.cm-s-github-light .CodeMirror-lines {
  background: #fafafa;
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

.code-wrapper {
  background-color: whitesmoke;
}
.output-wrapper {
  font-size: 12px;
  padding: 4px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
}
</style>
