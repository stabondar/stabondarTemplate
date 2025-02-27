import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Accordion
{
    constructor(instance, main, app)
    {
        this.instance = instance
        this.main = main
        this.app = app

        this.destroyed = false

        this.init()
        this.app.on('resize', () => this.resize())
        this.app.on('destroy', () => this.destroy())
    }

    init()
    {
        this.items = this.instance.querySelectorAll('.accordion')

        this.items.forEach(item =>
        {
            item.addEventListener('click', () => this.toggleAccordion(item))
        })
    }

    toggleAccordion(item)
    {
        if(item.classList.contains('active'))
        {
            item.classList.remove('active')
        }
        else
        {
            this.items.forEach(item => item.classList.remove('active'))
            item.classList.add('active')
        }
        setTimeout(() => ScrollTrigger.refresh(), 600)
    }

    resize()
    {
        if(this.destroyed) return

        console.log('resize')
    }

    destroy()
    {
        if(this.destroyed) return

        this.destroyed = true
    }
}