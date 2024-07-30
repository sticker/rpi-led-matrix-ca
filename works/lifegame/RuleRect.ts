import { Params } from "./Params";
import { XORShift } from "./XORShift";

export class RuleRect{

    public x:number = 0;
    public y:number = 0;
    public w:number = 0;
    public h:number = 0;
    public tgtH:number = 0;
    public baseY:number = 0;
    public rule1:number = 0;
    public rule2:number = 0;
    public rule3:number = 0;
    
    public vx:number = 0;
    public vy:number = 0;

    public visible:boolean=false;

    public updateFrame:number = 0;

    constructor(){

        this.init();

    }

    init(){
        //this.reset();
    }

    reset(
        seed:number,
        dir:number,
        sec:number
    ){
        
        let rand = new XORShift(seed*1000);
        
        this.visible=true;

        this.w = Math.floor(rand.random()*sec*0.6+1);
        


        if(dir==1 || dir==-1){
            this.h = Math.floor(rand.random()*32+1);
            this.x = Math.floor(rand.random()*(64-this.w));
            this.y = dir == 1 ? 64 : -this.h;
            this.vx = 0;
            this.vy = -1;    
            this.rule1 = Math.floor(rand.random()*512);
            this.rule2 = Math.floor(rand.random()*512);
            this.rule3 = Math.floor(rand.random()*512);
            
            if(rand.random()<0.1) this.rule1 = 0;
            if(rand.random()<0.1) this.rule2 = 0;
            if(rand.random()<0.1) this.rule3 = 0;

        }else{
            this.h = Math.floor(rand.random()*63+1);
            this.x = Math.floor(rand.random()*(64-this.w));
            this.y = (64-this.h);
            this.vx = 0;
            this.vy = 0;    
            this.rule1 = Math.floor(rand.random()*512);
            this.rule2 = Math.floor(rand.random()*512);
            this.rule3 = Math.floor(rand.random()*512);
            
            if(rand.random()<0.1) this.rule1 = 0;
            if(rand.random()<0.1) this.rule2 = 0;
            if(rand.random()<0.1) this.rule3 = 0;            
        }


        

        if(Params.caType==2){
            this.tgtH = this.h;
            //this.baseY = this.y+this.tgtH;
            this.h=0;
            if(sec%3==0){
                this.rule1 = 0;
                this.rule2 = 0;
                this.rule3 = 0;
            }
            this.updateFrame=4;
        }else{
            this.updateFrame=Math.floor(rand.random()*8+8);

        }




    }


    
    update(d:number){
        
        //ここに毎秒、生成するやつを書く

        if(Params.caType==2){
            //this.h+=(this.tgtH-this.h)/5;
            this.h+=2;
            if(this.h>this.tgtH) this.h=this.tgtH;
            this.y=64-Math.floor(this.h);
        }else{
            this.x += this.vx;
            this.y += this.vy*d;    
        }

        //if(Math.random()<0.2){
        //}

        //if(this.y<-this.h)this.y=64-1;
        //if(this.y>=64)this.y = 0;
    }

}