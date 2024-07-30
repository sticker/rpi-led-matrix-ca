export class Dot{

    public x:number = 0;
    public y:number = 0;
    public vx:number = 0;
    public vy:number = 0;
    public fx:number = 0;
    public fy:number = 0;
    public index:number = 0;
    public type:number = 0;
    public visible:boolean = true;
    
    constructor(idx:number){
        
        this.index = idx;
        this.type = Math.floor(Math.random()*3);
        this.x = Math.random()*64;
        this.y = Math.random()*64;
        this.vx = Math.random()*2-1;
        this.vy = Math.random()*2-1;
        this.visible=true;

    }

    update(){

        this.x += this.vx;
        this.y += this.vy;

        
    }

}