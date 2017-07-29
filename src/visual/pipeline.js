import * as THREE from "three"

var pipe = {
    _rdrr : new THREE.WebGLRenderer({alpha : true}),
    _camera : new THREE.Camera(),
    _geometry : new THREE.PlaneGeometry(2.0, 2.0),
};

(function initialize() {
    this._rdrr.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this._rdrr.domElement);
    
    this._default_uniform = { 
        unif_texture : { type : "t", value : null }
    };

    this._default_program = new THREE.Scene();
    this._default_program.add(new THREE.Mesh(
        this._geometry,
        new THREE.ShaderMaterial({
            transparent : true,
            uniforms : this._default_uniform,
            vertexShader : `
                varying vec2 vtex; void main(void) { vtex = uv; gl_Position = vec4(position, 1.0); }
            `,
            fragmentShader : `
                uniform sampler2D unif_texture; varying vec2 vtex; void main(void) { gl_FragColor = texture2D(unif_texture, vtex);}
            `
        })
    ));
}).bind(pipe)();


export const renderToTexture = (function(program, targetTexture) {
    this._rdrr.render(program, this._camera, targetTexture);
}).bind(pipe);

export const renderToDisplay = (function(program) {
    this._rdrr.render(program, this._camera);
}).bind(pipe);

export const renderTextureToTexture = (function(texture, targetTexture) {
    this._default_uniform.unif_texture.value = texture;
    this._rdrr.render(this._default_program, this._camera, targetTexture);
}).bind(pipe);

export const renderTextureToDisplay = (function(texture) {
    this._default_uniform.unif_texture.value = texture;
    this._rdrr.render(this._default_program, this._camera);
}).bind(pipe);

export class FragmentProgram extends THREE.Scene {
    constructor(fragShader, unif) {
        super();
        this.add(new THREE.Mesh(pipe._geometry, new THREE.ShaderMaterial({
            transparent : true,
            uniforms : unif,
            fragmentShader : fragShader,
            vertexShader : `
            varying vec2 vtex;
            void main(void) {
                vtex = uv;
                gl_Position = vec4(position, 1.0);
            }
            `,
        })));
        this._type = "rendertarget"
    }
}

export class Texture extends THREE.WebGLRenderTarget {
    constructor(width, height, option) {
        super(width || 1920, height || 1080, option || {
            minFilter : THREE.LinearFilter,
            magFilter : THREE.LinearFilter,
            type : THREE.FloatType,
            wrapS : THREE.ClampToEdgeWrapping,
            wrapT : THREE.ClampToEdgeWrapping,
        });
        this._type = "texture";
    }
}
