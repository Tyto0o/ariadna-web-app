# Ariadna 3D - Frontend Application 🎨

The Ariadna 3D Frontend is the interactive visualization interface of the system. It provides real-time 3D rendering of warehouse environments, robot positioning, and control dashboard for monitoring autonomous fleet operations.

## 🔗 Project Scope

This repository contains the frontend part of the Ariadna project.

Backend repository:
[Ariadna Backend](https://github.com/Tyto0o/ariadna-backend)

Application demo video:
[Watch on YouTube](https://youtu.be/2recnEP32AI)

[![Ariadna App Demo](https://img.youtube.com/vi/2recnEP32AI/hqdefault.jpg)](https://youtu.be/2recnEP32AI)

## 🎯 Key Features

- **3D Warehouse Visualization**: Real-time rendering of warehouse layouts using Three.js with interactive camera controls.
- **Robot Fleet Monitoring**: Live tracking of robot positions, status, and telemetry data.
- **Material Design UI**: Modern, responsive interface built with Material-UI (MUI) components.
- **Path Visualization**: Display of computed pathfinding routes and robot trajectories.
- **Control Dashboard**: Intuitive interface for warehouse management and robot control.
- **Real-time Updates**: WebSocket integration for live data synchronization with backend.

## 🛠 Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **3D Graphics**: Three.js
- **UI Library**: Material-UI (MUI) with Emotion
- **Code Quality**: ESLint + Prettier with Husky pre-commit hooks

## 🚀 Quick Start

### Prerequisites

- Node.js (v20 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd ariadna-web-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables** (if needed)

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```

### Running the Application

#### Development Mode

```bash
npm run dev
```

The application will be available at [http://localhost:5173](http://localhost:5173)

#### Production Build

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript and create production bundle
- `npm run preview` - Preview production build locally
- `npm run lint` - Check code for errors with ESLint
- `npm run lint:fix` - Fix ESLint errors automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 📁 Project Structure

```
ariadna-web-app/
├── src/
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   ├── index.css           # Global styles
│   └── vite-env.d.ts       # Vite type definitions
├── .husky/
│   └── pre-commit          # Pre-commit hook
├── public/                 # Static assets
├── .env                    # Environment variables (create this)
├── eslint.config.js        # ESLint configuration (flat config)
├── .prettierrc             # Prettier configuration
├── .prettierignore         # Prettier ignore patterns
├── .gitignore
├── index.html              # HTML entry point
├── package.json
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript config for Node scripts
├── vite.config.ts          # Vite configuration
└── README.md
```

## 🧑‍💻 Development

The development server uses Vite's Hot Module Replacement (HMR) for instant updates. Any changes to source files will be reflected immediately in the browser.

### Code Quality

This project uses ESLint + Prettier for code quality and formatting.

**ESLint** - Code linting and error detection:

```bash
# Check for errors
npm run lint

# Fix errors automatically
npm run lint:fix
```

**Prettier** - Code formatting:

```bash
# Format all files
npm run format

# Check formatting
npm run format:check
```

**Pre-commit Hooks** - Automatic code quality checks:

- Husky automatically runs before each commit
- lint-staged checks only modified `.ts` and `.tsx` files
- ESLint fixes errors → Prettier formats code
- Commit is blocked if there are unfixable errors

Configuration files:

- `eslint.config.js` - ESLint rules (ESLint v9 flat config)
- `.prettierrc` - Prettier configuration
- `.husky/pre-commit` - Pre-commit hook
- `package.json` - lint-staged configuration

## 🎨 UI Components

The application uses Material-UI (MUI) with the following setup:

- **Emotion**: CSS-in-JS styling solution
- **Theme Customization**: Configurable theme for consistent design
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG-compliant components

## 🌐 API Integration

Configure the backend API URL in your `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Access environment variables in your code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## 🛡️ Troubleshooting

### Port already in use

Vite uses port 5173 by default. To change it, modify `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    port: 3001,
  },
});
```

### TypeScript compilation errors

Ensure all dependencies are installed:

```bash
npm install
```

Clear the Vite cache:

```bash
rm -rf node_modules/.vite
npm run dev
```

### Three.js rendering issues

Make sure you have the correct Three.js types installed:

```bash
npm install --save-dev @types/three
```

### Build failures

Clean and rebuild:

```bash
rm -rf dist node_modules/.vite
npm run build
```

## 📝 Environment Variables

| Variable       | Description     | Default                 |
| -------------- | --------------- | ----------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:3000` |

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Deploy to Static Hosting

The built application can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Azure Static Web Apps

Example for Vercel:

```bash
npm install -g vercel
vercel --prod
```

## 📦 Dependencies

### Main Dependencies

- `react` & `react-dom` - UI framework
- `@mui/material` - Material Design components
- `@emotion/react` & `@emotion/styled` - CSS-in-JS
- `three` - 3D graphics library

### Dev Dependencies

- `typescript` - Type safety
- `vite` - Build tool and dev server
- `eslint` - Code linting
- `prettier` - Code formatting
- `husky` & `lint-staged` - Pre-commit hooks

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Ensure tests pass and code is formatted
4. Submit a pull request

Pre-commit hooks will automatically run to ensure code quality.
