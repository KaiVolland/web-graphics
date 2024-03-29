export default /* wgsl */`#version 300 es

layout(location = 0) in vec2 aPosition;
out vec2 fragCoord;

void main()
{
    fragCoord = aPosition;
    gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;
