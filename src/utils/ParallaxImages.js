import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class ParallaxImages
{
    constructor()
    {
        this.images = document.querySelectorAll('[parallax-image]')
        if(this.images.length < 1) return

        this.init()
    }

    init()
    {
        this.images.forEach(image =>
        {
            const wrapperDiv = document.createElement('div')
            const parentEl = image.parentElement

            wrapperDiv.style.overflow = 'hidden'
            wrapperDiv.style.position = 'relative'

            parentEl.insertBefore(wrapperDiv, image)
            wrapperDiv.appendChild(image)

            gsap.fromTo(image,
            {
                yPercent: -10,
                scale: 1.1,
                transformOrigin: 'top center',
                transformStyle: 'preserve-3d'
            },
            {
                yPercent: 0,
                scrollTrigger:
                {
                    trigger: wrapperDiv,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                }
            })
        })
    }
}