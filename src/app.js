import './css/style.scss'
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import EventEmitter from '@utils/EventEmitter.js'
import { RestartWebflow } from '@utils/RestartWebflow.js'
import { defaultTransition } from '@transitions/schema/defaultTransition.js'
import { CheckPages } from '@transitions/CheckPages.js'

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
        barba.use(barbaPrefetch)

        barba.init(
        {
            schema:
            {
                prefix: 'data-transition',
                namespace: 'page'
            },
            debug: true,
            timeout: 7000,
            prevent: ({ el, event }) =>
            {
                if(event.type == 'click')
                {
                    event.preventDefault()
                    event.stopPropagation()

                    if(el.classList.contains('go')) window.location = el.href

                    if(el.classList.contains('prevent')) return true
                    if(el.href.includes('#')) return true
                }
            },
            transitions:
            [
                {
                    name: 'once',
                    once: ({next}) => this.onceLoad(next),
                },
                defaultTransition('transition', this, CheckPages),
                defaultTransition('self', this, CheckPages)
            ]
        })

        barba.hooks.enter( (data) =>
        {
            const videos = data.next.container.querySelectorAll('video')
            if(videos.length > 0) videos.forEach(video =>  video.load())
        })

        barba.hooks.after( async (data) =>
        {
            await RestartWebflow()
        })
    }

    async loadMainComponentsOnce(main, app)
    {
        const
        [
            Scroll,
            Sizes,
            GSAP,
            Time,
            ModuleLoader
        ] = await Promise.all(
        [
            import('@utils/Scroll.js'),
            import('@utils/Sizes.js'),
            import('@utils/GSAP.js'),
            import('@utils/Tick.js'),
            import('@utils/ModuleLoader.js')
        ])

        app.scroll = new Scroll.default()
        app.sizes = new Sizes.default()
        new GSAP.default()
        app.tick = new Time.default()
        app.moduleLoader = new ModuleLoader.default(app)

        await CheckPages(app, main)
        await app.moduleLoader.loadModules(main)

        app.sizes.on('resize', () => app.trigger('resize'))
        app.tick.on('tick', () => app.trigger('tick'))
    }

    async onceLoad(next)
    {
        this.once = await import('@transitions/GlobalLoader.js').then(module => new module.default(next, this.loadMainComponentsOnce, this))
    }
}

const appInstance = new app()
