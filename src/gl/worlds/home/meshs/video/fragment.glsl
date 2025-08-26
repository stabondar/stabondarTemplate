uniform sampler2D uTexture;
uniform vec2 uRes;
uniform vec2 uAspect;

varying vec2 vUv;
varying vec2 screenUv;

#include ../../../../math/getCoverUv.glsl

void main()
{
    vec2 uv = vUv;
    vec2 coverUv = getCoverUv(uv, uAspect, uRes);

    vec4 color = texture2D(uTexture, coverUv);

    gl_FragColor = color;
}