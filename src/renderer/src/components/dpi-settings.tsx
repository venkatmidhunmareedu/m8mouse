import { DPI_MODES } from '@renderer/lib/constants'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import FieldContainer from './field-container'
import { useHIDStore } from '@renderer/hooks/use-hid'
import { useEffect, useMemo, useState } from 'react'

const DPISettings = (): React.JSX.Element => {
  const {config , loading} = useHIDStore()
  const [dpi, setDpi] = useState<string>('')

  const configMemo = useMemo(() => config, [config])
  useEffect(() => {
    if (configMemo) {
      setDpi(configMemo?.dpi_mode?.toString() || '')
    }
  },[configMemo])
  return (
    <FieldContainer>
      <div className="flex w-full justify-between">
        <Label htmlFor="dpi" className="text-xs font-semibold w-1/3">
          DPI Mode :
        </Label>
        <Select value={dpi} onValueChange={(value) => setDpi(value)} disabled={loading}>
          <SelectTrigger className="w-full text-xs">
            <SelectValue placeholder="Select a Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="">Mode</SelectLabel>
              {configMemo?.dpi_resolution?.map((value) => (
                <SelectItem key={value} value={value.toString()} className="text-xs">
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </FieldContainer>
  )
}

export default DPISettings
