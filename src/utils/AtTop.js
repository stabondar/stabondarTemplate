import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class AtTop
{
    constructor()
    {
        const body = document.querySelector('body')
        body.classList.add('at-top')

        ScrollTrigger.create(
        {
            trigger: body, start: 'top top', end: '300 top',
            onLeave: () => body.classList.remove('at-top'),
            onEnterBack: () => body.classList.add('at-top'),
        })

        const footer = document.querySelector('footer')

        ScrollTrigger.create(
        {
            trigger: footer, start: 'top 300', end: 'top top',
            onEnter: () => body.classList.add('at-bottom'),
            onLeaveBack: () => body.classList.remove('at-bottom'),
        })
    }
}