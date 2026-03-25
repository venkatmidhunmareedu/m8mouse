import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { execFile } from 'child_process'
import fs from "fs"

const getBinaryPath = (): string => {
  if (app.isPackaged) {
    // In production, electron-builder moves "resources/${platform}" to "bin" via extraResources
    return path.join(
      process.resourcesPath,
      'bin',
      process.platform === 'win32' ? 'm8mouse.exe' : 'm8mouse'
    )
  } else {
    // In development, we point to the actual root resources folder
    // __dirname is "out/main", so we go up two levels to reach the project root
    return path.join(
      app.getAppPath(),
      'resources',
      process.platform === 'win32' ? 'windows' : 'linux',
      process.platform === 'win32' ? 'm8mouse.exe' : 'm8mouse'
    )
  }
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    show: false,
    autoHideMenuBar: true,
    resizable: false,
    titleBarStyle: 'hidden',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // session.defaultSession.setDevicePermissionHandler((details) => {
  //   console.log('[MAIN] setDevicePermissionHandler:', details.deviceType, details.device)
  //   if (details.deviceType === 'hid') return true // allow ALL hid first for testing
  //   return false
  // })

  // session.defaultSession.on('select-hid-device', (event, details, callback) => {
  //   console.log('[MAIN] select-hid-device fired, devices:', details.deviceList)
  //   event.preventDefault()
  //   const device = details.deviceList.find((d) => d.vendorId === 0x1bcf) // your actual vendorId
  //   console.log('[MAIN] selecting device:', device)
  //   callback(device?.deviceId ?? '')
  // })

  // session.defaultSession.setPermissionCheckHandler((__dirname, permission) => {
  //   console.log('[MAIN] permissionCheck:', permission)
  //   if (permission === 'hid') return true
  //   return false
  // })
  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // API
  ipcMain.handle('m8m:get-data', async () => {
    const binaryPath = getBinaryPath() // Using the helper from the previous step

    // 1. Ensure the file exists
    if (!fs.existsSync(binaryPath)) {
      return { error: 'Binary not found', path: binaryPath }
    }

    // 2. Fix permissions automatically for Linux/Mac
    if (process.platform !== 'win32') {
      try {
        const stats = fs.statSync(binaryPath)
        // Check if the executable bit is missing (0o111)
        if (!(stats.mode & 0o111)) {
          fs.chmodSync(binaryPath, 0o755)
          console.log('Fixed binary permissions.')
        }
      } catch (err) {
        console.error('Failed to set permissions:', err)
      }
    }

    return new Promise((resolve) => {
      // 3. Run the binary (No "./" prefix!)
      execFile(binaryPath, ['-j'], (error, stdout) => {
        if (error) {
          // If it STILL fails here, it might be a library dependency issue (glibc)
          return resolve({ error: 'Command failed', details: error.message })
        }

        try {
          resolve(JSON.parse(stdout))
        } catch (error) {
          resolve({ error: error, raw: stdout })
        }
      })
    })
  })
  ipcMain.handle('m8m:set-data', async (_, { dpi_mode, led_mode }) => {
    const binaryPath = getBinaryPath()
    return new Promise((resolve) => {
      // 3. Run the binary (No "./" prefix!)
      execFile(binaryPath, ['-j', '-dpi', dpi_mode, '-led', led_mode], (error, stdout) => {
        if (error) {
          // If it STILL fails here, it might be a library dependency issue (glibc)
          return resolve({ error: 'Command failed', details: error.message })
        }

        try {
          resolve(JSON.parse(stdout))
        } catch (error) {
          resolve({ error: error, raw: stdout })
        }
      })
    })
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
