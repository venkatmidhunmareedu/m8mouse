import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import DPISettings from './dpi-settings'
import LEDSettings from './led-settings'
import ThumbKeyBindings from './thumb-key-bindings'

const Operations = (): React.JSX.Element => {
  const tabs: { label: string; value: string }[] = [
    {
      label: 'DPI Settings',
      value: 'dpi'
    },
    {
      label: 'LED Settings',
      value: 'led'
    },
    {
      label: 'Thumb Key Bindings',
      value: 'thumb-bindings'
    }
  ]
  return (
    <div className="h-full w-full flex flex-col border p-2 rounded-lg">
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
        <TabsContent value={'thumb-bindings'} className="h-full w-full">
          <ThumbKeyBindings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Operations
