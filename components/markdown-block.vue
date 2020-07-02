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
      <vue-markdown :source="output" />
    </div>
    <div class="block-options">
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
    onCodeChange(newCode){
      this.code = newCode
    },
    execute(){
      this.output = this.code
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
