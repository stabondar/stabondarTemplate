export const CheckPages = async (app, main) =>
{
    const container = main ? main : document.querySelector('main')
    const page = container.getAttribute('data-transition-page')

    switch(page)
    {
        case 'home':
            return await import('@pages/home').then(module => new module.default(main, app))
    }
}