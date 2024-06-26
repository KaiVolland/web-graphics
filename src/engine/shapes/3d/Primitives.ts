export const Cube = new Float32Array([
  // Front face
  -50, 50, 50,
  -50, -50, 50,
  50, -50, 50,
  -50, 50, 50,
  50, -50, 50,
  50, 50, 50,

  // Back face
  50, 50, -50,
  50, -50, -50,
  -50, 50, -50,
  50, -50, -50,
  -50, -50, -50,
  -50, 50, -50,

  // Right face
  50, 50, 50,
  50, -50, -50,
  50, 50, -50,
  50, 50, 50,
  50, -50, 50,
  50, -50, -50,

  // Left face
  -50, 50, -50,
  -50, -50, -50,
  -50, 50, 50,
  -50, -50, -50,
  -50, -50, 50,
  -50, 50, 50,

  // Bottom face
  50, -50, 50,
  -50, -50, -50,
  50, -50, -50,
  50, -50, 50,
  -50, -50, 50,
  -50, -50, -50,

  // Top face
  50, 50, -50,
  -50, 50, -50,
  -50, 50, 50,
  50, 50, -50,
  -50, 50, 50,
  50, 50, 50,
]);

export const CubeNormals = new Float32Array([
  // Front face
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,

  // Right face
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,

  // Back face
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,
  0, 0, -1,

  // Left face
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,
  0, 0, 1,

  // Bottom face
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,
  0, -1, 0,

  // Top face
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0,
  0, 1, 0
]);

export const CubeTexture = new Float32Array([
  // Front face
  0, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 1,
  1, 0,

  // Front face
  0, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 1,
  1, 0,

  // Front face
  0, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 1,
  1, 0,

  // Front face
  0, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 1,
  1, 0,

  // Front face
  0, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 1,
  1, 0,

  // Front face
  0, 0,
  0, 1,
  1, 0,
  0, 1,
  1, 1,
  1, 0,
]);
