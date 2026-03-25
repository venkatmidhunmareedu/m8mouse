import { Mouse } from 'lucide-react'
import { ThemeProvider } from './components/theme-provider'
import TitleBar from './components/title-bar'
import Operations from './components/operations'
import StatusBar from './components/status-bar'
import { HIDProvider } from './hooks/use-hid'

function App(): React.JSX.Element {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <HIDProvider>
        <div className="flex flex-col h-screen w-screen items-center justify-center">
          <div className="flex flex-col h-full w-full">
            <TitleBar />
            <div className="flex flex-col h-full w-full justify-center items-center gap-2 select-none rounded-lg p-4">
              <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
                <Mouse /> <p>M8Mouse</p>
              </h1>
              <p className="text-sm text-muted-foreground">A Simple Mouse Key Control Editor</p>
              <div className="h-1/2 w-full">
                <Operations />
              </div>
            </div>
          </div>
          <StatusBar />
        </div>
      </HIDProvider>
    </ThemeProvider>
  )
}

export default App
