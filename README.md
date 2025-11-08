# Swift Flow AI

**AI-Native Business Process Automation Platform**

Swift Flow AI is a modern, enterprise-grade platform for automating business processes with AI-powered workflows, human-in-the-loop approvals, and seamless integrations.

![Swift Flow AI](public/logo.svg)

## ✨ Features

### Core Features
- 🤖 **AI-Powered Workflows** - Automate complex business processes with intelligent routing
- 👥 **Human-in-the-Loop** - Review and approval workflows for critical decisions
- 🔄 **Multi-Workspace Support** - Manage multiple organizations with role-based access
- 🎨 **Modern UI/UX** - Beautiful, responsive design with dark/light theme support
- ⚡ **Real-time Updates** - Live notifications and workflow status tracking
- 🔐 **Enterprise Security** - Secure authentication and authorization

### Technical Features
- 📱 **Progressive Web App** - Works seamlessly across devices
- 🎭 **Mock Service Worker** - Development mode with realistic API mocking
- 🎯 **Type-Safe** - Built with TypeScript for reliability
- 🚀 **Fast & Modern** - Powered by React 19, Vite, and modern web standards
- 🎨 **Theme System** - Customizable light/dark themes with smooth transitions
- 📊 **Analytics Ready** - Built-in tracking and monitoring capabilities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/swift-flow-ai/swift-flow-ai.git
cd swift-flow-ai
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
# With Mock Service Worker (recommended for development)
VITE_ENABLE_MSW=true npm run dev

# Or without MSW (requires backend)
npm run dev
```

4. **Open your browser**
```
http://localhost:5173
```

### Demo Credentials
```
Email: demo@swiftflow.ai
Password: demo123
```

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v3 with custom design system
- **State Management**: React Context + Custom Hooks
- **Data Fetching**: Axios + TanStack Query
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Custom components + Radix UI primitives

### Development Tools
- **Mocking**: MSW (Mock Service Worker)
- **Linting**: ESLint with React Hooks plugin
- **Type Checking**: TypeScript 5.9
- **Testing**: (Coming soon)

## 📁 Project Structure

```
swift-flow-ai/
├── public/                 # Static assets
│   ├── logo.svg           # Application logo
│   ├── favicon.svg        # Browser favicon
│   └── mockServiceWorker.js
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Generic components (Button, Input, etc.)
│   │   └── layout/       # Layout components (AppLayout, etc.)
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── WorkspaceContext.tsx
│   ├── hooks/            # Custom React hooks
│   ├── mocks/            # MSW handlers and mock data
│   │   ├── handlers/     # API endpoint mocks
│   │   └── data/         # Mock datasets
│   ├── pages/            # Page components
│   │   ├── auth/         # Login, Signup
│   │   ├── dashboard/    # Main dashboard
│   │   ├── workflows/    # Workflow management
│   │   ├── approvals/    # Approval inbox
│   │   └── settings/     # User settings
│   ├── services/         # API client services
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── config/           # App configuration
│   ├── App.tsx           # Root component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── index.html            # HTML template
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── vite.config.ts        # Vite config
└── tailwind.config.js    # Tailwind config
```

## 🎨 Design System

### Color Palette
- **Primary**: Emerald Green (#34d399 - #10b981)
- **Background**: Dark (#0a0a0a) / Light (#ffffff)
- **Card**: Dark blue-gray (#1f1f1f) / Off-white (#fafafa)
- **Border**: Subtle gray variants
- **Destructive**: Red (#ef4444)

### Theme Support
- **Dark Mode**: Default, optimized for low-light environments
- **Light Mode**: Clean, bright interface for well-lit spaces
- **System Mode**: Automatically follows OS preference

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# App Configuration
VITE_APP_NAME=Swift Flow AI

# MSW (Mock Service Worker)
VITE_ENABLE_MSW=true
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

### Deployment
The app can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3 + CloudFront
- GitHub Pages
- Firebase Hosting

## 🧪 Development

### Running with MSW (Recommended)
```bash
VITE_ENABLE_MSW=true npm run dev
```

This enables Mock Service Worker for realistic API responses without a backend.

### Connecting to Real Backend
```bash
# Update .env
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=https://your-api-url.com/api

npm run dev
```

### Linting
```bash
npm run lint
```

## 🗺️ Roadmap

### Phase 1: MVP (Current)
- ✅ Authentication & Authorization
- ✅ Multi-workspace support
- ✅ Dashboard with analytics
- ✅ Workflow list & execution
- ✅ Approval inbox & detail views
- ✅ User settings & theme switcher
- ✅ Mock API with MSW

### Phase 2: Enhanced Features
- 🔄 Visual workflow builder (drag & drop)
- 🔄 Integration marketplace
- 🔄 Advanced analytics & reporting
- 🔄 Team collaboration features
- 🔄 Real-time notifications via WebSocket
- 🔄 Workflow templates library

### Phase 3: Enterprise Features
- ⏳ SSO & Advanced authentication
- ⏳ Audit logs & compliance
- ⏳ Advanced security features
- ⏳ Custom branding & white-labeling
- ⏳ API documentation & webhooks
- ⏳ Mobile apps (iOS/Android)

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Standards
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ using modern web technologies
- Inspired by enterprise workflow automation platforms
- Icons by [Lucide](https://lucide.dev)
- Fonts by [Google Fonts](https://fonts.google.com)

## 📞 Support

- **Documentation**: Coming soon
- **Issues**: [GitHub Issues](https://github.com/swift-flow-ai/swift-flow-ai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/swift-flow-ai/swift-flow-ai/discussions)

## 🌟 Star Us!

If you find Swift Flow AI useful, please consider giving it a star on GitHub! ⭐

---

**Built with** ⚡ **by the Swift Flow AI Team**
