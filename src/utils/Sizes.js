import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()

        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)

        let windowWidth = window.innerWidth
        const checkWidth = () => 
        {
            let afterWidth = window.innerWidth
            if (windowWidth !== afterWidth)
            {
                this.width = window.innerWidth
                this.height = window.innerHeight
                this.pixelRatio = Math.min(window.devicePixelRatio, 2)            

                this.trigger('resize')
            }
            windowWidth = window.innerWidth
        }

        function debounce(func) {
            let timer
            return function (event) 
            {
                if (timer) clearTimeout(timer);
                timer = setTimeout(func, 300, event);
            }
        }

        window.addEventListener("resize", debounce(function (e) {checkWidth()}))
    }
}