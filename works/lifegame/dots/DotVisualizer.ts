import { Dots } from "./Dots";
import { Forces } from "./Forces";

export class DotsVisualizer{


    dots:Dots;
    doms: HTMLDivElement[] = [];

    constructor(){

        this.dots = new Dots();

        for(let i=0;i<Forces.NUM;i++){

            let dom = document.createElement("div");
            
            dom.style.width = "10px";
            dom.style.height = "10px";
            dom.style.background = "#00f";
            dom.style.border ="1px solid #f00";
            dom.style.position = "absolute";

            dom.style.left = (640*Math.random())+"px"
            dom.style.top = (640*Math.random())+"px"

            dom.style.zIndex = ""+(10000+i);
            document.body.appendChild(dom);

            this.doms.push(dom);

        }

    }


    update(){

        this.dots.update();
        //console.log(this.dots.dots);

        for(let i=0;i<Forces.NUM;i++){

            let dom = this.doms[i];
            let p = this.dots.dots[i];
            //console.log(p);
            if(p){
                dom.style.left = (p.x*10) + "px";
                dom.style.top  = (p.y*10) + "px";    
            }else{
                //console.log("error");
            }

        }

    }


}