export default class index
{
    constructor(main, app)
    {
        this.main = main
        this.app = app
        this.gl = this.app.gl

        this.loaded = false

        this.app.on('loaded', () =>
        {
            if(this.loaded) return
            this.load()

            this.loaded = true
        })
    }

    async load()
    {
        // const
        // [
        //     TextHover,
        // ] = await Promise.all(
        // [
        //     import('./TextHover.js'),
        // ])

        // this.textHover = new TextHover.default(this.main, this.app)
    }
}