import { XORShift } from "./XORShift";

export class RuleRect{

    public x:number = 0;
    public y:number = 0;
    public w:number = 0;
    public h:number = 0;
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

    reset(seed:number){
        
        let rand = new XORShift(seed*1000);
        
        this.visible=true;

        this.w = Math.floor(rand.random()*22+1);
        this.h = Math.floor(rand.random()*22+1);

        this.x = Math.floor(rand.random()*(64-this.w));
        this.y = 64;//Math.floor(Math.random()*(64-this.h));

        this.rule1 = Math.floor(rand.random()*256);
        this.rule2 = Math.floor(rand.random()*256);
        this.rule3 = Math.floor(rand.random()*256);
        
        this.vx = 0;
        this.vy = -1;

        this.updateFrame=Math.floor(rand.random()*5+5);
    }

    update(){
        
        //ここに毎秒、生成するやつを書く



        //if(Math.random()<0.2){
            this.x += this.vx;
            this.y += this.vy;    
        //}

        if(this.y<-this.h)this.y=64-1;
        if(this.y>=64)this.y = 0;
    }

}