export default class index
{
    constructor(main, app)
    {
        this.main = main
        this.app = app
        this.gl = this.app.gl

        this.triggerLoad = async () => this.load()
    }

    load()
    {
        console.log('loaded')
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