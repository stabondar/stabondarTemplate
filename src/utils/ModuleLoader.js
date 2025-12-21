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
            // const updateNavPromise = import('./UpdateNav.js').then((module) => new module.default(main, this.app))
            // const atTopPromise = import('./AtTop.js').then((module) => new module.default(main, this.app))

            const elements = main.querySelectorAll('[data-module]')

            if (elements.length < 1) return

            const modulePromises = []

            elements.forEach((element) =>
            {
                const moduleName = element.getAttribute('data-module')
                const values = moduleName.split(' ')

                for (const value of values)
                {
                    if (!value || value.trim() === '') continue

                    const modulePromise = import(`@modules/${value}.js`).then(
                        (module) => new module.default(element, this.app, main)
                    )
                    modulePromises.push(modulePromise)
                }
            })

            await Promise.all([...modulePromises, updateNavPromise, atTopPromise])
        }
        catch (error)
        {
            console.warn(`Error loading modules: ${error.message}`)
        }
    }
}
