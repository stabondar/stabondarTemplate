import './styles/style.css'
import './styles/loco.css'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LocomotiveScroll from 'locomotive-scroll'

import bg from './moduls/Bg.js'

const checkPages = () => 
{
    const background = new bg()
}
checkPages()
/**
 * Setup Loco And Gsap
 */
 gsap.registerPlugin(ScrollTrigger)
 
let locoScroll
if (window.innerWidth > 480) 
{
    locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true,
        multiplier: 1.2,
        lerp: 0.06
    });
    locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });
}
ScrollTrigger.defaults({
    scroller: '.main'
})

let split
let mm = gsap.matchMedia()
let isDesktop = "(min-width: 991px)"
let isTM = "(max-width: 991px)"
let isMobile = "(max-width: 480px)"

const init = () => 
{
    /**
     * GSAP no blick
     */
    gsap.set('main', { autoAlpha: 1 })

}

window.addEventListener('load', () => 
{
    init()
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update())
    locoScroll.update()
})


$(window).resize(function (e) {
  locoScroll.update();
});

