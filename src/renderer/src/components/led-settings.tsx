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

const LEDSettings = (): React.JSX.Element => {
  return (
    <FieldContainer>
      <div className="flex w-full justify-between">
        <Label htmlFor="led-mode" className="text-xs font-semibold w-1/3">
          LED Mode :
        </Label>
        <Select>
          <SelectTrigger className="w-full text-xs">
            <SelectValue placeholder="Select a Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="">Mode</SelectLabel>
              {Object.entries(LED_MODES).map(([key, value]) => (
                <SelectItem key={key} value={value.toString()} className="text-xs">
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
        <Select>
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
