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
    <vue-markdown :source="output" />
  </div>
</template>

<script>
import VueMarkdown from "vue-markdown"

export default {
  components: {
    VueMarkdown
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
