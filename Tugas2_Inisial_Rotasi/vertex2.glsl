precision mediump float;

attribute vec2 vPosition2;
attribute vec3 vColor2;
varying vec3 fColor;
uniform vec3 translation2;
uniform float theta;
uniform float scaleX;
uniform float scaleY;

void main() {
  fColor = vColor2;
  mat4 scale = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, scaleY, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0 , 1.0
  );
  mat4 translate2 = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translation2, 1.0
  );
  mat4 rotate = mat4(
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 0.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = scale * rotate * vec4(vPosition2, 0.0, 1.0);
}
