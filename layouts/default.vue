<template>
  <div>
    <Navbar />
    <div id="view">
      <div id="sidebar-view">
        <Sidebar />
      </div>
      <div id="main-view">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "~/components/navbar.vue"
import Sidebar from "~/components/sidebar.vue"

export default {
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

:root {
  --primary-swatch: #424242;
  --space-1: 10px;
  --size-1: 12px;
}

html {
  font-size: 12px;
  word-spacing: 1px;
  box-sizing: border-box;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: Roboto, 'Helvetica Neue', Arial, sans-serif;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

#view {
  padding: var(--space-1) 0;
  padding: var(--space-1);
  display: flex;
}

#main-view {
  flex: 1;
}

.link {
  color: var(--primary-swatch);
  cursor: pointer;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
