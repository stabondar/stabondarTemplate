import { gsap, ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

export const LoadImages = (instance) =>
{
    const images = instance.querySelectorAll('img')

    const links = [...images].map((image) =>
    {
        const url = image.getAttribute('src')
        image.removeAttribute('srcset')
        image.removeAttribute('src')
        image.removeAttribute('loading')

        return url
    })

    let loaded = false

    ScrollTrigger.create({
        trigger: instance,
        start: 'top bottom+=150%',
        onEnter: () =>
        {
            if (loaded) return

            images.forEach((image, index) =>
            {
                const link = links[index]
                image.setAttribute('src', link)
            })

            loaded = true
        },
    })
}
