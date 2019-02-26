<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
body {
  background: #2e343b;
  display: flex;
  justify-content: center;
  align-items: center;
}
#app {
  font-family: "Space Mono", monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  margin-top: 2rem;
}
.nav {
  height: 2rem;
  width: 100vw;
  background: blue;
}
</style>
