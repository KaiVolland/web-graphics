export default /* wgsl */`#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec3 a_normal;
in vec2 a_texcoord;

uniform mat4 u_worldViewProjection;
uniform vec3 u_cameraPosition;

out vec2 v_texcoord;
out vec3 v_normal;
out vec3 v_position;
out vec3 v_surfaceToView;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_worldViewProjection * a_position;

  v_position = gl_Position.xyz;

  // Pass the texcoord to the fragment shader.
  v_texcoord = a_texcoord;

  // Pass the normal to the fragment shader
  v_normal = a_normal;

  v_surfaceToView = u_cameraPosition - v_position;
}
`;
