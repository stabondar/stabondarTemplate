vec2 getCoverUv(vec2 uv, vec2 uTextureResolution, vec2 uItemSizes)
{
    vec2 tempUv = uv - vec2(0.5);

    float quadAspectRatio = uItemSizes.x / uItemSizes.y;
    float textureAspectRatio = uTextureResolution.x / uTextureResolution.y;

    if (quadAspectRatio < textureAspectRatio) {
        tempUv = tempUv * vec2(quadAspectRatio / textureAspectRatio, 1.0);
    } else {
        tempUv = tempUv * vec2(1.0, textureAspectRatio / quadAspectRatio);
    }

    return tempUv + vec2(0.5);
}

vec2 getContainUv(vec2 uv, vec2 uTextureResolution, vec2 uItemSizes)
{
    float screenAspect = uTextureResolution.x / uTextureResolution.y;
    float textTextureAspect = uItemSizes.x / uItemSizes.y;

    vec2 scale = vec2(1.0);
    scale.y = screenAspect / textTextureAspect;

    vec2 tempUv = (uv - 0.5) * scale + 0.5;
    tempUv = clamp(tempUv, 0.0, 1.0);

    return tempUv;
}