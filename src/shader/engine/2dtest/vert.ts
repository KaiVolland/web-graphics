export default /* wgsl */`#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

uniform mat3 u_transformation;

void main() {
  // Multiply the position by the matrix.
  gl_Position = vec4((u_transformation * vec3(a_position, 1)).xy, 0, 1);
}
`;
