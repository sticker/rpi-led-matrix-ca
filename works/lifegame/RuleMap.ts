import { Params } from "./Params";
import { RuleRect } from "./RuleRect";

export class RuleMap{

    public rules :{a:number,b:number,c:number}[][];
    public rects:RuleRect[];
    private rectIndex:number = 0;
    private past    :number;
    private date    :Date;

    private frame   :number = 0;
    //private dir     :number = 1;

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
        for(let i=0;i<30;i++){
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

        let rect = this.rects.shift();//[this.rectIndex%this.rects.length];
        rect.reset(
            currentTime,
            Params.dir,
            this.date.getSeconds()
        );
        this.rects.push(rect);

        this.rectIndex++;

    }


    public update(frame:number){


        this.date = new Date();
        
        let currentTime = Math.floor(this.date.getTime()/1000);


        if(currentTime!=(this.past)){

            if(currentTime%2==0) this.makeRect(currentTime);

            //console.log(currentTime);
            //console.log(this.date.getSeconds());

            if(this.date.getSeconds()==0){
                //this.dir = this.dir==1 ? -1 : 1;
            }

        }

        this.past = Math.floor(this.date.getTime()/1000);




            for(let j=0;j<64;j++){
                for(let i=0;i<64;i++){
                    this.rules[j][i].a = 0;
                    this.rules[j][i].b = 0;//Math.floor(Math.random()*512);
                    this.rules[j][i].c = 0;//Math.floor(Math.random()*512);                
                }
            }  


        this.frame++;
        let speed = 1;//(this.date.getTime()>50) ? 2 : 1;

        for(let i=0;i<this.rects.length;i++){

            let updateFrame = Math.floor(this.rects[i].updateFrame/speed);
            if(updateFrame<=1) updateFrame = 1;

            //あるフレームのみ更新する
            if(
                this.frame % updateFrame == 0
            ){
                
                this.rects[i].update(Params.dir);
                
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