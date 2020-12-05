<template>
  <router-link to="/">
    <el-button type="success"> 返回首页 </el-button>
  </router-link>
  <div>
    <sysInfo
      :nodeVer="`${version1}`"
      :chromeVer="`${version2}`"
      :eleVer="`${version3}`"
    />
  </div>
</template>
<script>
import sysInfo from "../components/SystemInfo.vue";
const version = require("process").versions;

export default {
  name: "About",
  components: {
    sysInfo,
  },
  setup() {
    const version1 = version["node"];
    const version2 = version["chrome"];
    const version3 = version["electron"];

    return {
      version1,
      version2,
      version3,
    };
  },
};
</script>
