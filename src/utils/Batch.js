import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Batch
{
    constructor()
    {
        this.sections = document.querySelectorAll('section')
        if(this.sections.length == 0) return

        this.batchFadeIn()
    }

    batchFadeIn()
    {
        this.sections.forEach(section =>
        {
            let items = [...section.querySelectorAll('[batch]'), ...section.querySelectorAll('.btn[scroll-animate="true"]')]

            if (items.length == 0) return

            items = items.filter(item => !item.hasAttribute('data-scrolltrigger-applied'))
            gsap.set(items, { opacity: 0 })

            const defaultDuration = 0.6

            items.forEach(item =>
            {
                const durationVal = item.getAttribute('batch-animation-dur') ? parseFloat(item.getAttribute('batch-animation-dur')) : defaultDuration
                ScrollTrigger.create(
                {
                    trigger: item,
                    start: 'top 85%',
                    interval: 0.2,
                    onEnter: (el) =>
                    {
                        gsap.to(item, { opacity: 1, stagger: 0.1, duration: durationVal, ease: 'power1' })
                        item.setAttribute('data-scrolltrigger-applied', 'true')
                    }
                })
            })


            items.forEach(item =>
            {
                if (item.getAttribute('batch') !== 'playOnce')
                {
                    ScrollTrigger.batch([item], {
                        start: 'top bottom',
                        interval: 0.0,
                        onLeaveBack: batch =>
                        {
                            gsap.to(batch, { opacity: 0, stagger: 0, duration: 0, ease: 'none' })
                            batch.forEach(item => item.setAttribute('data-scrolltrigger-applied', 'true')) // Mark each item as processed
                        }
                    })
                }
            })
        })
    }
}