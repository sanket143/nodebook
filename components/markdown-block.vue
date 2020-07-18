<template>
  <div>
    <client-only>
      <div class="code-wrapper" @click="active">
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
    },
    active(){
      const obj = {
        action: "UPDATE_ACTIVE",
        payload: {
          cell_index: this.payload.index
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
  padding: 0 4px;
  margin-bottom: var(--space-1);
}

.code-wrapper {
  margin: var(--space-1) 0;
}
</style>

<style scoped>
.block-options {
  padding: 0 4px;
  display: flex;
}

.block-option {
  margin-right: var(--space-1);
}
</style>
