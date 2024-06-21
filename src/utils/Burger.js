import gsap from 'gsap'

export default class Burger
{
    constructor(app)
    {
        this.app = app
        this.scroll = this.app.scroll.lenis

        this.body = document.querySelector('body')
        this.burger = document.querySelector('.burger')
        this.burgerBody = document.querySelector('.burger_body')
        this.trigger = document.querySelector('.nav_burger')

        gsap.set(this.burgerBody, 
        {
            maskImage: 'linear-gradient(90deg, transparent 100%, #000 125%, #000 225%, transparent 250%, transparent 250%)'
        })

        this.init()

        window.addEventListener('resize', () => this.allowInnerScroll())
    }

    allowInnerScroll()
    {
        if(this.burgerBody.getBoundingClientRect().height > window.innerHeight)
        {
            this.burger.style.overflowY = 'scroll'
        } else
        {
            this.burger.style.overflowY = 'clip'
        }
    }

    init()
    {
        this.trigger.addEventListener('click', () => this.toggle())

        // this.items.forEach((item, index) => item.addEventListener('click', () => this.toggle()))

        // this.burgerBotItems.forEach((item, index) =>
        // {
        //     item.style.setProperty('--delay', `${index * 0.1 + 0.1}s`)
        // })

        // this.burgerTopItems.forEach((item, index) =>
        // {
        //     item.style.setProperty('--delay', `${index * 0.1 + 0.1}s`)
        // })
    }

    toggle()
    {
        
        if(this.body.classList.contains('burger-open'))
        {
            this.body.classList.remove('burger-open')

            gsap.to(this.burgerBody, 
            {
                duration: 0.8, ease: 'power4.inOut',
                maskImage: 'linear-gradient(90deg, transparent 100%, #000 125%, #000 225%, transparent 250%, transparent 250%)'
            })
            
            this.scroll.start()
        } else
        {
            this.body.classList.add('burger-open')
            this.allowInnerScroll()

            gsap.to(this.burgerBody, 
            {
                duration: 0.8, ease: 'power4.inOut',
                maskImage: 'linear-gradient(90deg, transparent -25%, #000 0%, #000 100%, transparent 125%, transparent 125%)'
            })

            this.scroll.stop()
        }
    }
}