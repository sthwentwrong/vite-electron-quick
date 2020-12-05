/**
 * electron 主文件
 */
import { join } from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'
import Store from 'electron-store'

const store = new Store()
ipcMain.on('store:set', async (e, args) => {
  store.set(args.key, args.value)
})
ipcMain.handle('store:get', async (e, args) => {
  const value = await store.get(args)
  return value
})
ipcMain.on('store:delete', async (e, args) => {
  store.delete(args)
})

ipcMain.on('runEnv', (event, args) => {
  console.log(args)
  let nodeVer = process.versions["node"]
  let chromeVer = process.versions["chrome"]
  let electronVer = process.versions["electron"]
  event.reply('runEnv-reply', { 'node': nodeVer, 'chrome': chromeVer, 'electron': electronVer })
})

dotenv.config({ path: join(__dirname, '../../.env') })

let win = null

class createWin {
  // 创建浏览器窗口
  constructor () {
    win = new BrowserWindow({
      width: 330,
      height: 700,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
      },
    })
  
    const URL = is_dev
      ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址
  
    win.loadURL(URL)
  }
}

app.whenReady().then(() => new createWin())

import fs from 'fs'

ipcMain.on('list-media-files', (event, args) => {
  console.log(args)
  let files = [String]
  let targetPath = args['targetPath']
  console.log(targetPath)
  // fs.readdir(targetPath, (err, files) => {
  //   if (err) {
  //     console.log('对不起，您没有加载您的home folder');
  //   }
  //   files.forEach((file: any) => {
  //     console.log(`${targetPath}/${file}`);
  //     files.push(`${targetPath}/${file}`);
  //   });
  // });
  
  // console.log(files)
  // event.reply('list-media-files-reply',files )
})
