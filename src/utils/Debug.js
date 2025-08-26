export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'
        this.gui = null

        if (this.active) this.loadGui()
    }

    async loadGui()
    {
        this.gui = await import('lil-gui')
        this.gui = new this.gui.default()

        document.querySelector('.lil-gui.autoPlace').style.setProperty('left', '0')
        // console.log(this.gui)
    }
}
