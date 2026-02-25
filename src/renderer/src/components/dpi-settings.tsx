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

const DPISettings = (): React.JSX.Element => {
  return (
    <FieldContainer>
      <div className="flex w-full justify-between">
        <Label htmlFor="dpi" className="text-xs font-semibold w-1/3">
          DPI Mode :
        </Label>
        <Select>
          <SelectTrigger className="w-full text-xs">
            <SelectValue placeholder="Select a Mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="">Mode</SelectLabel>
              {Object.entries(DPI_MODES).map(([key, value]) => (
                <SelectItem key={key} value={value.toString()} className="text-xs">
                  {key}
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
