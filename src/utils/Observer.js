export default class Observer
{
    constructor()
    {
        this.instance = new IntersectionObserver(
            (entries) =>
            {
                entries.forEach((entry) =>
                {
                    entry.target.dataset.visible = entry.isIntersecting ? 'true' : 'false'
                })
            },
            {
                root: null,
                rootMargin: '15% 0px 15% 0px',
            }
        )
    }
}
