import { gsap, ScrollTrigger, Draggable, InertiaPlugin } from 'gsap/all'
import { LoadImages } from '@utils/LoadImages.js'

gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin)

export default class Marquee
{
    constructor(instance, app, main)
    {
        this.instance = instance
        this.app = app
        this.main = main
        this.scroll = this.app.scroll.lenis
        this.observer = this.app.observer.instance

        this.destroyed = false

        this.multiDirection = this.instance.dataset.direction === '1' ? 1 : -1
        this.direction = 1 * this.multiDirection
        this.prevDirection = this.direction
        this.velocity = { value: 0 }
        this.enter = { value: 1 }
        this.move = 0
        this.draggableMove = { value: 0 }
        this.draggableVelocity = 0

        this.proxy = document.createElement('div')
        this.props = gsap.getProperty(this.proxy)

        this.wrappers = this.instance.querySelectorAll('[wrapper]')

        // LoadImages(this.instance)

        this.quicks = [...this.wrappers].map((el) => gsap.quickSetter(el, 'x', '%'))
        this.draggbleQuick = gsap.quickTo(this.draggableMove, 'value', { duration: 0.2, ease: 'power2' })
        this.changeVelocity = gsap.quickTo(this.velocity, 'value', { duration: 0.2, ease: 'power2' })

        this.scroll.on('scroll', (e) =>
        {
            if (this.destroyed) return
            this.changeVelocity(Math.abs(e.velocity))
            if (this.prevDirection === e.direction) return
            this.direction = e.direction * this.multiDirection

            this.prevDirection = e.direction
        })

        this.initDraggable()

        this.observer.observe(this.instance)

        this.wrappers.forEach((wrapper) =>
        {
            wrapper.addEventListener('mouseenter', () =>
            {
                this.enterTl?.kill()
                this.enterTl = gsap.to(this.enter, { value: 0, duration: 0.6, ease: 'power3' })
            })
            wrapper.addEventListener('mouseleave', () =>
            {
                this.enterTl?.kill()
                this.enterTl = gsap.to(this.enter, { value: 1, duration: 0.6, ease: 'power3' })
            })
        })

        this.app.on('tick', () => this.tick())
        this.app.on('resize', () => this.resize())
        this.app.on('destroy', () => this.destroy())
    }

    initDraggable()
    {
        this.draggable = Draggable.create(this.proxy, {
            type: 'x',
            inertia: true,
            trigger: this.instance,
            onDrag: () =>
            {
                if (this.destroyed) return
                this.draggbleQuick(this.draggable[0].deltaX)
            },
            onThrowUpdate: () =>
            {
                if (this.destroyed) return
                this.draggbleQuick(this.draggable[0].deltaX)
            },
        })
    }

    tick()
    {
        if (this.destroyed || this.instance.dataset.visible == 'false') return

        this.quicks.forEach((quick) => quick(this.move))
        const velocity = gsap.utils.mapRange(0, 100, 0, 1, this.velocity.value)
        this.move += this.direction * (0.05 + velocity) * this.enter.value + this.draggableMove.value / 10

        this.draggbleQuick(0)

        if (this.move > 100 || this.move < -100) this.move = 0

        this.changeVelocity(0)
    }

    resize()
    {
        if (this.destroyed) return
    }

    destroy()
    {
        if (this.destroyed) return

        this.destroyed = true
    }
}
