export default /* wgsl */`#version 300 es

precision highp float;

// Passed in and varied from the vertex shader.
in vec2 v_texcoord;
in vec3 v_normal;
in vec3 v_surfaceToLight;
in vec3 v_surfaceToView;

uniform sampler2D u_texture;

// we need to declare an output for the fragment shader
out vec4 outColor;

uniform float u_shininess;
uniform vec3 u_lightColor;
uniform vec3 u_specularColor;

void main() {
  outColor = texture(u_texture, v_texcoord);

  // because v_normal is a varying it's interpolated
  // so it will not be a unit vector. Normalizing it
  // will make it a unit vector again
  vec3 normal = normalize(v_normal);

  vec3 surfaceToLightDirection = normalize(v_surfaceToLight);
  vec3 surfaceToViewDirection = normalize(v_surfaceToView);
  vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

  // compute the light by taking the dot product
  // of the normal to the light's reverse direction
  float light = dot(normal, surfaceToLightDirection);
  float specular = 0.0;
  if (light > 0.0) {
    specular = pow(dot(normal, halfVector), u_shininess);
  }

  // Lets multiply just the color portion (not the alpha)
  // by the light
  outColor.rgb *= light * u_lightColor;

  // Just add in the specular
  outColor.rgb += specular * u_specularColor;
}
`;
