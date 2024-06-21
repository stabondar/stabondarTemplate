import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import FontFaceObserver from 'fontfaceobserver'
import SplitOnResize from './SplitOnResize'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default class title
{
    constructor(app)
    {
        this.app = app

        this.font = new FontFaceObserver('ABC Social Condensed')
        this.enter = 'top 80%'

        this.font.load().then(() => this.init())
    }

    init()
    {
        this.titleAnimation()
        this.descrAnimation()

        this.splitOnResize1 = new SplitOnResize(this.app, this.splitTitle, this.titleAnimation)
        this.splitOnResize2 = new SplitOnResize(this.app, this.splitDescr, this.descrAnimation)
    }

    titleAnimation()
    {
        this.titleItems = document.querySelectorAll('[split-title]')
        this.splitTitle = new SplitText(this.titleItems, { type: 'words', wordsClass: 'title-words' })

        this.titleItems.forEach(item =>
        {
            let words = item.querySelectorAll('.title-words')
            let tl = gsap.timeline({ paused: true, defaults: { duration: 1.2, ease: "power2.out", stagger: 0.1 } })

            tl.fromTo(words,
                { opacity: 0, yPercent: 20 },
                { opacity: 1, yPercent: 0 }
            )

            ScrollTrigger.create(
            {
                trigger: item,
                start: this.enter,
                onEnter: () => tl.play(),
            })

            ScrollTrigger.create(
            {
                trigger: item,
                start: 'top bottom',
                onLeaveBack: () => tl.time(0).pause()
            })
        })
    }

    descrAnimation()
    {
        this.items = []

        this.descrItems = document.querySelectorAll('[split-descr]')
        this.descrItems.forEach(item =>
        {
            if(item.classList.contains('w-richtext'))
            {
                const p = item.querySelectorAll('p')
                p.forEach(pItem => this.items.push(pItem))
            } else this.items.push(item)
        })

        this.splitDescr = new SplitText(this.items, { type: 'lines', linesClass: 'descr-lines' })

        // Detect mobile device
        const isMobile = window.innerWidth <= 768 // Example breakpoint for mobile devices

        // Set animation parameters based on device type
        const animationDuration = isMobile ? 0.6 : 1.2 // Shorter duration for mobile
        const animationStagger = isMobile ? 0.15 : 0.3 // Shorter stagger for mobile

        this.items.forEach(item => {
            let lines = item.querySelectorAll('.descr-lines')
            let tl = gsap.timeline(
            {
                paused: true,
                defaults: {
                    duration: animationDuration,
                    ease: 'power2.inOut',
                    stagger: animationStagger
                }
            })

            tl.fromTo(lines,
                { opacity: 0, yPercent: 20 },
                { opacity: 1, yPercent: 0 }
            )

            ScrollTrigger.create({
                trigger: item,
                start: this.enter,
                onEnter: () => tl.play(),
            })

            ScrollTrigger.create({
                trigger: item,
                start: 'top bottom',
                onLeaveBack: () => tl.time(0).pause()
            })
        })
    }
}