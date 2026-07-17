// Membungkus script dalam IIFE scope untuk menghindari polusi variabel global (Best Practice Keamanan JS)
(() => {
    const container = document.getElementById('shader-container');
    if (!container) return;

    window.customShaderUniforms = {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2() },
        iMouse: { value: new THREE.Vector2() },
        brightGlow: { value: false },
        silverMode: { value: false },
        disableCenterDimming: { value: false }
    };

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const clock = new THREE.Clock();

    const vertexShader = `
        varying vec2 vTextureCoord;
        void main() {
            vTextureCoord = uv;
            gl_Position = vec4(position, 1.0);
        }
    `;

    const fragmentShader = `
        precision mediump float;
        uniform vec2 iResolution;
        uniform float iTime;
        uniform vec2 iMouse;
        uniform bool brightGlow;
        uniform bool silverMode;
        uniform bool disableCenterDimming;
        varying vec2 vTextureCoord;

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
            vec2 uv = (2.0 * fragCoord - iResolution.xy) / min(iResolution.x, iResolution.y);
            vec2 center = iResolution.xy * 0.5;
            float dist = distance(fragCoord, center);
            float radius = min(iResolution.x, iResolution.y) * 0.5;
            float centerDim = disableCenterDimming ? 1.0 : smoothstep(radius * 0.2, radius * 0.6, dist);

            for(float i = 1.0; i < 10.0; i++){
                uv.x += 0.6 / i * cos(i * 2.5 * uv.y + iTime);
                uv.y += 0.6 / i * cos(i * 1.5 * uv.x + iTime);
            }
            
            if (brightGlow) {
                fragColor = vec4(vec3(0.18, 0.18, 0.22) / abs(sin(iTime - uv.y - uv.x)), 1.0);
            } else if (silverMode) {
                fragColor = vec4(vec3(0.08, 0.09, 0.12) / abs(sin(iTime - uv.y - uv.x)), 1.0);
            } else {
                fragColor = vec4(vec3(0.03, 0.03, 0.04) / abs(sin(iTime - uv.y - uv.x)), 1.0);
            }
            
            if (!disableCenterDimming) {
                fragColor.rgb = mix(fragColor.rgb * 0.2, fragColor.rgb, centerDim);
            }
        }

        void main() {
            vec4 color;
            mainImage(color, vTextureCoord * iResolution);
            gl_FragColor = color;
        }
    `;

    const material = new THREE.ShaderMaterial({ 
        vertexShader, 
        fragmentShader, 
        uniforms: window.customShaderUniforms 
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h);
        window.customShaderUniforms.iResolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize);
    onResize();

    window.addEventListener('mousemove', (e) => {
        window.customShaderUniforms.iMouse.value.set(e.clientX, e.clientY);
    });

    const animate = () => {
        requestAnimationFrame(animate);
        window.customShaderUniforms.iTime.value = clock.getElapsedTime();
        renderer.render(scene, camera);
    };
    animate();
})();
