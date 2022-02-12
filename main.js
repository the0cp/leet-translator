const {app, BrowserWindow} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 620,
    height: 500,
    maxWidth: 620,
    minWidth: 620,
    maxHeight: 500,
    minHeight: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

 
  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()
  const { Menu } = require('electron');
  Menu.setApplicationMenu(null);
  // hide menu for Mac 
  if (process.platform !== 'darwin') {
    app.dock.hide();}
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

