import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import App from '../app'

gsap.registerPlugin(ScrollTrigger)

export default class Leave
{
    constructor(done)
    {
        this.app = new App()
        this.scroll = this.app.scroll.lenis

        this.scroll.stop()

        this.loader = document.querySelector('.loader')
        this.body = document.querySelector('body')

        this.loader.classList.remove('hidden')
        this.body.classList.remove('burger-open')

        gsap.to(this.loader, {opacity: 1, onComplete: () =>
        {
            ScrollTrigger.killAll()
            done()
        }})
    }
}