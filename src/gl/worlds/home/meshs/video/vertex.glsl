varying vec2 vUv;
varying vec2 screenUv;

void main()
{
    vUv = uv;
    vec4 modelPoisition = modelMatrix * vec4(position, 1.0);

    // Final Posisiotn
    gl_Position = projectionMatrix * viewMatrix * modelPoisition;

    screenUv = vec2(gl_Position.xy / gl_Position.w) * 0.5 + 0.5;
}