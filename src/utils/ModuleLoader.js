export default class ModuleLoader
{
    constructor(app)
    {
        this.app = app
    }

    async loadModules(main)
    {
        try
        {
            // const test = await import('./utils/Test.js').then(module => new module.default(this.app))

            const elements = main.querySelectorAll('[data-module]')

            if(elements.length < 1) return

            elements.forEach(async (element) =>
            {
                const moduleName = element.getAttribute('data-module')
                const values = moduleName.split(' ')
                for(const value of values)
                {
                    const module = await import(`@modules/${value}.js`)
                        .then(module => new module.default(element, main, this.app))
                }
            })
        } catch (error)
        {
            console.warn(`Error loading modules: ${error.message}`);
        }
    }
}