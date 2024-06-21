import './css/style.scss'
import barba from '@barba/core'
import ModuleLoader from './ModuleLoader.js'
import EventEmitter from './utils/EventEmitter.js'

let instance = null

export default class app extends EventEmitter
{
    constructor()
    {
        if(instance) return instance

        super()
        instance = this
        this.app = null

        history.scrollRestoration = 'manual'

        this.init()
    }
    
    init()
    {
        barba.init(
        {
            schema: 
            {
                prefix: 'data-transition',
                namespace: 'page'
            },
            debug: false,
            timeout: 7000,
            prevent: ({ el }) => (el.classList && el.classList.contains('prevent')) || el.closest('.prevent'),
            transitions:
            [
                {
                    name: 'once',
                    once: ({next}) => this.onceLoad(next),
                },
                {   
                    name: 'transition',
                    async leave(data)
                    {
                        const done = this.async()
                        instance.leave = await import('./transitions/Leave.js').then(module => new module.default(done))
                    },
                    async enter(data)
                    {
                        instance.enter = await import('./transitions/Enter.js').then(module => new module.default(data.next.container))
                    },
                },
                {   
                    name: 'self',
                    async leave(data)
                    {
                        const done = this.async()
                        instance.leave = await import('./transitions/Leave.js').then(module => new module.default(done))
                    },
                    async enter(data)
                    {
                        instance.enter = await import('./transitions/Enter.js').then(module => new module.default(data.next.container))
                    },
                }
            ]
        })

        // barba.hooks.enter( (data) =>
        // {
        //     let videos = data.next.container.querySelectorAll('video')
        //     videos.forEach(function(video) { video.load() })
        // })

        // barba.hooks.after( async (data) =>
        // {
        //     await restartWebflow()
        // })
    }

    async loadMainComponentsOnce() 
    {
        this.app = new app()
        
        const [Scroll, Sizes, GSAP, Time, Burger] = await Promise.all(
        [
            import('./utils/Scroll.js'),
            import('./utils/Sizes.js'),
            import('./utils/GSAP.js'),
            import('./utils/Tick.js'),
            import('./utils/Burger.js'),
        ])
       
        this.app.scroll = new Scroll.default()
        this.app.sizes = new Sizes.default()
        this.gsap = new GSAP.default()
        this.burger = new Burger.default(this.app)
        this.app.tick = new Time.default()
        

        this.app.moduleLoader.init()
        this.app.sizes.on('resize', () => this.app.trigger('resize'))
        this.app.tick.on('tick', () => this.app.trigger('tick'))
    }

    async pageScrollTop() { window.scrollTo({top: 0, behavior: 'instant'}) }

    async onceLoad(next)
    {   
        this.moduleLoader = new ModuleLoader(this)
        this.once = await import('./PageLoader.js').then(module => new module.default(next, this.loadMainComponentsOnce, this))
        await this.pageScrollTop()
    }
}

const appInstance = new app()