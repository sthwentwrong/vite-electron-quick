<template>
  <h1>{{ msg }}</h1>
  <p>
    <span>
      We are using Node.js <span id="node-version">{{ nodeVer }}</span
      >, Chromium <span id="chrome-version">{{ chromeVer }}</span
      >, and Electron <span id="electron-version">{{ eleVer }}</span
      >.
    </span>
  </p>
</template>

<script>
export default {
  name: "SystemInfo",
  props: {
    msg: String,
    nodeVer: String,
    chromeVer: String,
    eleVer: String,
  },
};
</script>
<style lang="sass" scoped>
h1
  color: #00c13c
</style>
