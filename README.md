# M8Mouse

A modern Electron application for configuring M8 Mouse settings including DPI modes, LED effects, and thumb key bindings.

![M8Mouse](https://img.shields.io/badge/version-0.0.1--beta-blue) ![Electron](https://img.shields.io/badge/Electron-33.0.0-blue) ![React](https://img.shields.io/badge/React-18.3.1-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue)

## Features

- **DPI Settings**: Configure mouse sensitivity with multiple preset modes (500, 1200, 2000, 2400, 4000, 4800 DPI)
- **LED Settings**: Customize LED effects including DPI indicator, Multicolour, Rainbow, Flow, Waltz, Four Seasons, and Off modes
- **LED Speed Control**: Adjust LED animation speed with 8 different speed levels
- **Thumb Key Bindings**: Configure custom thumb button actions (coming soon)
- **Modern UI**: Clean, responsive interface built with React and TailwindCSS
- **Dark/Light Theme**: Built-in theme support with system preference detection
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Supported Mouse Modes

### DPI Resolution Modes

- Mode 1: 500 DPI
- Mode 2: 800 DPI
- Mode 3: 1000 DPI
- Mode 4: 1200 DPI
- Mode 5: 1600 DPI
- Mode 6: 2000 DPI
- Mode 7: 2400 DPI
- Mode 8: 3200 DPI
- Mode 9: 4000 DPI
- Mode 10: 4800 DPI
- Mode 11: 6400 DPI
- Mode 12: 8000 DPI

### LED Effect Modes

- Mode 1: DPI Indicator
- Mode 2: Multicolour
- Mode 3: Rainbow
- Mode 4: Flow
- Mode 5: Waltz
- Mode 6: Four Seasons
- Mode 7: Off

## Tech Stack

- **Frontend**: React 18.3.1 with TypeScript
- **UI Framework**: Radix UI components with TailwindCSS
- **Desktop App**: Electron 33.0.0
- **Build Tool**: Vite
- **Package Manager**: pnpm

## Project Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Clone the repository
git clone https://github.com/venkatmidhunmareedu/m8mouse.git
cd m8mouse

# Install dependencies
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# The application will open in a new window
```

### Building

```bash
# Build for Windows
pnpm build:win

# Build for macOS
pnpm build:mac

# Build for Linux
pnpm build:linux

# Build for all platforms
pnpm build
```

### Distribution

```bash
# Create distributable packages
pnpm dist

# Create distributable for specific platform
pnpm dist:win
pnpm dist:mac
pnpm dist:linux
```

## Project Structure

```
m8mouse/
├── src/
│   ├── main/                 # Electron main process
│   ├── preload/              # Preload scripts
│   └── renderer/             # React frontend
│       └── src/
│           ├── components/   # React components
│           ├── lib/          # Utilities and constants
│           └── assets/       # Static assets
├── external/                 # External dependencies
└── docs/                     # Documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Issues

If you encounter any issues or have feature requests, please [open an issue](https://github.com/venkatmidhunmareedu/m8mouse/issues) on GitHub.

## Acknowledgments

- Built with [Electron](https://www.electronjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
