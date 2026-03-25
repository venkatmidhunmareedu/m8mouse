import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import DPISettings from './dpi-settings'
import LEDSettings from './led-settings'
import { useHIDStore } from '@renderer/hooks/use-hid'
import { Loader2 } from 'lucide-react'

const Operations = (): React.JSX.Element => {
  const {loading} = useHIDStore();
   const tabs: { label: string; value: string }[] = [
    {
      label: 'DPI Settings',
      value: 'dpi'
    },
    {
      label: 'LED Settings',
      value: 'led'
    }
  ]
  return (
    <div className="h-full w-full flex flex-col border p-2 rounded-lg">
      {
        loading ? (
          <div className="flex items-center justify-center h-full w-full">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <Tabs defaultValue={'dpi'} className="w-full h-full">
        <TabsList className=" m-0 p-0 border-none bg-transparent border-b flex w-full justify-between items-center">
          {tabs.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab.value}
              className="text-xs group border-none bg-transparent"
            >
              <span className="text-xs font-semibold">{tab.label}</span>
              <div className="group-data-active:visible invisible" />
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={'dpi'} className="h-full w-full">
          <DPISettings />
        </TabsContent>
        <TabsContent value={'led'} className="h-full w-full">
          <LEDSettings />
        </TabsContent>
      </Tabs>
        )
      }
    </div>
  )
}

export default Operations
