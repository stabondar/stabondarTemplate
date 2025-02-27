import EventEmitter from '@utils/EventEmitter'

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        this.body = document.querySelector('body')
        this.canvasContainer = document.querySelector('.canvas-container')
        this.width = this.canvasContainer ? this.canvasContainer.offsetWidth : window.innerWidth
        this.height = this.canvasContainer ? this.canvasContainer.offsetHeight : window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        this.aspect = this.width / this.height
        this.aspectV = this.height / this.width

        let windowWidth = this.canvasContainer ? this.canvasContainer.offsetWidth : window.innerWidth
        let windowHeight = this.canvasContainer ? this.canvasContainer.offsetHeight : window.innerHeight
        let initWidth = windowWidth
        const checkWidth = () =>
        {
            let afterWidth = this.canvasContainer ? this.canvasContainer.offsetWidth : window.innerWidth
            let afterHeight = this.canvasContainer ? this.canvasContainer.offsetHeight : window.innerHeight
            if (windowWidth !== afterWidth || (initWidth >= 991 && windowHeight !== afterHeight))
            {
                this.width = this.canvasContainer ? this.canvasContainer.offsetWidth : window.innerWidth
                this.height = this.canvasContainer ? this.canvasContainer.offsetHeight : window.innerHeight
                this.pixelRatio = Math.min(window.devicePixelRatio, 2)
                this.aspect = this.width / this.height
                this.aspectV = this.height / this.width

                this.trigger('resize')
            }
            windowWidth = this.canvasContainer ? this.canvasContainer.offsetWidth : window.innerWidth
        }

        function debounce(func)
        {
            let timer
            return function (event)
            {
                if (timer) clearTimeout(timer)
                timer = setTimeout(func, 300, event)
            }
        }

        window.addEventListener("resize", debounce(function (e) {checkWidth()}))

        // this.resizeObserver = new ResizeObserver((entries) => this.observerResize(entries))
        // this.resizeObserver.observe(this.body)
    }

    observerResize(entries)
    {
        for (const entry of entries)
            {
            if (entry.target === this.body)
            {
                this.trigger("resize")
            }
        }
    }
}