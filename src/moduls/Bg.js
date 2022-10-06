import * as THREE from 'three'

import fragment from './shaders/fragment.glsl'
import vertex from './shaders/vertex.glsl'


export default class bgFunction {
    constructor() {
        
        let container, camera, scene, renderer, mesh, clock, time, geometry, material
        let mouse = { x: 0, y: 0 }
        let objects = []
        let count = 0;
        const canvas = document.querySelector('canvas.webgl')

        var CANVAS_WIDTH = 1100;
        var CANVAS_HEIGHT = 1100;

        if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
            var CANVAS_WIDTH = 1100;
            var CANVAS_HEIGHT = 1100;
        } else {
            var CANVAS_WIDTH = 500;
            var CANVAS_HEIGHT = 500;
        }

        var vector = new THREE.Vector3();

        var settings = {
            blur: 0.08,
            speed: 0.6,
            noiseFreq: 0.1
        };

        const ambientLight = new THREE.AmbientLight(0x404040);

        renderer = new THREE.WebGLRenderer({canvas});
        renderer.setSize( CANVAS_WIDTH, CANVAS_HEIGHT );
        renderer.setClearColor(0x151515, 1);

        clock = new THREE.Clock();
        mouse = new THREE.Vector2();
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera( 1.1, CANVAS_WIDTH / CANVAS_HEIGHT, 1, 1000 );
        camera.position.y = 150;
        camera.position.z = 500;
        camera.lookAt( scene.position );

        time = 0;
        geometry = new THREE.PlaneGeometry(10, 10, 16, 16);
        material = new THREE.ShaderMaterial({
            uniforms: {
                u_time: { type: "f", value: 0 },
                u_resolution: { type: "v4", value: new THREE.Vector4() },
                u_aspect: { type: "f", value: CANVAS_WIDTH / CANVAS_HEIGHT },
                u_noiseFreq: { value: 0 },
                blur: { value: 0 },
                speed: { value: 0 }
            },
            transparent: true,
            vertexShader: vertex,
            fragmentShader: fragment
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, 0);
        scene.add(mesh);

        function render() {
        renderer.render(scene, camera);

        material.uniforms.u_time.value = clock.getElapsedTime();
        material.uniforms.blur.value = settings.blur;
        material.uniforms.speed.value = settings.speed;
        material.uniforms.u_noiseFreq.value = settings.noiseFreq;
        }

        (function animate() {

        requestAnimationFrame( animate );

        render();

        })(); 

    }
}
