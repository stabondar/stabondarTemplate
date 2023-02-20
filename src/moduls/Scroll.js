import Lenis from '@studio-freight/lenis'

export default class Scroll 
{
    constructor()
    {
        this.lenis = new Lenis(
        {
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            direction: 'vertical', // vertical, horizontal
            gestureDirection: 'vertical', // vertical, horizontal, both
            smooth: true,
            mouseMultiplier: 1.2,
            smoothTouch: false,
        })

        
        let lenis = this.lenis
        function raf(time) 
        {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        
        requestAnimationFrame(raf)    
    }
}