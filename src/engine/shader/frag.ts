export default /* wgsl */`#version 300 es

precision highp float;

// // the varied color passed from the vertex shader
in vec4 v_color;

// Passed in and varied from the vertex shader.
in vec3 v_normal;

uniform vec3 u_reverseLightDirection;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
  outColor = v_color;

  // because v_normal is a varying it's interpolated
  // so it will not be a unit vector. Normalizing it
  // will make it a unit vector again
  vec3 normal = normalize(v_normal);

  // compute the light by taking the dot product
  // of the normal to the light's reverse direction
  float light = dot(normal, u_reverseLightDirection);

  // Lets multiply just the color portion (not the alpha)
  // by the light
  outColor.rgb *= light;
}
`;
