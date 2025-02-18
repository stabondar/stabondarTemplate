import { customTrigger } from './customTrigger'

export const caseTransition = (app, CheckPages) =>
{
    const homeToCase =
    {
        name: 'home-to-case',
        sync: true,
        from:
        {
            custom: ({trigger}) => {return customTrigger(trigger, 'project-transition-item')},
            route: ['home', 'project']
        },
        to: {route: ['project']},
        leave(data)
        {

        },
        async beforeEnter(data)
        {
            const done = this.async()
            const leave = await import('@jsTransition/HomeToCase.js')
            new leave.default(data, done, CheckPages, app)
        },
    }

    const transition = window.innerWidth >= 1024 ? homeToCase : {}

    return transition
}