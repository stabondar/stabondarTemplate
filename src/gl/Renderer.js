import { WebGLRenderer, ACESFilmicToneMapping, Color } from 'three'

export default class Renderer
{
    constructor(app, gl, ratio)
    {
        this.app = app
        this.gl = gl
        this.canvas = this.gl.canvas
        this.sizes = this.app.sizes
        this.ratio = ratio || this.sizes.pixelRatio
        this.scene = this.gl.scene
        this.camera = this.gl.camera.instance

        this.setInstance()
    }

    setInstance()
    {
        this.instance = new WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
        })
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.ratio)
        this.instance.render(this.scene, this.camera)
        this.instance.toneMapping = ACESFilmicToneMapping
        this.instance.shadowMap.enabled = true

        if (this.app.sizes.isMobile) return
        // this.instance.setClearColor(0xffffff, 1)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
    }

    update()
    {
        this.instance.render(this.scene, this.camera)
    }
}
