import barba from '@barba/core'
import barbaPrefetch from '@barba/prefetch'

import Scroll from './moduls/Scroll.js'

let instance = null

export default class App {
    constructor()
    {
        if(instance) return instance
        instance = this

        this.scroll = new Scroll()
        let lenis = this.scroll.lenis

        this.utils = null

        const checkPages = async () =>
        {   
            this.utils = await import('./moduls/Utils.js').then(module => new module.default)

            // if(main.attr('data-barba-namespace') == 'home')
            // {
            //     this.home = await import('./moduls/Pages/Home/Home.js').then(module => new module.default)
            // }
        }

        barba.use(barbaPrefetch)

        barba.init(
        {
            debug: true,
            timeout: 7000,
            transitions: 
            [
                // Once Opening
                {
                    name: 'once',
                    async once (data)
                    {
                        // const forms = new Forms()
                        // const pageAnimation = async () =>
                        // {
                        //     if(data.next.namespace == 'home')
                        //     {
                        //         let animation = await import('./moduls/Transitions/HomeLoader.js').then(module => new module.default)
                        //     }
                        //     if(data.next.namespace == 'values')
                        //     {
                        //         let animation = await import('./moduls/Transitions/ValuesLoader.js').then(module => new module.default)
                        //     }
                        // }

                        // let globalLoader = null
                        // if(globalLoader == null)
                        // {
                        //     globalLoader = await import('./moduls/Transitions/GlobalLoader.js').then(module => new module.default(checkPages, pageAnimation))
                        // }
                    }
                },
                {
                    // name: 'transition',
                    // async leave(data)
                    // {
                    //     const done = this.async()
                    //     instance.leave = await import('./moduls/Transitions/Leave.js').then(module => new module.default(data.current.container, done))
                    // },
                    // async enter(data)
                    // {
                    //     const pageAnimation = async () =>
                    //     {
                    //         if(data.next.namespace == 'home')
                    //         {
                    //             let animation = await import('./moduls/Transitions/HomeLoader.js').then(module => new module.default)
                    //         }
                    //     }

                    //     instance.enter = await import('./moduls/Transitions/Enter.js').then(module => new module.default(data.next.container, pageAnimation))
                    // }
                }
            ]
        })

        barba.hooks.once((data) =>
        {
            lenis.scrollTo(0, {offset: 0})
        })
        
        barba.hooks.after(async (data) =>
        {
            const restart = await import('@finsweet/ts-utils')
            restart.restartWebflow()

            checkPages()
        })

        barba.hooks.enter( (data) =>
        {
            let videos = data.next.container.querySelectorAll('video')

            videos.forEach(function(video) 
            {
                video.load()
            })
        })
    }
}