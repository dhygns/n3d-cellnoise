import * as pipeline from "./pipeline.js"



export default class Visual {
    constructor(){
        this.mainUniform = { 
            unif_mouse : { 
                type : "2f",
                value : [0.0, 0.0]
            }
        };
        this.subTexture = 

        this.mainProgram = new pipeline.FragmentProgram(
            `
            uniform vec2 unif_mouse;
            varying vec2 vtex;
            
            float rand(vec2 co){
                return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
            }
            
            // 4 x 4 size

            vec4 snoise(vec2 st, vec2 sc) {
                vec2 reso = st * sc;
                vec4 retc = vec4(0.0);
                float retl = 1.0;
                for(float dx = -1.0 ; dx <= 1.0; dx+=1.0)
                for(float dy = -1.0 ; dy <= 1.0; dy+=1.0){
                    vec2 grid = floor(reso - vec2(dx, dy));
                    grid += vec2(rand(grid.xy), rand(grid.yx * 0.1));
                    if(retl > length(grid / sc - st)) {
                        retl = length(grid / sc - st);
                        retc = vec4(0.2) + 0.8 * vec4(rand(grid / sc), rand(grid * sc), rand(grid.yx / sc), 1.0);
                    }
                }
                if(retl > length(st - unif_mouse)) retc = vec4(0.0, 0.0, 0.0, 1.0);

                return retc;//vec4(colo, 0.0, 1.0);
            }

            void main(void) {
                gl_FragColor = snoise(vtex, vec2(4.0, 4.0));
            }
            `,
            this.mainUniform           
        )


        window.addEventListener("mousemove", ({pageX, pageY})=>{
            this.mainUniform.unif_mouse.value[0] = pageX / window.innerWidth;
            this.mainUniform.unif_mouse.value[1] = 1.0 - pageY / window.innerHeight;
        })  
    }

    //event

    fixedUpdate(timer) {
        
    }

    update(timer) {
        pipeline.renderToDisplay(this.mainProgram);
    }   
}