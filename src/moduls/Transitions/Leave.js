import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import App from '../../App'

gsap.registerPlugin(ScrollTrigger)

export default class Leave
{
    constructor(container, done)
    {
        const app = new App()
        const scroll = app.scroll.lenis

        gsap.to(container, {opacity: 1, duration: 0.3})

        let loader = $('.loader')
        let body = $('body')

        body.removeClass('burger-open')

        loader.addClass('loading')

        const scrollTo = () => scroll.scrollTo(0, {offset: 0, duration: 0.1, immediate: true})
        const complete = () => { done(), scrollTo(), ScrollTrigger.killAll() }

        scroll.start()

        let tl = gsap.timeline({defaults: {duration: 1.2, ease: 'power4'}})
        tl.fromTo(loader, {clipPath: 'inset(100% 0 0 0)'}, {clipPath: 'inset(0% 0 0 0)', onComplete: () => complete})

    }
}