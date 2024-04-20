export default /* wgsl */`#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec3 a_normal;
in vec2 a_texcoord;

uniform mat4 u_worldViewProjection;
uniform mat4 u_worldInverseTranspose;

out vec2 v_texcoord;
out vec3 v_normal;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_worldViewProjection * a_position;

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;

  // Pass the normal to the fragment shader
  v_normal = mat3(u_worldInverseTranspose) * a_normal;
}
`;
