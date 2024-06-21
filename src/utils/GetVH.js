export default class GetVH
{
    constructor()
    {
        let vh = window.innerHeight
        document.documentElement.style.setProperty('--vh', `${vh}`)

        window.addEventListener('resize', () =>
        {
            let vh = window.innerHeight
            document.documentElement.style.setProperty('--vh', `${vh}`)
        })
    }
}