import gsap from 'gsap'

export default class Enter
{
    constructor(container, pageAnimation)
    {
        gsap.set(container, {autoAlpha: 1})
        $('img').removeAttr('srcset')

        $('html').removeClass('green')
        $('html').removeClass('light-green')

        let loader = $('.loader')
        let tl = gsap.timeline({defaults: {duration: 1.2, ease: 'power4'}})
        tl.to(loader, {clipPath: 'inset(0 0 100% 0)', onStart: pageAnimation}, 0.05)

    }
}