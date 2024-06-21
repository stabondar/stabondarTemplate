export default class ModuleLoader
{
    constructor(app)
    {
        this.app = app
    }

    async loadModules()
    {
        try
        {
            // const getRatio = await import('./utils/GetRatio.js').then(module => new module.default())
            const titles = await import('./utils/Title.js').then(module => new module.default(this.app))
            const batch = await import('./utils/Batch.js').then(module => new module.default())
            const atTop = await import('./utils/AtTop.js').then(module => new module.default())
            const parallaxImages = await import('./utils/ParallaxImages.js').then(module => new module.default())

            const elements = document.querySelectorAll('[data-module]')
            elements.forEach(async (element) =>
            {
                const moduleName = element.getAttribute('data-module')
                const values = moduleName.split(' ')
                for(const value of values)
                {
                    const module = await import(`./modules/${value}.js`)
                        .then(module => new module.default(element, this.app))
                }
            })
        } catch (error)
        {
            console.warn(`Error loading modules: ${error.message}`);
        }
    }

    async loadPageScripts()
    {
        try
        {
            const elements = document.querySelectorAll('[data-transition-page]')
            elements.forEach(async (element) =>
            {
                const moduleName = element.getAttribute('data-transition-page')

                const module = await import(`./pages/${moduleName}.js`)
                .then(module => new module.default(element, this.app))
            })
        } catch (error)
        {
            console.warn(`Error loading page scripts: ${error.message}`);
        }
    }

    init()
    {
        this.loadPageScripts() // Load initial page-specific scripts
        this.loadModules() // Load all generic modules
    }
}