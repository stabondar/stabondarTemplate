import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Scroll 
{
    constructor()
    {
        this.lenis = new Lenis(
        {
            duration: 1.4,
            easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical', // vertical, horizontal
            gestureDirection: 'vertical', // vertical, horizontal, both
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1.6,
            smoothTouch: false,
        })

        ScrollTrigger.addEventListener('refresh', () => this.lenis.resize())

        this.lenis.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time)=>
        {
            this.lenis.raf(time * 1000)
        })

        gsap.ticker.lagSmoothing(0)
    }
}