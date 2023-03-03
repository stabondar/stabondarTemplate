import gsap from 'gsap'

export default class ParallaxOnMove
{
    constructor(parent, elem, moveX, moveY, duration, ease, offset)
    {
        let mouse = {x: 0, y: 0}
        let x, y, offsetX, offsetY
        parent.on('mousemove', (e) =>
        {
            mouse.x = e.clientX - parent[0].getBoundingClientRect().left
            mouse.y = e.clientY - parent[0].getBoundingClientRect().top
            x = (mouse.x - $(parent).width()/2) / $(parent).width() * (moveX * 0.9) 
            y = (mouse.y - $(parent).height()/2) / $(parent).height() * (moveY * 0.8)

            // Get the offset 
            offsetX = x + x * offset
            offsetY = y + y * offset

            gsap.to( elem, { duration: duration, x: offsetX, y: offsetY, ease: ease })
        })

        // Set to default state
        parent.on('mouseleave', () =>
        {
            gsap.to(elem, {duration: duration, ease: ease, x: 0, y: 0})
        }) 
    }
}