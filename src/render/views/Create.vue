<template>
  <router-link to="/">
    <el-button type="success"> 返回首页 </el-button>
  </router-link>
  <div class="demo-shadow" style="display: block;box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;">
  <input v-model="state.message" placeholder="edit me" />
  <el-button type="success" @click="listMediaFiles"> 获取文件列表 </el-button>
  </div>
  <div class="demo-shadow" style="width: 50px; display: block;box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px, rgba(0, 0, 0, 0.04) 0px 0px 6px;">
    <p>
      <ul>
        <li v-for="f in state.media_files" :key="f.name">
          {{f.name}}
        </li>
      </ul>
    </p>
  </div>
</template>
<script>
import { reactive, computed } from "vue";
const ipcRenderer = require("electron").ipcRenderer;
export default {
  setup() {
    const state = reactive({
      message: "E:\\fs\\beycomp",
      media_files: [],
    });
    return {
      state,
    };
  },
  methods: {
    getSysInfo() {
      ipcRenderer.send("runEnv", "from_getSysInfo_Created");
    },
    listMediaFiles() {
      console.log(this.state.message);
      this.state.media_files = [];
      ipcRenderer.send("list-media-files", { targetPath: this.state.message });
      let fs = require("fs");
      fs.readdir(this.state.message, (err, files) => {
        if (err) {
          console.log(err);
        } else {
          files.forEach((file) => {
            this.state.media_files.push({name: file});
            console.log(file);
          });
        }
      });
    },
  },
};

ipcRenderer.on("runEnv-reply", (event, args) => {
  //   console.log(args);
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };
  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, args[type]);
  }
});

ipcRenderer.on("list-media-files-reply", (event, args) => {
  console.log(args);

  for (let fi in args) {
    console.log(fi);
  }
});
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: currentColor;
}

demo-shadow{
  height:100px;
  width:50%;
  border:1px solid #eee
  }
</style>
