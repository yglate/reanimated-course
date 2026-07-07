import { Skia } from '@shopify/react-native-skia';

import { glsl } from './shaderHelpers';
import { transition } from './generateOpenGlTransition';

// Simple Fade In Transition
const fadeShader = glsl`
  uniform shader firstImage;
  uniform shader secondImage;

  uniform float progress;
  uniform float2 resolution;

  half4 getFromColor(float2 uv, float2 resolution){
    return firstImage.eval(uv * resolution);
  }

  half4 getToColor(float2 uv, float2 resolution){
    return secondImage.eval(uv * resolution);
  }

  half4 main(float2 fragCoord){
    return mix(
      getFromColor(fragCoord / resolution, resolution),
      getToColor(fragCoord / resolution, resolution),
      progress
    );
  }
  `;

const butterflyWaveShader = glsl`
// Author: mandubian
// License: MIT
float amplitude = 2.0;
float waves = 15.0;
float colorSeparation = 0.6;

const float PI = 3.14159265358979323846264;
float compute(vec2 p, float progress, vec2 center) {
vec2 o = p*sin(progress * amplitude)-center;
// horizontal vector
vec2 h = vec2(1., 0.);
// butterfly polar function (don't ask me why this one :))
float theta = acos(dot(o, h)) * waves;
float s = sin((2.*theta - PI) / 24.);
float s2 = s * s;
return (exp(cos(theta)) - 2.*cos(4.*theta) + s2 * s2 * s) / 10.;
}
vec4 transition(vec2 uv) {
  if (progress <= 0.0) return getFromColor(uv);
  if (progress >= 1.0) return getToColor(uv);
  vec2 p = uv;
  float inv = 1. - progress;
  float disp = compute(p, progress, vec2(0.5, 0.5));
  vec4 texTo = getToColor(p + inv*disp);
  vec4 texFrom = vec4(
    getFromColor(p + progress*disp*(1.0 - colorSeparation)).r,
    getFromColor(p + progress*disp).g,
    getFromColor(p + progress*disp*(1.0 + colorSeparation)).b,
    1.0);
  return texTo*progress + texFrom*inv;
}
`;

const directionWarpShader = glsl`
// Author: pschroen
// License: MIT

float smoothness = 0.1;
vec2 direction = vec2(-1.0, 1.0);

const vec2 center = vec2(0.5, 0.5);

vec4 transition (vec2 uv) {
  vec2 v = normalize(direction);
  v /= abs(v.x) + abs(v.y);
  float d = v.x * center.x + v.y * center.y;
  float m = 1.0 - smoothstep(-smoothness, 0.0, v.x * uv.x + v.y * uv.y - (d - 0.5 + progress * (1.0 + smoothness)));
  return mix(getFromColor((uv - 0.5) * (1.0 - m) + 0.5), getToColor((uv - 0.5) * m + 0.5), m);
}
`;

export const fadeShaderEffect = Skia.RuntimeEffect.Make(fadeShader);
export const butterflyShaderEffect = transition(butterflyWaveShader);
export const directionWarpShaderEffect = transition(directionWarpShader);
