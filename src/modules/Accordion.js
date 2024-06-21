import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default class Accordion
{
    constructor(instance, app)
    {
        this.instance = instance
        this.app = app

        this.init()
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
}