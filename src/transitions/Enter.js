import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import App from '../app'
import ModuleLoader from '../ModuleLoader'

gsap.registerPlugin(ScrollTrigger)

export default class Enter
{
    constructor(container)
    {
        this.app = new App()
        this.scroll = this.app.scroll.lenis

        gsap.set(container, {autoAlpha: 1})

        this.loader = document.querySelector('.loader')

        this.tl = gsap.timeline({defaults: {duration: 0.8 , ease: 'power2.inOut'}, onStart: () => this.update()})

        this.tl.to(this.loader, {opacity: 0, onComplete: () => this.complete()})

    }

    complete()
    {
        this.loader.classList.add('hidden')
    }

    update()
    {
        const moduleLoader = new ModuleLoader(this.app, this.app.logger)
        moduleLoader.loadModules()
        moduleLoader.loadPageScripts()

        ScrollTrigger.refresh()
        this.scroll.start()
        this.scroll.scrollTo(0, {offset: 0, duration: 0.1, immediate: true })
        this.scroll.resize()
    }
}