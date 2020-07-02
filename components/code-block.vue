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
    <div v-show="payload.id === payload.current" class="block-options">
      <div class="block-option link">
        [ code ]
      </div>
      <div class="block-option link">
        [ markdown ]
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
      output: "",
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
        cell_id: this.payload.id,
        code: this.code + "\r\n"
      }
      this.$emit("message", obj)
    },
    onCodeChange(newCode){
      this.code = newCode
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
