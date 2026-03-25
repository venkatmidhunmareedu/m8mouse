import { LED_MODES, LED_SPEEDS } from '@renderer/lib/constants'
import FieldContainer from './field-container'
import { Label } from './ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel
} from './ui/select'
import { useHIDStore } from '@renderer/hooks/use-hid'
import { useEffect, useMemo, useState } from 'react'

const LEDSettings = (): React.JSX.Element => {
  const { config, loading } = useHIDStore();
  const configMemo = useMemo(() => config, [config])
  const [ledMode, setLedMode] = useState<string>('');
  const [ledSpeed, setLedSpeed] = useState<string>('');
  useEffect(() => {
    if (configMemo) {
      setTimeout(() => {
        setLedMode(configMemo?.led_mode?.toString() || '')
        setLedSpeed(configMemo?.led_speed?.toString() || '')
      }, 1)
    }
  }, [configMemo])
  return (
    <FieldContainer>
      <div className="flex w-full justify-between">
        <Label htmlFor="led-mode" className="text-xs font-semibold w-1/3">
          LED Mode :
        </Label>
        <Select value={ledMode} onValueChange={(value) => setLedMode(value)} disabled={loading}>
          <SelectTrigger className="w-full text-xs">
            <SelectValue placeholder="Select a Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="">Mode</SelectLabel>
              {Object.entries(LED_MODES).map(([key, value]) => (
                <SelectItem key={key} value={key} className="text-xs">
                  {key}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full justify-between">
        <Label htmlFor="led-mode" className="text-xs font-semibold w-1/3">
          LED Speed :
        </Label>
        <Select value={ledSpeed} onValueChange={(value) => setLedSpeed(value)} disabled={loading}>
          <SelectTrigger className="w-full text-xs">
            <SelectValue placeholder="Select a Speed" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="">Speed</SelectLabel>
              {LED_SPEEDS.map((speed, index) => (
                <SelectItem key={index} value={speed.toString()} className="text-xs">
                  {speed}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </FieldContainer>
  )
}

export default LEDSettings
