export default /* wgsl */`#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;

uniform mat4 u_transformation;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_transformation * a_position;
}
`;
