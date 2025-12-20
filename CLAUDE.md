# Project Guidelines for [PROJECT_NAME]

## Overview
This is a Vite-based JavaScript project designed to integrate with Webflow. The codebase provides custom animations, page transitions, and interactive components that are loaded into Webflow pages via an embed script.

## Build Commands
- `npm run dev` - Start development server (port 4321)
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build (port 8080)
- `npm run clean` - Remove dist folder
- `npm run deploy` - Deploy to Vercel
- `npm run format` - Auto-format code with Prettier
- `npm run format:check` - Check code formatting

## Code Style Guidelines

### Module System
- ES modules with import/export
- Use path aliases for imports (@utils, @modules, @pages, etc.)

### Naming Conventions
- **PascalCase**: Classes (Accordion, EventEmitter, ModuleLoader)
- **camelCase**: Methods, variables, and file names for utilities
- **PascalCase files**: Module and class files (Accordion.js, Button.js)

### Formatting
- 4-space indentation
- Braces on new lines (Allman style)
- Single quotes in JavaScript
- No semicolons
- 120 character line width

### Import Organization
```javascript
// External imports first
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Internal imports with path aliases
import EventEmitter from '@utils/EventEmitter'
import { RestartWebflow } from '@utils/RestartWebflow'
```

### Error Handling
- Console logs for debugging
- Early returns for guard clauses
- Check `this.destroyed` flag before operations in lifecycle methods

## Project Structure

```
src/
├── app.js                 # Core application singleton
├── main.js                # Entry point
├── css/                   # SCSS styles
│   ├── style.scss         # Main stylesheet
│   ├── root.scss          # CSS variables
│   ├── editor.scss        # Webflow editor styles
│   └── modules/           # Component-specific styles
├── modules/               # Reusable UI components
├── pages/                 # Page-specific components
│   └── [page-name]/
│       ├── index.js       # Page class
│       └── Loader.js      # Page loader (optional)
├── transitions/           # Barba.js page transitions
│   ├── CheckPages.js      # Page router/dispatcher
│   ├── GlobalLoader.js    # Initial page load
│   ├── Enter.js           # Transition enter animation
│   └── Leave.js           # Transition leave animation
└── utils/                 # Utility classes
    ├── EventEmitter.js    # Custom pub/sub system
    ├── ModuleLoader.js    # Dynamic module loader
    ├── Scroll.js          # Lenis smooth scroll
    ├── RestartWebflow.js  # Webflow restart handler
    └── ...
```

## Module Pattern

Modules are reusable UI components loaded via `data-module` attribute.

### Usage in HTML
```html
<div data-module="Accordion">...</div>
<div data-module="Accordion Slider">Multiple modules</div>
```

### Module Structure
```javascript
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class ModuleName
{
    constructor(instance, app, main)
    {
        this.instance = instance  // DOM element with data-module
        this.app = app            // App singleton (EventEmitter)
        this.main = main          // Page container element

        this.destroyed = false

        this.init()
        this.app.on('resize', () => this.resize())
        this.app.on('destroy', () => this.destroy())
    }

    init()
    {
        // Initialize module
        // Query DOM elements, set up event listeners
    }

    resize()
    {
        if (this.destroyed) return

        // Handle viewport resize
        // Recalculate dimensions, refresh ScrollTrigger
    }

    destroy()
    {
        if (this.destroyed) return

        this.destroyed = true
        // Clean up: remove listeners, kill animations
    }
}
```

### Key Events
- `resize` - Viewport resize (debounced)
- `destroy` - Page transition cleanup
- `tick` - Animation frame (use sparingly)

## Page Pattern

Pages are loaded based on `data-transition-page` attribute in Webflow.

### HTML Structure
```html
<main data-barba="container" data-transition-page="home">
    ...
</main>
```

### Page Class Structure
```javascript
export default class PageName
{
    constructor(app, main)
    {
        this.app = app
        this.main = main
    }

    triggerLoad()
    {
        // Called when page is ready
        // Initialize page-specific logic
    }
}
```

## Webflow Integration

### Embed Script (index.html)
Add this to Webflow's custom code (before </body>):

