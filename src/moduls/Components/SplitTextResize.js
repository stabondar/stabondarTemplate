import gsap from 'gsap'
import {SplitText} from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

export default class SplitTextResize
{
    constructor(split, initThis)
    {
        let windowWidth = window.innerWidth
        const checkWidth = () => 
        {
            let afterWidth = window.innerWidth
            if (windowWidth !== afterWidth)
            {
                split.revert()
                initThis()
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