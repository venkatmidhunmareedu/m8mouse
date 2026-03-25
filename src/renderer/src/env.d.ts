/// <reference types="vite/client" />
/// <reference types="w3c-web-hid" />

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      m8m: {
        getData: () => Promise<ConfigType>
        setData: ({
          dpi_mode,
          led_mode
        }: {
          dpi_mode: number
          led_mode: number
        }) => Promise<unknown>
      }
    }
  }
}
