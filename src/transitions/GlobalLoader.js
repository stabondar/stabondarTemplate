import gsap from 'gsap'

export default class GlobalLoader
{
    constructor(container, toLoad, app)
    {
        this.app = app
        this.toLoad = toLoad
        this.main = container.container

        // this.loader = document.querySelector('.loader')

        gsap.to([this.main, 'nav'], {autoAlpha: 1})

        // gsap.to(this.loader, {opacity: 0, onComplete: () =>
        // {
        //     this.loader.classList.add('hidden')
        // }})

        this.load()
    }

    async load()
    {
        await this.toLoad(this.main, this.app)
        await this.app.page.triggerLoad()
    }
}