import './css/style.scss'
import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'
import EventEmitter from '@utils/EventEmitter.js'
import { RestartWebflow } from '@utils/RestartWebflow.js'
import { defaultTransition } from '@transitions/schema/defaultTransition.js'
import { CheckPages } from '@transitions/CheckPages.js'
import FontFaceObserver from 'fontfaceobserver'

let instance = null

export default class app extends EventEmitter
{
    constructor()
    {
        if (instance) return instance

        super()

        instance = this
        this.app = null

        history.scrollRestoration = 'manual'

        this.loadFonts().then(() => this.init())
    }

    async loadFonts()
    {
        const font = new FontFaceObserver('ABC monument grotesk mono')
        const fontTitle = new FontFaceObserver('Pragmatica Cond')

        const fontPromises = [
            font.load(null, 8000).catch(() => console.warn('ABC monument grotesk mono font failed to load')),
            fontTitle.load(null, 8000).catch(() => console.warn('Pragmatica Cond font failed to load')),
        ]

        return Promise.all(fontPromises)
    }

    init()
    {
        barba.use(barbaPrefetch)

        barba.init({
            schema: {
                prefix: 'data-transition',
                namespace: 'page',
            },
            debug: true,
            timeout: 7000,
            prevent: ({ el, event }) =>
            {
                if (event.type == 'click')
                {
                    event.preventDefault()
                    event.stopPropagation()

                    if (el.classList.contains('go')) window.location = el.href

                    if (el.classList.contains('prevent')) return true
                    if (el.href.includes('#')) return true
                }
            },
            transitions: [
                {
                    name: 'once',
                    once: ({ next }) => this.onceLoad(next),
                },
                defaultTransition('transition', this, CheckPages),
                defaultTransition('self', this, CheckPages),
            ],
        })

        barba.hooks.enter((data) =>
        {
            const videos = data.next.container.querySelectorAll('video')
            if (videos.length > 0) videos.forEach((video) => video.load())
        })

        barba.hooks.after(async (data) =>
        {
            await RestartWebflow()
        })
    }

    async loadMainComponentsOnce(main, app)
    {
        app.options = {
            onceLoaded: false,
        }

        const [Scroll, Sizes, Time, ModuleLoader, Observer] = await Promise.all([
            import('@utils/Scroll.js'),
            import('@utils/Sizes.js'),
            import('@utils/Tick.js'),
            import('@utils/ModuleLoader.js'),
            import('@utils/Observer.js'),
        ])

        app.scroll = new Scroll.default()
        app.sizes = new Sizes.default()
        app.tick = new Time.default()
        app.moduleLoader = new ModuleLoader.default(app)
        app.observer = new Observer.default()

        await CheckPages(main, app)
        await app.moduleLoader.loadModules(main)

        app.sizes.on('resize', () => app.trigger('resize'))
        app.tick.on('tick', () => app.trigger('tick'))
    }

    async onceLoad(next)
    {
        this.once = await import('@transitions/GlobalLoader.js').then(
            (module) => new module.default(next, this.loadMainComponentsOnce, this)
        )
    }
}

const appInstance = new app()
