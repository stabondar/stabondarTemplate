import gsap from 'gsap'

export default class PageLoader
{
    constructor(container, loadComponents, app)
    {
        this.app = app

        this.container = container.container
        this.loadComponents = loadComponents

        this.loader = document.querySelector('.loader')

        this.main = document.querySelector('main')
        gsap.set(this.main, {autoAlpha: 1})

        // gsap.to(this.loader, {opacity: 0, onComplete: () =>
        // {
        //     this.loader.classList.add('hidden')
        // }})

        this.loadComponents()
    }
}