export default /* wgsl */`#version 300 es
# define MIN_LIGHT_STRENGTH 0.1

precision highp float;

// Passed in and varied from the vertex shader.
in vec2 v_texcoord;
in vec3 v_normal;
in vec3 v_position;
in vec3 v_surfaceToView;

uniform sampler2D u_texture;
uniform float u_shininess;

struct PLight {
  vec4 position;
  vec4 color;
};
layout(std140) uniform PointLight {
  PLight lights[10];
} pointLights;

struct SLight
{
  vec4 positionAndConeAngle;
  vec4 colorAndBlurAngle;
  vec4 direction;
};
layout(std140) uniform SpotLight
{
  SLight lights[10];
} spotLights;

out vec4 outColor;

void main() {
  outColor = texture(u_texture, v_texcoord);
  vec3 normal = normalize(v_normal);

  for (int i = 0; i < 10; i++) {
    PLight light = pointLights.lights[i];

    if (light.color != vec4(0.0)) {
      vec3 surfaceToLightDirection = normalize(light.position.xyz - v_position);
      vec3 surfaceToViewDirection = normalize(v_surfaceToView);
      vec3 halfVector = normalize(surfaceToLightDirection + surfaceToViewDirection);

      float light = dot(normal, surfaceToLightDirection);
      float specular = 0.0;

      if (light > 0.0) {
        specular = pow(dot(normal, halfVector), u_shininess);
      }

      outColor.rgb *= light;
      outColor.rgb += specular;
    }
  }

  for (int i = 0; i < 10; i++) {
    SLight light = spotLights.lights[i];

    if (light.positionAndConeAngle != vec4(0.0)) {
      vec3 position = light.positionAndConeAngle.xyz;
      vec3 direction = light.direction.xyz;
      vec3 color = light.colorAndBlurAngle.xyz;
      float coneAngle = light.positionAndConeAngle.w;
      float blurAngle = light.colorAndBlurAngle.w;

      vec3 offset = position - v_position;
      vec3 surfaceToLight = normalize(offset);
      float distance = length(surfaceToLight);
      float angleToSurface = dot(direction, -surfaceToLight);

      float diffuse = max(0.0, dot(surfaceToLight, normal));
      float attenuation = 1.0 / (distance * distance);
      float spot = smoothstep(coneAngle, blurAngle, angleToSurface);

      float brightness = spot * attenuation * diffuse;

      outColor.rgb += color * brightness;
    }
  }

}
`;
