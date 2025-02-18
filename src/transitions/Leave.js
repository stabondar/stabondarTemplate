import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Leave
{
    constructor(data, done, app)
    {
        this.app = app
        this.container = data.current.container
        this.scroll = this.app.scroll.lenis

        this.scroll.stop()

        gsap.to(this.container, {autoAlpha: 0, onComplete: () =>
        {
            ScrollTrigger.killAll()
            done()

            this.app.trigger('destroy')
            this.app.onceCompleted = true

            this.app.scroll.destroy()
            window.scrollTo(0, 0)
        }})
    }
}