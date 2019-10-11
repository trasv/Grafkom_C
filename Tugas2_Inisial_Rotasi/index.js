(function() {

    glUtils.SL.init({ callback: function() { main(); } });

    function main() {

        var canvas = document.getElementById("glcanvas");
        var canvas2 = document.getElementById("glcanvas2");
        var gl = glUtils.checkWebGL(canvas);
        var gl2 = glUtils.checkWebGL(canvas2);

        window.addEventListener('resize', resizer);
        window.addEventListener('resize2', resizer);

        var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
        var vertexShader2 = glUtils.getShader(gl2, gl2.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
        var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
        var fragmentShader2 = glUtils.getShader(gl2, gl2.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
        var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
        var program2 = glUtils.createProgram(gl2, vertexShader2, fragmentShader2);

        gl.useProgram(program);
        gl2.useProgram(program2);



        var linesVertices = new Float32Array([-0.3, 0.0, 1.0, 1.0, 1.0, -0.1, 0.0, 1.0, 1.0, 1.0, -0.1, -0.8, 1.0, 1.0, 1.0,
            0.1, -0.8, 1.0, 1.0, 1.0,
            0.1, 0.0, 1.0, 1.0, 1.0,
            0.3, 0.0, 1.0, 1.0, 1.0,
            0.3, +0.4, 1.0, 1.0, 1.0, -0.3, +0.4, 1.0, 1.0, 1.0
        ]);
        var triangleVertices2 = [
            // x, y,      r, g, b
            -0.3, 0.0, 1.0, 1.0, 1.0, -0.3, 0.4, 1.0, 1.0, 1.0,
            0.3, 0.0, 1.0, 1.0, 1.0,
            0.3, 0.4, 1.0, 1.0, 1.0, -0.3, 0.4, 1.0, 1.0, 1.0,
            0.3, 0.0, 1.0, 1.0, 1.0, -0.1, 0.0, 1.0, 1.0, 1.0, -0.1, -0.8, 1.0, 1.0, 1.0,
            0.1, -0.8, 1.0, 1.0, 1.0, -0.1, 0.0, 1.0, 1.0, 1.0,
            0.1, 0.0, 1.0, 1.0, 1.0,
            0.1, -0.8, 1.0, 1.0, 1.0
        ];

        // Link antara CPU Memory dengan GPU Memory
        var triangleVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);

        var triangleVertexBufferObject2 = gl2.createBuffer();
        gl2.bindBuffer(gl2.ARRAY_BUFFER, triangleVertexBufferObject2);

        // Link untuk attribute
        var vPosition = gl.getAttribLocation(program, 'vPosition');
        var vColor = gl.getAttribLocation(program, 'vColor');
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);

        var vPosition2 = gl2.getAttribLocation(program2, 'vPosition2');
        var vColor2 = gl2.getAttribLocation(program2, 'vColor2');
        gl2.vertexAttribPointer(vPosition2, 2, gl2.FLOAT, gl2.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
        gl2.vertexAttribPointer(vColor2, 3, gl2.FLOAT, gl2.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
        gl2.enableVertexAttribArray(vPosition2);
        gl2.enableVertexAttribArray(vColor2);

        function drawShapes(type, vertices, n) {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.drawArrays(type, 0, n);
        }

        function drawShapes2(type, vertices, n) {
            gl2.bufferData(gl2.ARRAY_BUFFER, new Float32Array(vertices), gl2.STATIC_DRAW);
            gl2.drawArrays(type, 0, n);
        }

        var translation = gl.getUniformLocation(program, 'translation');
        gl.uniform3f(translation, 0.0, 0.0, 0.0);
        var translation2 = gl2.getUniformLocation(program2, 'translation2');
        gl2.uniform3f(translation2, 0.0, 0.0, 0.0);

        var scaleXLocation = gl2.getUniformLocation(program2, 'scaleX');
        var scaleYLocation = gl2.getUniformLocation(program2, 'scaleY');
        var scaleX = 1.0;
        var scaleY = 1.0;
        var melebar = 1;

        function resizer() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            canvas2.width = window.innerWidth;
            canvas2.height = window.innerHeight;
            gl2.viewport(0, 0, gl2.canvas2.width, gl2.canvas2.height);
            draw();
        }

        var thetaLocation = gl.getUniformLocation(program, 'theta');
        var theta = 0.0;

        function render() {
            // Bersihkan layar jadi hitam
            gl.clearColor(0.0, 0.0, 0.0, 1.0);

            // Bersihkan buffernya canvas
            gl.clear(gl.COLOR_BUFFER_BIT);

            theta += 0.0069;
            gl.uniform1f(thetaLocation, theta);

            drawShapes(gl.LINE_LOOP, linesVertices, 8);
            requestAnimationFrame(render);
        };
        render();

        function render2() {
            // Bersihkan layar jadi hitam
            gl2.clearColor(0.0, 0.0, 0.0, 1.0);

            // Bersihkan buffernya canvas
            gl2.clear(gl2.COLOR_BUFFER_BIT);

            if (scaleX >= 1) melebar = -1;
            else if (scaleX <= -1) melebar = 1;
            scaleX += 0.0069 * melebar;
            gl2.uniform1f(scaleXLocation, scaleX);
            gl2.uniform1f(scaleYLocation, scaleY);

            drawShapes2(gl2.TRIANGLES, triangleVertices2, 12);
            requestAnimationFrame(render2);
        };
        render2();
        // resizer();

    }
})();