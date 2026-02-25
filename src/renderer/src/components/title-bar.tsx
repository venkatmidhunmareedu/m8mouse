import { Minus, Mouse, X } from 'lucide-react'
import { Button } from './ui/button'

const TitleBar = (): React.JSX.Element => {
  const titleBarActions: {
    identifier: 'minimize' | 'close'
    icon: React.ReactNode
    action: () => void
  }[] = [
    {
      identifier: 'minimize',
      icon: <Minus />,
      action: () => {}
    },
    {
      identifier: 'close',
      icon: <X />,
      action: () => {}
    }
  ]
  return (
    <div className="px-3 w-full h-10 border-b flex items-center justify-between title-bar-drag-on">
      <div className="flex items-center gap-1">
        <Mouse size={18} />
        <p className="text-sm font-semibold">M8Mouse</p>
      </div>
      <div className="flex items-center gap-1 title-bar-drag-off">
        {titleBarActions.map((action, index) => (
          <Button
            variant={index === titleBarActions.length - 1 ? 'destructive' : 'ghost'}
            size={'icon-sm'}
            key={action.identifier}
            onClick={action.action}
          >
            {action.icon}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default TitleBar
