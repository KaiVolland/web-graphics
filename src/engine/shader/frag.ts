export default /* wgsl */`#version 300 es

precision highp float;

// Passed in and varied from the vertex shader.
in vec2 v_texcoord;
in vec3 v_normal;

uniform sampler2D u_texture;

struct Light {
  vec4 direction;
  vec4 color;
};

layout(std140) uniform DirectionalLight {
  Light lights[10];
} directionalLights;

out vec4 outColor;

void main() {
  outColor = texture(u_texture, v_texcoord);
  vec3 normal = normalize(v_normal);

  for (int i = 0; i < 10; i++) {
    Light light = directionalLights.lights[i];
    if (!(light.color == vec4(0.0)) && !(light.direction == vec4(0.0))) {
      // TODO: This calculation is buggy. The output is not as expected.
      float strength = dot(normal, light.direction.xyz);
      outColor.rgb *= strength;
    }
  }
}
`;
