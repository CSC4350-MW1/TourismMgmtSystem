const { app, BrowserWindow, Menu} = require('electron')
require('electron-reload')(__dirname)

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 900
    })
  
    win.loadFile('index.html')
    win.webContents.openDevTools();

    let menu = Menu.buildFromTemplate([
        
            {label:'Exit',
            click() {
                app.quit()
            }
        },
     ])

     Menu.setApplicationMenu(menu)
  }

  app.whenReady().then(() => {
    createWindow()
})
