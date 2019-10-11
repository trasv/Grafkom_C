precision mediump float;

attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform vec3 translation;
uniform float theta;

void main() {
  fColor = vColor;
  // float distance = 0.5;
  // vec2 translate = vec2(-0.5, -0.5);
  // float dx = 0.5;
  // float dy = -0.5;
  // float dz = 0.0;
  mat4 translate = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translation, 1.0
  );
  mat4 rotate = mat4(
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = translate * rotate * vec4(vPosition, 0.0, 1.0);
}
