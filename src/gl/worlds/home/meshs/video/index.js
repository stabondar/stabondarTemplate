import { Uniform, PlaneGeometry, ShaderMaterial, Mesh, Vector2, Color } from 'three'
import gsap from 'gsap'
import { UpdateGeometry } from '@gl/UpdateGeometry.js'

import vertex from './vertex.glsl'
import fragment from './fragment.glsl'

export default class index
{
    constructor(app, gl, scene, section, texture)
    {
        this.app = app
        this.gl = gl
        this.scene = scene
        this.section = section
        this.texture = texture

        this.sizes = this.app.sizes
        this.time = this.app.time

        this.init()
    }

    init()
    {
        this.rects = this.section.getBoundingClientRect()

        this.setMaterial()
        this.setMesh()
    }

    setMaterial()
    {
        this.material = new ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            transparent: true,
            uniforms: {
                uTexture: new Uniform(this.texture),
                uAspect: new Uniform(new Vector2(1452, 832)),
                uRes: new Uniform(new Vector2(this.sizes.width, this.sizes.height)),
            },
        })
    }

    setMesh()
    {
        this.geometry = new PlaneGeometry(this.sizes.width, this.sizes.height, 1, 1)

        this.mesh = new Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)

        this.setPosition()
    }

    setPosition()
    {
        this.rects = this.section.getBoundingClientRect()
        this.mesh.position.x = this.rects.left + this.rects.width / 2 - this.sizes.width / 2
        this.mesh.position.y = -this.rects.top - this.rects.height / 2 + this.sizes.height / 2
    }

    resize()
    {
        UpdateGeometry(this.mesh, new PlaneGeometry(this.sizes.width, this.sizes.height, 1, 1))

        this.material.uniforms.uRes.value.set(this.sizes.width, this.sizes.height)
    }

    update()
    {}

    destroy()
    {
        this.material.dispose()
        this.geometry.dispose()
        this.scene.remove(this.mesh)
    }
}
