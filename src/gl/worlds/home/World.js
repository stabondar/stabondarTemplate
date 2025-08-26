import { WebGLRenderTarget, Box3, VideoTexture } from 'three'
import Resources from '@utils/Resources'
import gsap from 'gsap'

export default class World
{
    constructor(gl, app, scene, main)
    {
        this.gl = gl
        this.app = app
        this.scene = scene
        this.main = main

        this.sizes = this.app.sizes
        this.renderer = this.gl.renderer.instance
        this.camera = this.gl.camera.instance
        this.scene = scene

        this.load()
    }

    load()
    {}

    init()
    {
        this.gl.loaded = true

        this.gl.trigger('loaded')
    }

    setScroll(e)
    {}

    update()
    {}

    createTexture(target)
    {
        this.renderer.setRenderTarget(target)
        this.renderer.render(this.scene, this.camera)
        this.renderer.setRenderTarget(null)

        return target.texture
    }

    resize()
    {}

    onMouseMove(e, mouse)
    {}

    destroy()
    {}
}
