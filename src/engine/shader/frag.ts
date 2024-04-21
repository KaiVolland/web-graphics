export default /* wgsl */`#version 300 es
# define MIN_LIGHT_STRENGTH 0.1

precision highp float;

// Passed in and varied from the vertex shader.
in vec2 v_texcoord;
in vec3 v_normal;
in vec3 v_position;

uniform sampler2D u_texture;

struct DLight {
  vec4 direction;
  vec4 color;
};

struct PLight {
  vec4 position;
  vec4 color;
};
layout(std140) uniform DirectionalLight {
  DLight lights[10];
} directionalLights;

layout(std140) uniform PointLight {
  PLight lights[10];
} pointLights;

out vec4 outColor;

void main() {
  outColor = texture(u_texture, v_texcoord);
  vec3 normal = normalize(v_normal);

  for (int i = 0; i < 10; i++) {
    DLight light = directionalLights.lights[i];

    if (light.color != vec4(0.0)) {
      float lightIntensity = max(dot(normal, light.direction.xyz), MIN_LIGHT_STRENGTH);
      outColor.rgb *= light.color.rgb * lightIntensity;
    }
  }

  for (int i = 0; i < 10; i++) {
    PLight light = pointLights.lights[i];

    if (light.color != vec4(0.0)) {
      vec3 surfaceToLightDirection = normalize(light.position.xyz - v_position);
      float lightIntensity = max(dot(normal, surfaceToLightDirection), 0.2);
      outColor.rgb *= light.color.rgb * lightIntensity;
    }
  }
}
`;
