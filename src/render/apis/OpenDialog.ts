import { ipcRenderer } from 'electron'

const fs = require('fs');
const path = require('path');

class OpenDialog{
    constructor() {
       
    }
    
    openFile() {
        ipcRenderer.send('openFile')
    }

    openFolder() {
        ipcRenderer.send('openFolder')
    }

    onOpenFile() {
        ipcRenderer.on('openFile-ok', (e, path) => {
            if (!path) {
                return
            }
        })
    }

    onOpenFolder() {
        ipcRenderer.on('openFolder-ok', (e, path) => {
            if (!path) {
                return
            }
        })
    }

    getFileStatFromLocal(path) {
        let arr = []
        arr.push(path[0])
        for (let i = 0; i < path.length; i++) {
            // const result = fs.statSync(path[i])
            // const index = store.state.videoList.findIndex(j => j.src == path[i])
            // if (result && result.dev && index < 0) {
            //     let obj = Object.assign({}, result, {
            //         src: path[i],
            //         mode: 'local'
            //     })
            //     arr.push(this.formatData(obj))
            // }
        }
        return arr
    }
}
 

export default OpenDialog