import { RuleRect } from "./RuleRect";

export class RuleMap{

    public rules :{a:number,b:number,c:number}[][];
    public rects:RuleRect[];
    private rectIndex:number = 0;
    private past    :number = 0;
    private frame   :number = 0;

    constructor(){

        this.rules = [];

        for(let j=0;j<64;j++){
            let listA = [];
            for(let i=0;i<64;i++){
                listA[i] = {
                    a:0,
                    b:0,
                    c:0                    
                };
            }
            this.rules[j] = listA;
        }

        this.rects = [];
        for(let i=0;i<18;i++){
            let rect =new RuleRect()
            this.rects.push(rect);
        }

    }


    public fillRect(
        ruleIndexA:number,
        ruleIndexB:number,
        ruleIndexC:number,
        x:number,
        y:number,
        w:number,
        h:number
    ){


        //if(x<0)x=0;
        //if(y<0)y=0;

        let ww = x+w;
        let hh = y+h;
        
        if(x<0)x=0;
        if(y<0)y=0;
        if(ww<0)ww=0;
        if(hh<0)hh=0;
        if(ww>64) ww=64;
        if(hh>64) hh=64;
        

        for(let j=y;j<hh;j++){
            for(let i=x;i<ww;i++){
                
                this.rules[j][i].a = ruleIndexA;
                this.rules[j][i].b = ruleIndexB;
                this.rules[j][i].c = ruleIndexC;
                
            }
        }

    }


    private makeRect(currentTime:number){

        console.log(currentTime);

        let rect = this.rects[this.rectIndex%this.rects.length];
        rect.reset(currentTime);

        this.rectIndex++;

    }


    public update(frame:number){


        let date = new Date();
        let currentTime = Math.floor(date.getTime()/1000);
        if(currentTime!=(this.past)){

            this.makeRect(currentTime);

        }

        this.past = Math.floor(date.getTime()/1000);



        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){
                this.rules[j][i].a = 0;
                this.rules[j][i].b = 0;
                this.rules[j][i].c = 0;                
            }
        }


        this.frame++;

        for(let i=0;i<this.rects.length;i++){

            if(
                this.frame%this.rects[i].updateFrame==0
            ){
                this.rects[i].update();
            }

            this.fillRect(
                
                this.rects[i].rule1,
                this.rects[i].rule2,                
                this.rects[i].rule3,

                this.rects[i].x,
                this.rects[i].y,
                this.rects[i].w,
                this.rects[i].h
            )

        }
        
    }

}