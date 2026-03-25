import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      m8m: {
        getData: () => Promise<ConfigType>
        setData: (data: { dpi_mode: number; led_mode: number }) => Promise<ConfigType>
      }
    }
  }
}