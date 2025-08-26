vec4 applyBlur(sampler2D tex, vec2 uv, float blurAmount) {
    vec2 texelSize = 1.0 / uRes;
    vec4 color = vec4(0.0);

    // Simple box blur
    float total = 0.0;
    for(int x = -2; x <= 2; x++) {
        for(int y = -2; y <= 2; y++) {
            vec2 offset = vec2(float(x), float(y)) * texelSize * blurAmount;
            color += texture2D(tex, uv + offset);
            total += 1.0;
        }
    }

    return color / total;
}

vec4 fastGaussianBlur(sampler2D tex, vec2 uv, float blurAmount) {
    vec2 texelSize = 1.0 / uRes;
    vec4 color = vec4(0.0);

    // Gaussian weights for 5 samples (much lighter than 25)
    float weights[5] = float[](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);

    // Horizontal pass
    color += texture2D(tex, uv) * weights[0];
    for(int i = 1; i < 5; i++) {
        vec2 offset = vec2(float(i) * texelSize.x * blurAmount, 0.0);
        color += texture2D(tex, uv + offset) * weights[i];
        color += texture2D(tex, uv - offset) * weights[i];
    }

    return color;
}

vec4 fakeBlur(sampler2D tex, vec2 uv, float blurAmount) {
    // Simple noise-based offset for "blur-like" effect
    vec2 noise = vec2(
        fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453),
        fract(sin(dot(uv, vec2(93.9898, 67.345))) * 43758.5453)
    ) - 0.5;

    vec2 offset = noise * blurAmount * 0.01;
    return texture2D(tex, uv + offset);
}

vec4 stableBlur(sampler2D tex, vec2 uv, float blurAmount) {
    // Use screen-space coordinates for stable noise
    vec2 screenPos = screenUv;
    vec2 noise = vec2(
        fract(sin(dot(screenPos, vec2(12.9898, 78.233))) * 43758.5453),
        fract(sin(dot(screenPos, vec2(93.9898, 67.345))) * 43758.5453)
    ) - 0.5;

    // Reduce the multiplier from 0.01 to something much smaller
    vec2 offset = noise * blurAmount * 0.001; // Much less noise
    return texture2D(tex, uv + offset);
}