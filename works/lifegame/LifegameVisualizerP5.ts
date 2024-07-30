
import { Lifegame } from "./Lifegame";
import p5 from 'p5';
import { RuleMap } from "./RuleMap";
import { Rules } from "./Rules";

export class LifegameVisualizerP5{


    public _width       :number = 512;
    public _height      :number = 512;
    private _p5         :p5;
    private _dom        :HTMLElement;
    private _bg         :number=0;
    private _callback   :()=>void;
    private lifegame:Lifegame;
    private _visible:boolean=false;

    constructor(lifegame:Lifegame){
        this.lifegame = lifegame;
        this.init(null)
    }

    init(callback:()=>void){

        this._callback=callback;

        new p5((p: p5)=>{
            /** 初期化処理 */
            p.setup = ()=>{
                this.setUp();                
            }
            /** フレームごとの描画処理 */
            p.draw = ()=> {
                //this.draw();
            }
            p.mouseClicked = ()=>{
                this._visible=!this._visible;
            }

            this._p5 = p;
        });
        
    }


    setUp(){
        let r = this._p5.createCanvas(
            512,
            512
        );
        r.id('p5canvas');
        this._p5.frameRate(30);
        this._p5.noLoop();
        this._p5.noSmooth();
        
    }


    reset(){
        
    }

    update(){
        this.draw1();
    }

    draw1(){

        let d = this.lifegame.output;

        this._p5.background(0,0,0)
        this._p5.noStroke();
        let size:number=6;

    

        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){

                let idx = i+j*64;
                
                
                if(d[idx*3+0]>0 || d[idx*3+1]>0 || d[idx*3+2]>0 ){
                    this._p5.fill(d[idx*3+0],d[idx*3+1],d[idx*3+2]);
                    this._p5.rect(
                        i*size,
                        j*size,
                        size,
                        size
                    );
                }

            }
            //dom.innerHTML += "<br/>"
        }        

        let rects =         this.lifegame.ruleMap.rects;
        this._p5.stroke(255,0,0);
        this._p5.noFill();
        this._p5.rect(
            0,0,64*size,64*size
        );


        if(this._visible){
            for(let i=0;i<rects.length; i++){
            
                this._p5.text(
                    rects[i].rule1%Rules.rules.length+"_"
                    +rects[i].rule2%Rules.rules.length+"_"
                    +rects[i].rule3%Rules.rules.length,
                    rects[i].x*size,
                    rects[i].y*size
                );
                this._p5.rect(
                    rects[i].x*size,
                    rects[i].y*size,
                    rects[i].w*size,
                    rects[i].h*size
                );

            }    
        }


    }

}
