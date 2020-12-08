<template>
  <router-link to="/">
    <el-button type="success"> 返回首页 </el-button>
  </router-link>
  <div
    class="demo-shadow"
    style="
      display: block;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px,
        rgba(0, 0, 0, 0.04) 0px 0px 6px;
    "
  >
    <input v-model="state.message" placeholder="edit me" />
    <el-button type="success" @click="listMediaFiles"> 获取文件列表 </el-button>
  </div>
  <div class="demo-shadow" style="width: 400px">
    <vue-plyr>
      <audio controls crossorigin playsinline>
        <source src="{{state.currentMusic}}" type="audio/mp3" />
      </audio>
    </vue-plyr>
  </div>
  <el-table
    :data="state.media_files"
    style="width: 100%; max-height=250"
    :stripe="true"
  >
    <el-table-column prop="name" label="Music">
      <template #default="scope">
        <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="fullPath" label="Path" style="width: 200px">
      <template #default="scope">
        <i class="el-icon-location-information" />
        <span style="margin-left: 10px">{{ scope.row.fullPath }}</span>
      </template>
    </el-table-column>

    <el-table-column prop="name" label="">
      <template #default="scope">
        <el-button
          class="el-icon-video-play"
          @click="playInstance(scope.row.fullPath)"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { reactive, computed } from "vue";
const AC = new window.AudioContext();
const ipcRenderer = require("electron").ipcRenderer;
export default {
  setup() {
    const state = reactive({
      message: "E:\\music",
      media_files: [],
      currentMusic: "",
    });
    return {
      state,
      tableData: state.media_files,
    };
  },
  methods: {
    getSysInfo() {
      ipcRenderer.send("runEnv", "from_getSysInfo_Created");
    },
    generateItem(m_name, m_path) {
      return {
        name: m_name,
        fullPath: m_path,
      };
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
            this.state.media_files.push({
              name: file.split(".")[0],
              fullPath: this.state.message + "\\" + file,
            });
            console.log(file);
          });
        }
      });
    },
    playInstance(audioFile) {
      console.log("entering play instance" + audioFile);
      console.log(audioFile);
      console.log("entering play instance end");
      const musicMp3 = document.getElementById("myplayer3");
      ipcRenderer.send("readfile", { targetPath: audioFile });
      console.log("ipcRenderer end");
      ipcRenderer.on("readfile-reply", (event, args) => {
        console.log("read-audio-file-reply" + args);
        AC.decodeAudioData(args["buffer"]);
        // let bolb = new Blob([args["buffer"]]);
        // let url = URL.createObjectURL(bolb);
        // console.log(url);
        this.state.currentMusic = AC.decodeAudioData(args["buffer"]);
      });
      // musicMp3.src = audioFile;
      // musicMp3.play();
    },
  },
};

// ipcRenderer.on("readfile-reply", (event, args) => {
//   console.log("read-audio-file-reply" + args);
//   let bolb = new Blob([args["buffer"]]);
//   let url = URL.createObjectURL(bolb);
//   console.log(url);
//   this.state.currentMusic = url;
// });

ipcRenderer.on("runEnv-reply", (event, args) => {
  console.log("runEnv-reply" + args);
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

demo-shadow {
  height: 100px;
  width: 50%;
  border: 1px solid #eee;
}
</style>
