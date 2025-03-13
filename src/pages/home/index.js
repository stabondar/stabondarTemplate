import Something from './Something.js'

export default class index
{
    constructor(main, app)
    {
        this.main = main
        this.app = app

        this.triggerLoad = async () => this.load()
    }

    load()
    {
        this.something = new Something(this.main, this.app)
    }
}