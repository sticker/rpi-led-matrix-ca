import { Dot } from "./Dot";
import { Forces } from './Forces';

//particle lifeを実装する
export class Dots{

    public dots:Dot[];
    public grids    :number[][];
    public colors   :number[][];


    constructor(){

        Forces.init();
        this.dots = [];
        this.colors = [];
        this.grids =[];

        for(let j=0;j<Forces.WIDTH;j++){
            let list = [];
            let list2 = [];
            for(let i=0;i<Forces.HEIGHT;i++){
                list[j]=0; 
                list2[j]=0;               
            }
            this.grids.push(list);
            this.colors.push(list2);
        }
        //this.grids[63][2]=99;


        for(let i=0;i<Forces.NUM;i++){
            let p = new Dot(i);            
            this.dots.push(p);
        }

    }


    update(){

        let radius      = Forces.RADIUS;
        let radius2     = Forces.RADIUS2;
        let radiusSq    = radius * radius;
        let radius2Sq   = radius2 * radius2;

        //console.log(this.dots.length)

        for(let i=0;i<this.dots.length;i++){

            let p1 = this.dots[i];
            if(!p1.visible) continue;

            let numView = 0;
            let vx:number = 0;
            let vy:number = 0;

            let numView2 = 0;
            let vx2:number = 0;
            let vy2:number = 0;

           
            for(let j=0;j<this.dots.length;j++){
                let p2 = this.dots[j];

                if(i==j)continue;

                let dx = p1.x - p2.x;//他へ向かうベクトル
                let dy = p1.y - p2.y;//他へ向かうベクトル
                let dist = ( dx*dx+dy*dy );

                if(dist<radius2Sq){
                    let scl = 1 - dist / (radius2Sq);
                    
                    vx2 += Forces.strength2 * dx * scl;
                    vy2 += Forces.strength2 * dy * scl;
                    numView2++;
                    //let amp = Math.sqrt(radius2Sq);
                    //let rad = Math.atan2(dy,dx);
                    //p1.x = p2.x + amp*Math.cos(rad);
                    //p1.y = p2.y + amp*Math.sin(rad);
                    //continue;
                }
                if(dist<radiusSq){
                    let scl = 1 - dist / (radiusSq);
                    let force = Forces.strength1 * Forces.getForce(p1,p2);
                    vx += -dx * force * scl;
                    vy += -dy * force * scl;
                    numView++;
                }
            }
            
            //console.log(i,numView,numView2);
            //p1.vx*=0.99;
            //p1.vy*=0.99;//Params.masatsu;

            //console.log(numView,numView2);

            if(numView>0){
                p1.vx += vx/numView;
                p1.vy += vy/numView;

            }
            if(numView2>0){
                //p1.vx += vx2/numView2;
                //p1.vy += vy2/numView2;
                p1.x += vx2/numView2;
                p1.y += vy2/numView2;

                //let theta = Math.atan2(dy, dx);//direction to other hao
                //if(theta == 0) {
                //    theta = Math.random()*2*Math.PI;
                //}

            }
            
           
            let vec = this.limitVector(p1.vx, p1.vy, Forces.maxSpeed);
            p1.vx=vec.x;
            p1.vy=vec.y;

            p1.x += p1.vx;// * p1.multiply;
            p1.y += p1.vy;// * p1.multiply;

            //this.dots[i]=p1;

            if(p1.x<0){
                p1.x = 0;//Forces.WIDTH-1;
                p1.vx *= -1;
            } 
            if(p1.y<0){
                p1.y = 0;//Forces.HEIGHT-1;
                p1.vy *= -1;
            }
            if(p1.x>=Forces.WIDTH){
                p1.x =Forces.WIDTH-1;
                p1.vx *= -1;
            }
            if(p1.y>=Forces.HEIGHT){
                p1.y =Forces.HEIGHT-1;
                p1.vy *= -1;
            }

        }

    }

    setVisible(ratio:number){
        for(let i=0;i<this.dots.length;i++){
            this.dots[i].visible = i < this.dots.length*ratio;            
        }
    }

    getColors(){
        return this.colors;
    }

    getGrids(){

        //console.log(">>>>",this.grids)
        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){
                //console.log(this.grids[j][i])
                this.grids[j][i] -= 10;
                if(this.grids[j][i]<0){
                    this.grids[j][i]=0;
                }
            }
        }
        for(let i=0;i<this.dots.length;i++){
            
            let xx = Math.floor(this.dots[i].x)%64;
            let yy = Math.floor(this.dots[i].y)%64;
            this.grids[yy][xx] = 155;
            this.colors[yy][xx] = this.dots[i].type;
        }

        
        return this.grids;

    }




    
    limitVector(vx:number, vy:number, maxValue:number):{x:number,y:number} {
        // ベクトルの長さ（絶対値）を計算
        let magnitude = Math.sqrt(vx * vx + vy * vy);
        
        // 長さが maxValue を超えている場合
        if (magnitude > maxValue) {
            // スケーリング係数を計算
            let scale = maxValue / magnitude;
            // vx と vy をスケールダウン
            vx *= scale;
            vy *= scale;
        }
        
        return { x: vx, y: vy };
    }



}