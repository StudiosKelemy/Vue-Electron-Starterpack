import { app, BrowserWindow, Menu } from 'electron'
import { productName } from '../../package.json'

// set app name
app.setName(productName)

// disable electron warning
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'

const gotTheLock = app.requestSingleInstanceLock()
const isDev = process.env.NODE_ENV === 'development'
const isDebug = process.argv.includes('--debug')
let mainWindow

// only allow single instance of application
if (!isDev) {
    if (gotTheLock) {
        app.on('second-instance', () => {
            // Someone tried to run a second instance, we should focus our window.
            if (mainWindow && mainWindow.isMinimized()) {
                mainWindow.restore()
            }
            mainWindow.focus()
        })
    } else {
        app.quit()
        process.exit(0)
    }
} else {
    require('electron-debug')({
        showDevTools: !(process.env.RENDERER_REMOTE_DEBUGGING === 'true'),
    })
}

async function installDevTools() {
    try {
        /* eslint-disable */
        require('devtron').install()
        require('vue-devtools').install()
        /* eslint-enable */
    } catch (err) {
        console.log(err)
    }
}

function createWindow() {
/**
 * Initial window options
 */
mainWindow = new BrowserWindow({
    backgroundColor: '#fff',
    width: 960,
    height: 540,
    minWidth: 960,
    minHeight: 540,
    // useContentSize: true,
    webPreferences: {
        nodeIntegration: true,
        nodeIntegrationInWorker: false,
        webSecurity: false,
    },
    show: false,
})

// load root file/url
if (isDev) {
    mainWindow.loadURL('http://localhost:9080')
} else {
    mainWindow.loadFile(`${__dirname}/index.html`)

    global.__static = require('path')
    .join(__dirname, '/static')
    .replace(/\\/g, '\\\\')
}

// Show when loaded
mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.focus()
})

mainWindow.on('closed', () => {
    console.log('closed')
})
}

app.on('ready', () => {
    createWindow()

    if (isDev) {
        installDevTools()
    }

    if (isDebug) {
        mainWindow.webContents.openDevTools()
    }
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