```html
<script defer>
    let prodLink = '[YOUR_PRODUCTION_URL]/'
    let ngrokEnv = '[YOUR_NGROK_URL]/'
    let localEnv = 'http://localhost:4321/'
    let allowNgrok = false

    let isWebflow = window.location.href.includes('webflow.io')

    function loadScript(e) {
        return new Promise((r, l) => {
            let t = document.createElement("script")
            t.src = e
            t.type = "module"
            t.onload = r
            t.onerror = l
            document.head.appendChild(t)
        })
    }

    function loadStyles(e) {
        return new Promise((r, l) => {
            let t = document.createElement("link")
            t.rel = "stylesheet"
            t.href = e
            t.onload = r
            t.onerror = l
            document.head.appendChild(t)
        })
    }

    function loadProdResources() {
        Promise.all([
            loadStyles(`${prodLink}index.css`),
            loadScript(`${prodLink}app.js`)
        ]).catch(e => {
            console.error("Failed to load production resources:", e)
        })
    }

    if (isWebflow) {
        // In Webflow editor/preview: try local first, fallback to production
        fetch(`${localEnv}src/main.js`)
            .then(e => {
                if (e.ok) {
                    console.log("Loading from localhost")
                    return loadScript(e.url)
                }
            })
            .catch(e => {
                console.log("Localhost not available, loading production")
                loadProdResources()
            })
    } else {
        loadProdResources()
    }
</script>
```

### RestartWebflow Utility
Call after Barba.js page transitions to reinitialize Webflow interactions:

```javascript
import { restartWebflow } from '@finsweet/ts-utils'

export const RestartWebflow = async (data) =>
{
    window.Webflow ||= []
    window.Webflow.push(async () =>
    {
        restartWebflow()
    })
}
```

### Editor Styles (editor.scss)
Hide loaders and show content in Webflow editor:

```scss
html.w-editor {
    main, nav { visibility: visible !important; }
    .loader { display: none !important; }
}
```

## Vite Configuration Template

```javascript
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    base: '[YOUR_PRODUCTION_URL]/',
    resolve: {
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@modules': path.resolve(__dirname, 'src/modules'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@styles': path.resolve(__dirname, 'src/css'),
            '@transitions': path.resolve(__dirname, 'src/transitions'),
        },
    },
    build: {
        minify: true,
        manifest: true,
        rollupOptions: {
            input: 'index.html',
            output: {
                dir: path.resolve(__dirname, 'dist'),
                format: 'es',
                chunkFileNames: '[name]-[hash].js',
                entryFileNames: 'app.js',
                assetFileNames: '[name].[ext]',
            },
        },
    },
    server: {
        port: 4321,
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        },
        allowedHosts: ['[YOUR_NGROK_SUBDOMAIN].ngrok.app'],
    },
    preview: {
        port: 8080,
        strictPort: true,
    },
})
```

## Key Technologies
- **Bundler**: Vite
- **Page Transitions**: Barba.js
- **Smooth Scroll**: Lenis
- **Animation**: GSAP + ScrollTrigger
- **Webflow Utils**: @finsweet/ts-utils
- **Styles**: SCSS

## Common Debugging Tips

### Script not loading in Webflow
1. Check browser console for CORS errors
2. Verify `npm run dev` is running on port 4321
3. Check that `allowedHosts` in vite.config.js includes your ngrok domain
4. Ensure production URL in embed script matches your deployed app

### Animations not working after page transition
- Call `RestartWebflow()` in Barba.js `after` hook
- Refresh ScrollTrigger: `ScrollTrigger.refresh()`
- Check that modules have proper `destroy()` cleanup

### Local dev not connecting
1. Run `npm run dev` to start local server
2. If using ngrok, set `allowNgrok = true` in embed script
3. Check that your ngrok tunnel is active and URL matches config

### Webflow interactions conflicting
- Use `html.w-editor` selector to disable custom behavior in editor
- Check for duplicate event listeners
- Ensure Webflow IX2 interactions don't target same elements

### Build issues
- Run `npm run clean` before building
- Check that all imports use correct path aliases
- Verify GSAP plugins are registered before use
