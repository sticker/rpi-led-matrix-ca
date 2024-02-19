import { Lifegame } from "./Lifegame";

export class LifegameVisualizer{


    lifegame:Lifegame;
    doms: HTMLElement[][]

    constructor(lifegame:Lifegame){

        this.lifegame = lifegame;
        this.doms = [];
        for(let j=0;j<64;j++){

            let listA = [];

            for(let i=0;i<64;i++){
                listA[i] = document.createElement("div");
                listA[i].style.position="absolute";
                listA[i].style.background ="#000";

                let ww = 10;
                let hh = 10;

                
                listA[i].style.width=ww+"px";
                listA[i].style.height=hh+"px";
                
                listA[i].style.left=(i*ww)+"px";
                listA[i].style.top=(j*hh)+"px";
                listA[i].innerHTML=""
                document.body.appendChild(listA[i]);        
            }

        

            this.doms[j] = listA;
            
        }

    }

    update(){

        let d = this.lifegame.output;
        let dom = document.getElementById("hoge");
        dom.innerHTML = ""

        //console.log(d);
        
        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){

                let idx = i+j*64;

                let rr =  (d[idx*3+0]<128 ? "0" : "f");
                let gg =  (d[idx*3+1]<128 ? "0" : "f");
                let bb =  (d[idx*3+2]<128 ? "0" : "f");

                //this.doms[j][i].innerHTML = rr=="0" ? "0" : "1"
                this.doms[j][i].style.borderRadius="100px";
                this.doms[j][i].style.background = "#"+rr+gg+bb;
                //dom.innerHTML += (d[idx*3+0]>128 ? "1" : "_");
                
            }
            //dom.innerHTML += "<br/>"
        }



    }



}