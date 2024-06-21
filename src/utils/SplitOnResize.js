import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export default class SplitOnResize
{
    constructor(app, split, initThis)
    {
        this.app = app
        this.split = split
        this.initThis = initThis

        this.windowWidth = window.innerWidth

        this.app.on('resize', () => this.checkWidth())
    }

    checkWidth()
    {
        let afterWidth = window.innerWidth
        if (this.windowWidth !== afterWidth)
        {
            this.split.revert()
            this.initThis()
        }
        this.windowWidth = window.innerWidth
    }
}