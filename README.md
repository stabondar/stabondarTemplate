# Stabondar Template

A modern web development template built with Vite for creating dynamic websites with smooth page transitions and animations.

## Features

- Seamless page transitions using Barba.js
- Smooth scrolling with Lenis
- GSAP animations with premium plugins (bonus package)
- Dynamic module loading system
- Responsive design support
- ThreeJS integration for WebGL/3D elements
- Hot module replacement in development
- Production-ready build optimization

## Technologies

- **Frontend Architecture**: Custom modular JavaScript with class-based components
- **Bundler**: Vite 6.1+
- **Animation**: GSAP (GreenSock Animation Platform)
- **Page Transitions**: Barba.js
- **Smooth Scrolling**: Lenis
- **3D/WebGL**: Three.js
- **CSS Preprocessor**: Sass
- **Deployment**: Vercel
- **Code Quality**: ESLint with Prettier

## Project Structure

```
/
├── index.html          # Main HTML entry point
├── src/
│   ├── app.js          # Core application logic
│   ├── main.js         # JavaScript entry point
│   ├── css/            # SCSS stylesheets
│   │   ├── modules/    # Component-specific styles
│   │   └── style.scss  # Main stylesheet
│   ├── modules/        # Reusable UI components
│   ├── pages/          # Page-specific components
│   ├── transitions/    # Page transition definitions
│   └── utils/          # Utility classes and helpers
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
   The site will be available at http://localhost:4321

## Development Workflow

- **Development**: `npm run dev` - Start Vite dev server with HMR
- **Build**: `npm run build` - Create optimized production build
- **Preview**: `npm run preview` - Preview production build locally
- **Lint**: `npm run lint:fix` - Fix code style issues with ESLint
- **Clean**: `npm run clean` - Remove dist directory
- **Deploy**: `npm run deploy` - Deploy to Vercel

## Working with Modules

Modules are reusable components that can be attached to HTML elements. They follow a standardized structure:

1. **HTML Structure**: Add the `data-module` attribute to any element
   ```html
   <div data-module="Accordion">
     <!-- Module content here -->
   </div>
   ```

2. **Multiple Modules**: Attach multiple modules by separating with spaces
   ```html
   <div data-module="Accordion Slider">
     <!-- Will load both Accordion.js and Slider.js -->
   </div>
   ```

3. **Creating Modules**: Create modules as classes in `src/modules/`
   ```javascript
   // src/modules/MyModule.js
   export default class MyModule {
     constructor(element, main, app) {
       this.element = element;  // The element with data-module
       this.main = main;        // The main container
       this.app = app;          // The app instance
       
       this.init();
       this.app.on('resize', () => this.resize());
       this.app.on('destroy', () => this.destroy());
     }
     
     init() {
       // Initialize module
     }
     
     resize() {
       // Handle resize events
     }
     
     destroy() {
       // Clean up when module is destroyed
     }
   }
   ```

## Working with Pages

Pages represent different content views with their own components and logic:

1. **Page Structure**: Add page identifier to main container
   ```html
   <main data-transition-page="home">
     <!-- Page content here -->
   </main>
   ```

2. **Creating Pages**: Create pages in `src/pages/[pageName]/index.js`
   ```javascript
   // src/pages/about/index.js
   export default class index {
     constructor(main, app) {
       this.main = main;
       this.app = app;
       
       this.triggerLoad = async () => this.load();
     }
     
     load() {
       // Initialize page-specific components
     }
   }
   ```

3. **Add to Router**: Update `CheckPages.js` with the new page
   ```javascript
   // src/transitions/CheckPages.js
   case 'about':
   {
     const mod = await import('@pages/about');
     return app.page = new mod.default(main, app);
   }
   ```

4. **Transitions**: Pages work with Barba.js transitions defined in the transitions folder

## Working with CSS/SCSS

The project uses SCSS for styling with a modular architecture:

1. **Main Style Files**:
   - `src/css/style.scss`: Main entry point that imports all other styles
   - `src/css/root.scss`: Global CSS variables and root-level styles
   - `src/css/editor.scss`: Webflow editor-specific styles

2. **Module Styling**:
   - Create module-specific styles in `src/css/modules/[moduleName].scss`
   - Import new modules in `style.scss`:
     ```scss
     // style.scss
     @import './modules/myModule.scss';
     ```

## Key Components

- **EventEmitter**: Custom pub/sub event system
- **Scroll**: Smooth scrolling implementation with Lenis
- **ModuleLoader**: Dynamic component loading and initialization
- **GSAP Integration**: Animation utilities with timeline management
- **Page Transitions**: Custom transition schemas with Barba.js