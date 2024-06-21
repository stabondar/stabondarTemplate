export default class GetRatio
{
    constructor()
    {
        this.items = document.querySelectorAll('[get-aspect-ratio]')

        this.items.forEach(item => 
        {
            const ratio = item.getAttribute('get-aspect-ratio')

            item.style.setProperty('aspect-ratio', ratio)
        })
    }
}