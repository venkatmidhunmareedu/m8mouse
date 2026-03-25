/* eslint-disable react-refresh/only-export-components */
import { getConfig } from '@/lib/api'
import { createContext, useContext, useEffect, useState } from 'react'

interface HIDContextType {
  isConnected: boolean
  config: ConfigType | null
  error: string
  loading : boolean
}


const HIDContext = createContext<HIDContextType>({
  isConnected: false,
  config: null,
  error: "",
  loading : false
})

const useHID = (): HIDContextType => {
  const [isConnected] = useState<boolean>(false)
  const [config, setConfig] = useState<ConfigType | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      await getConfig().then((res) => {
        console.log("res", res);
        
        setConfig(res)
      }).catch((err) => {
        setError(String(err))
      }).finally(() => {
        setLoading(false)
      })
    }
    fetchData()
  }, []) // ✅ empty deps — don't re-run when device state changes

  return {
    isConnected,
    config,
    error,
    loading
  }
}

export const useHIDStore = (): HIDContextType => {
  const context = useContext(HIDContext)
  return context
}

export const HIDProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const state = useHID()
  return <HIDContext.Provider value={state}>{children}</HIDContext.Provider>
}
