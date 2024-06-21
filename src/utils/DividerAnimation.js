import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class DividerAnimation
{
    constructor(elem)
    {
        let tl = gsap.timeline({paused: true, defaults: {duration: 1, ease: 'power3'}})

        tl.from(elem, {transformOrigin: 'left', scaleX: 0})

        ScrollTrigger.create(
        {
            trigger: elem, start: 'top 90%', onEnter: () => tl.play()
        })
    }
}