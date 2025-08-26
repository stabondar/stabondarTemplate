import { CanvasTexture, Vector2 } from 'three'

export default class index
{
    constructor(app, gl)
    {
        this.app = app
        this.gl = gl

        this.sizes = this.app.sizes

        this.loaded = false
        !this.sizes.isMobile && this.init()
    }

    init()
    {
        this.canvas = document.createElement('canvas')
        this.canvas.width = 128
        this.canvas.height = 128
        this.glowSize = this.canvas.width * 0.25
        this.texture = new CanvasTexture(this.canvas)
        this.gl.displacementTexture = this.texture

        // this.addToBody()

        this.ctx = this.canvas.getContext('2d')
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        this.img = new Image()
        this.img.crossOrigin = 'Anonymous'
        this.img.src = 'https://cdn.prod.website-files.com/6813a51163a17051e3670f66/682dafcdc3f6941210de4ad6_glow.png'

        this.mouse = new Vector2(9999, 9999)
        this.canvasCursor = new Vector2(9999, 9999)
        this.cursorPrev = new Vector2(9999, 9999)

        this.loaded = true
    }

    onMouseMove(e, mouse)
    {
        if (!this.loaded) return

        this.mouse.x = (mouse.x + 1) / 2
        this.mouse.y = (mouse.y + 1) / 2

        this.canvasCursor.x = this.mouse.x * this.canvas.width
        this.canvasCursor.y = (1 - this.mouse.y) * this.canvas.height
    }

    update()
    {
        if (!this.loaded) return

        this.ctx.globalCompositeOperation = 'source-over'
        this.ctx.globalAlpha = 0.03
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        const distance = this.cursorPrev.distanceTo(this.canvasCursor)
        const alpha = Math.min(distance * 0.1, 1)
        this.cursorPrev.copy(this.canvasCursor)

        this.glowSize = this.canvas.width * 0.25
        this.ctx.globalCompositeOperation = 'lighten'
        this.ctx.globalAlpha = alpha
        this.ctx.drawImage(
            this.img,
            this.canvasCursor.x - this.glowSize / 2,
            this.canvasCursor.y - this.glowSize / 2,
            this.glowSize,
            this.glowSize
        )

        this.texture.needsUpdate = true
    }

    addToBody()
    {
        this.canvas.style.position = 'fixed'
        this.canvas.style.left = '0'
        this.canvas.style.top = '0'
        this.canvas.style.zIndex = '10'
        this.canvas.style.width = '512px'
        this.canvas.style.height = '512px'

        document.body.appendChild(this.canvas)
    }
}
