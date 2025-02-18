import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Enter
{
    constructor(data, checkPages, app)
    {
        this.app = app
        this.container = data.next.container
        this.checkPages = checkPages

        this.app.scroll.init()

        this.tl = gsap.timeline({defaults: {duration: 0.8 , ease: 'power2.inOut'}, onStart: () => this.start()})

        this.tl.fromTo(this.container, {autoAlpha: 0}, {autoAlpha: 1, onComplete: () => this.complete()})

    }

    complete()
    {
        // this.loader.classList.add('hidden')
    }

    start()
    {
        this.app.moduleLoader.loadModules(this.container)
        this.checkPages(this.app, this.container)

        ScrollTrigger.refresh()
    }
}