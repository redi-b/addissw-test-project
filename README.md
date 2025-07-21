# Song Manager App

This project is a full-stack single-page application (SPA) for managing a collection of songs through a clean and responsive interface built with React and TypeScript. It enables users to view, create, update, and delete songs via a REST API. Key features include a paginated song list, modal-based dynamic forms, and a themeable UI. 

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Webpack Configuration](#webpack-configuration)
- [Backend API](#backend-api)
- [AI Usage](#ai-usage)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Performance Optimizations](#performance-optimizations)

## Features
- **Paginated Song List**: Browse songs (title, artist, album, year) with easy to use pagination controls synced to URL search parameters.
- **CRUD Operations**: Add, view, edit, and delete songs using modal forms that interact with a REST API.
- **Responsive Design**: Themeable UI with light and dark modes, styled using Emotion and Styled System for consistent appearance.
- **State Management**: Centralized state handled by Redux Toolkit and Redux-Saga for efficient API interactions and side effects.
- **Routing**: React Router manages the SPA layout and keeps pagination state synchronized with URL search params (e.g. `page`, `perPage`).

## Technologies
- **Frontend**:
  - React (Functional components with TypeScript)
  - Redux Toolkit + Redux-Saga (State and API side effects)
  - Emotion/Styled System (Theming and responsive styling)
  - React Router (SPA navigation and search param syncing)
  - Webpack (Custom build setup)
  - ts-loader (TypeScript compilation)
  - dotenv-webpack (Environment variable management)
- **Backend**:
  - Node.js/Express (Simple REST API)
- **Deployment**:
  - Frontend: Netlify
  - Backend: Heroku
- **Other Libraries/Tools**:
  - Lucide React (Icons with tree shaking)
  - Sonner (Toast notifications)
  - RadixUI Primitives (Modal and Dropdown)

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/redi-b/addissw-test-project.git
   cd addissw-test-project
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Up Environment Variables**:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update `.env` with the API base URL:
     ```env
     BASE_API_URL=http://localhost:3030
     ```
4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   - Access the app at `http://localhost:3000`.
5. **Build for Production**:
   ```bash
   npm run build
   ```
   - Output is generated in the `dist/` folder.

## Webpack Configuration
This project uses a custom Webpack setup to build and run a React application with TypeScript. The configuration handles TypeScript files, JSX/TSX, CSS, images, and fonts. It also includes support for environment variables, content hashing, and development features like hot reloading.

- **Entry**: `src/main.tsx`
- **Output**: Bundles to `dist/bundle.[contenthash].js` with cache-busting via content hashing.
- **Resolve**:
  - Extensions: `.tsx`, `.ts`, `.js`
  - Alias: `@` maps to `src/` for cleaner imports.
- **Loaders**:
  - `ts-loader`: Compiles TypeScript and JSX.
  - `css-loader` + `style-loader`: Processes CSS files.
  - `asset/resource`: Handles images (`.png`, `.jpg`, `.gif`, `.svg`) and fonts (`.woff`, `.woff2`, `.eot`, `.ttf`, `.otf`).
- **Plugins**:
  - `HtmlWebpackPlugin`: Generates `index.html` from a template.
  - `dotenv-webpack`: Loads environment variables (e.g. `BASE_API_URL`) from `.env`.
- **Dev Server**:
  - Serves static files from `public/`.
  - Enables hot reloading and SPA routing with `historyApiFallback`.
  - Runs on port `3000`.
- **Optimizations**:
  - Tree shaking enabled in production mode (e.g. for Lucide React icons).
  - Clean output directory before each build.
  - Content hashing for cacheable assets.

## Backend API
The backend is a lightweight Node.js/Express server hosted on Heroku, providing a REST API for song manager. The API supports pagination and standard CRUD operations:

| Method | Endpoint                | Description                     |
|--------|-------------------------|---------------------------------|
| GET    | `/`                     | Retrieve paginated list of songs |
| GET    | `/:id`                  | Retrieve a single song by ID    |
| POST   | `/`                     | Create a new song               |
| PUT    | `/:id`                  | Update an existing song         |
| DELETE | `/:id`                  | Delete a song                   |

The API is accessible at `BASE_API_URL` defined in the `.env` file.

## AI Usage

AI tools were used to assist with parts of the UI design and development process:

- **Theme Colors**: AI was used to generate suggestions for light and dark theme variants based on a base color palette. The final values were manually reviewed and adjusted for contrast and consistency.
- **Skeleton Loader Styling**: AI was used to explore gradient styles for skeleton loaders. Final choices were refined to match the app’s design.
- **Code Suggestions**: In some cases, AI was consulted for small UI improvements or quick solutions. All generated code was manually tested and reviewed before being included.


## Deployment
- **Frontend**: Hosted on Netlify at [Live Site](https://rediet-addissw.netlify.app)
- **Backend**: Deployed on Heroku

## Project Structure
```
addissw-test-project/
├── src/
│   ├── api/               # API call utilities (songs.ts)
│   ├── assets/            # Static assets (e.g. Inter-Variable.ttf font)
│   ├── components/        # Reusable components (e.g. SongCard, AddSongModal)
│   │   ├── ui/            # UI primitives (Button, Dropdown, Modal)
│   ├── contexts/          # Theme context for light/dark mode
│   ├── layouts/           # App layout with React Router
│   ├── pages/             # Page components (HomePage)
│   ├── store/             # Redux Toolkit store, slices, and sagas
│   ├── styles/            # Global CSS
│   ├── theme/             # Emotion theme config and styles
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── tsconfig.json          # TypeScript configuration
├── webpack.config.js      # Webpack configuration
├── .env.example           # Example environment variables
└── package.json           # Dependencies and scripts
```

## Performance Optimizations
- **Lazy Loading**: The `CreateSongForm` and `EditSongForm` components are lazy-loaded within modals using React's `lazy` and `Suspense`, reducing the initial bundle size.
- **Tree Shaking**: Enabled in production mode (`--mode production`) to eliminate unused code, particularly for Lucide React icons.
- **Code Splitting**: Webpack's dynamic imports support lazy loading, improving load times.
- **Content Hashing**: Output filenames include content hashes (`bundle.[contenthash].js`) for cache busting.