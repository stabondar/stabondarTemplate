import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import Flip from 'gsap/Flip'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import MorphSVGPlugin from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(ScrollTrigger, SplitText, Flip, ScrambleTextPlugin, MorphSVGPlugin)

const def = {
    duration: 0.8,
    ease: 'expo.out',
}

const letters = 'abcdefghijklmnopqrstuvwxyz'
const original = '{original}'

gsap.defaults(def)

export { gsap, ScrollTrigger, ScrambleTextPlugin, Flip, SplitText, MorphSVGPlugin, def, letters, original }
