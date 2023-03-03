import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Utils
{
    constructor()
    {
        gsap.set($('main'), {autoAlpha: 1})
        
        // Add class when page on top
        $('body').addClass('at-top')
        ScrollTrigger.create(
        {
            trigger: 'body', start: 'top top', end: '300 top',
            onLeave: () => $('body').removeClass('at-top'),
            onEnterBack: () => $('body').addClass('at-top'),
        })

        // get year
        let year = $('.year')
        year.text(new Date().getFullYear())
    }
}