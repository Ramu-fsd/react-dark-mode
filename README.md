# React Dark Mode Toggle

A responsive dark/light theme toggle built with React, TypeScript, and Vite. This learning project follows production-minded conventions: typed state, accessible controls, CSS design tokens, documented quality checks, and clear separation between implemented features and planned work.

> **Status:** Learning and portfolio project. The current implementation switches between light and dark themes and persists the selected theme in browser `localStorage`. It is not a production business system.

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Technology stack](#technology-stack)
- [Prerequisites](#prerequisites)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [Implementation notes](#implementation-notes)
- [Quality checks](#quality-checks)
- [Accessibility and responsive design](#accessibility-and-responsive-design)
- [Security and privacy](#security-and-privacy)
- [Git workflow](#git-workflow)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Overview

The application demonstrates how React state can drive UI appearance and how a small user preference can be persisted across browser sessions.

## Features

### Implemented

- Toggle between light and dark themes.
- Apply theme colors through CSS custom properties (design tokens).
- Persist the selected theme in `localStorage`.
- Restore the saved theme when the app initializes.
- Update the document root's `data-theme` attribute.
- Use TypeScript to restrict theme values to `'light' | 'dark'`.
- Provide an accessible button label and `aria-pressed` state.
- Responsive layout and reduced-motion styling.

### Planned, not yet implemented

- Automated component and interaction tests.
- Continuous integration (CI) workflow.
- Deployment and a live demo.
- Cross-tab theme synchronization.
- Operating-system theme preference as the initial default.

## Technology stack

| Technology | Purpose |
| --- | --- |
| React | Component-based UI |
| TypeScript | Static type checking |
| Vite | Development server and production bundling |
| ESLint | Static analysis and code-quality rules |
| CSS | Responsive layout and theme design tokens |
| `localStorage` | Persist the theme preference |
| npm | Dependency management and scripts |
| Git and GitHub | Version control and source hosting |

## Prerequisites

Install Node.js compatible with this project's Vite version, npm, Git, and a modern browser.

Verify the tools:

```bash
node --version
npm --version
git --version
```

## Getting started

### 1. Clone the repository

Replace `YOUR-USERNAME` with your GitHub username:

```bash
git clone https://github.com/YOUR-USERNAME/react-dark-mode.git
cd react-dark-mode
```

If the project already exists locally, open a terminal in that directory instead.

### 2. Install dependencies

```bash
npm ci
```

`npm ci` installs from `package-lock.json`. If no lockfile exists yet, run `npm install` once and commit the generated lockfile.

### 3. Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite, typically `http://localhost:5173/`.

### 4. Build for production

```bash
npm run build
```

The production assets are generated in `dist/`. Do not commit generated build output.

### 5. Preview the production build

```bash
npm run preview
```

This is for local verification, not production hosting.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npx tsc -b` | Run TypeScript project build/type checks |
| `npm run build` | Run configured build and generate production assets |
| `npm run preview` | Preview the production build locally |

The exact scripts are defined in `package.json`. Keep this table aligned with that file if scripts change.

## Project structure

The default Vite template may vary slightly by version. Main files are expected to resemble:

```text
react-dark-mode/
├── public/             # Static assets
├── src/
│   ├── App.tsx         # Theme state and UI
│   ├── App.css         # Theme tokens and component styles
│   ├── index.css       # Global styles
│   └── main.tsx        # React entry point
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig*.json
├── vite.config.ts
└── README.md
```

Do not commit `node_modules/`, `dist/`, local secret files, or editor-specific temporary files.

## Implementation notes

### Typed theme state

```tsx
type Theme = 'light' | 'dark';
```

This restricts the theme to two supported values.

### Lazy state initialization

```tsx
const [theme, setTheme] = useState<Theme>(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark' ? 'dark' : 'light';
});
```

This reads the saved preference when the component initializes. Because it uses browser APIs, server-side rendering would require a guarded storage-access and initial-theme strategy.

### Synchronizing the theme

```tsx
useEffect(() => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}, [theme]);
```

React state controls the rendered theme; the effect synchronizes it with browser-side effects.

### CSS design tokens

CSS custom properties such as `--background`, `--surface`, `--text`, and `--border` centralize theme colors. Changing the root `data-theme` attribute changes these values without duplicating component styles.

## Quality checks

Run before submitting a change:

```bash
npm run lint
npx tsc -b
npm run build
```

As automated tests are added, cover at least:

- Light theme when no saved preference exists.
- Restoration of a saved dark preference.
- Theme switching on button click.
- Correct document root `data-theme`.
- Persistence in `localStorage`.
- Correct accessible label and `aria-pressed` value.

These tests are planned unless a test framework and test files have been added.

## Accessibility and responsive design

- Use a native button for the theme action.
- Keep the accessible label and `aria-pressed` state accurate.
- Ensure keyboard users can focus and activate the control.
- Preserve a visible focus indicator.
- Maintain readable contrast in both themes.
- Respect reduced-motion preferences.
- Test narrow and wide viewports.

## Security and privacy

The app stores only a non-sensitive display preference (`light` or `dark`) in browser storage. Do not store passwords, access tokens, session secrets, or sensitive personal information in `localStorage`.

Never commit secrets. Client-side variables exposed through Vite (including variables prefixed with `VITE_`) must be treated as public.

Review dependency updates and resolve peer-dependency conflicts deliberately rather than reflexively using `--force` or `--legacy-peer-deps`.

## Git workflow

Use focused commits and inspect changes before committing:

```bash
git status
git diff
git add src/App.tsx src/App.css src/index.css README.md
git commit -m "feat: add persistent dark mode toggle"
git push
```

Adjust the `git add` paths to match the files actually changed. For a feature-branch workflow, create a short-lived branch, open a pull request, run quality checks, and merge through repository rules.

Suggested commit messages:

- `feat: add persistent theme toggle`
- `style: improve theme contrast and responsiveness`
- `test: cover theme toggle behavior`
- `docs: document setup and quality checks`

## Known limitations

- The app assumes a browser because it uses `localStorage` and `document`.
- The current implementation does not provide a fallback if browser storage is unavailable.
- Theme changes in other tabs are not synchronized.
- Automated tests, CI, and deployment are not configured yet.
- This is a learning project, not a production service.

## Roadmap

- [ ] Add component and interaction tests with Vitest and React Testing Library.
- [ ] Add GitHub Actions checks for linting, type checking, tests, and build.
- [ ] Handle storage access failures gracefully.
- [ ] Consider cross-tab synchronization using the `storage` event.
- [ ] Consider the operating-system theme when no preference is saved.
- [ ] Deploy the app and add a verified live-demo URL.
- [ ] Add screenshots after the UI is finalized.

## Contributing

1. Create a branch for one focused change.
2. Keep changes small and explain behavior changes.
3. Run linting, TypeScript checks, tests (when configured), and the production build.
4. Update tests and documentation when behavior changes.
5. Open a pull request describing the change and verification performed.

## License

No license has been selected. Unless a license is added to the repository, others should not assume they have permission to reuse, modify, or redistribute this code. Choose an appropriate license and add a `LICENSE` file if you intend to grant reuse permissions.
