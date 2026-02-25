import { FlaskConical } from 'lucide-react'

const ThumbKeyBindings = (): React.JSX.Element => {
  return (
    <div className="flex flex-col w-full h-full items-center justify-center text-muted-foreground opacity-50">
      <div className="flex flex-col items-center gap-2">
        <FlaskConical size={24} />
        <p className="text-xs font-semibold">Feature in Development</p>
      </div>
    </div>
  )
}

export default ThumbKeyBindings
