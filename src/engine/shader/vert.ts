export default /* wgsl */`#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;
in vec4 a_color;

uniform mat4 u_transformation;

// a varying the color to the fragment shader
out vec4 v_color;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_transformation * a_position;

  // Pass the color to the fragment shader.
  v_color = a_color;
}
`;
