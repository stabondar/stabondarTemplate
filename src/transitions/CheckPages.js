export const CheckPages = async (app, main) =>
{
    const container = main ? main : document.querySelector('main')
    const page = container.getAttribute('data-transition-page')

    switch(page)
    {
        case 'home':
        {
            const mod = await import('@pages/home')
            return app.page = new mod.default(main, app)
        }
    }
}