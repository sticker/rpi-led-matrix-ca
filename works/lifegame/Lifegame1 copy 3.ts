import { dir } from 'console';
import { Params } from './Params';
import { RuleMap } from './RuleMap';
import { Rules } from "./Rules";

export class Lifegame1{

    public grid1 :number[][];
    public grid2 :number[][];
    public frames :number[];
    public velocity :number[];
    private isPingPong : boolean = false;
    //private rule:number = 0;
    private ruleMap:RuleMap;
    private frame:number=0;
    

    constructor(ruleMap: RuleMap){
        
        this.grid1 = [];
        this.grid2 = [];
        this.velocity = [];
        this.frames = [];
        this.ruleMap = ruleMap;

        for(let i=0;i<64;i++){
            this.velocity[i]=0;
           
        }
        console.log(this.velocity);

        let valueA = Math.random()<0.5 ? 1 : 0;
        let valueB = 1-valueA;
        let vel = [
            Math.floor(1+Math.random()*9),
            Math.floor(1+Math.random()*9),
            Math.floor(1+Math.random()*9),
            Math.floor(1+Math.random()*9),
            Math.floor(1+Math.random()*9),
            Math.floor(1+Math.random()*9),
            Math.floor(1+Math.random()*9),
            Math.floor(1+Math.random()*9),
        ]
        for(let j=0;j<64;j++){
            
            this.frames[j]=0;

            let listA = [];
            let listB = [];
            let th = [64,32,16,8,4,2,1];
            let height = [32,16,8,4,2,1,1]
            let tgtHeight = 0;


            for(let i=0;i<64;i++){
                
                let value = 0;
                if(j<32){
                    value = i%64<32 ? valueA : valueB;
                    this.velocity[j]=vel[0];
                }else if(j<32+16){
                    value = i%32<16 ? valueA : valueB;
                    this.velocity[j]=vel[1];

                }else if(j<32+16+8){
                    value = i%16<8 ? valueA : valueB;
                    this.velocity[j]=vel[2];

                }else if(j<32+16+8+4){
                    value = i%8<4 ? valueA : valueB;
                    this.velocity[j]=vel[3];

                }else if(j<32+16+8+4+2){
                    value = i%4<2 ? valueA : valueB;
                    this.velocity[j]=vel[4];

                }else if(j<32+16+8+4+2+1){
                    value = i%2<1 ? valueA : valueB;
                    this.velocity[j]=vel[5];

                }else{
                    value = valueA;
                    this.velocity[j]=vel[6];

                }
                //i%th[j%th.length]<th[j%th.length]/2 ? 1 : 0;
                

                listA[i] = value;
                listB[i] = value;
            }

            this.grid1[j] = listA;
            this.grid2[j] = listB;
            
        }

    }

    getGrid():number[][]{
        //return this.grid1;
        return this.isPingPong ? this.grid1 : this.grid2;
    }
    getGrid2():number[][]{
        //return this.grid1;
        return !this.isPingPong ? this.grid1 : this.grid2;
    }


    setPixel(value:number,i:number,j:number){
        
        if(this.isPingPong) this.grid2[j][i] = value;
        else this.grid1[j][i] = value;

    }

    getPixel(i:number,j:number):number{

        if(i<0) i = 63;
        if(j<0) j = 63;
        if(i>=64) i = 0;
        if(j>=64) j = 0;

        return this.isPingPong ? this.grid1[j][i] : this.grid2[j][i];
    }

    getNum(i:number,j:number){
        
        let num = 0;
        num += this.getPixel(i-1,j-1);
        num += this.getPixel(i,j-1);
        num += this.getPixel(i+1,j-1);
        
        num += this.getPixel(i-1,j);
        num += this.getPixel(i+1,j);

        num += this.getPixel(i-1,j+1);
        num += this.getPixel(i,j+1);
        num += this.getPixel(i+1,j+1);

        return num;

    }

    update(ruleIndex:number){

        this.isPingPong = !this.isPingPong;

        for(let j=0;j<64;j++){

            let flag = false;
            this.frames[j]+=this.velocity[j];
            if(this.frames[j]>10){
                this.frames[j]=this.frames[j]%10;
                flag=true;
            }

                for(let i=0;i<64;i++){
                    let p = this.getPixel(i,j);
    
                    let idx = flag?i+1:i;
                    idx=idx%64;
    
                    

                    this.setPixel(p,idx,j)
                
                }                
            
        }

        //this.frame++;
        //if(this.frame>10000)this.frame=0;



        //this.calcBoth(
        //    ruleIndex
        //)
        

    }





    calcBoth(ruleIndex:number){

        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){

                //1d
                    let rule =  this.getRule(i,j,ruleIndex);
                    
                    //if(Math.random()<0.0001)console.log(rule);

                    if(rule >= 256){
                        this.calc2dA(i,j,ruleIndex);
                    }else{
                        this.calc1dA(i,j,ruleIndex);
                    }
                
            }
        }

    }

    calc1d(ruleIndex:number){
        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){
                this.calc1dA(i,j,ruleIndex);
            }
        }
    }

    calc1dA(i:number, j:number, ruleIndex:number ):void{

        let rule =  this.getRule(i,j,ruleIndex);
                    
        let d = Params.dir>=0 ? 1 : -1;
        this.setPixel(
            Rules.getValue1D(
                rule,
                this.getPixel(i-1,j+d),
                this.getPixel(i,j+d),
                this.getPixel(i+1,j+d)
            ),
            i,
            j
        );

    }

    calc2d(ruleIndex:number){
        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){
                this.calc2dA(i,j,ruleIndex);
            }
        }
    }

    calc2dA(i:number, j:number, ruleIndex:number){

        //2d                
        let center = this.getPixel(i,j);
        let num = this.getNum(i,j);
        let rule = this.getRule(i,j,ruleIndex);
        
        if(center==1){
            //survive
            this.setPixel(Rules.getSurvive(rule,num),i,j);
        }else{
            //Birth
            this.setPixel(Rules.getBirth(rule,num),i,j);
        }

        if(rule>0){
            if(Math.random()<0.001){
                //this.setPixel(Math.random()<0.5 ? 1 : 0,i,j);
            }    
        }

    }


    getRule(i:number,j:number,ruleIndex:number):number{

        
        let rule:number = 0;
        switch(ruleIndex){
            case 0:
                rule = this.ruleMap.rules[j][i].a;
                break;
            case 1:
                rule = this.ruleMap.rules[j][i].b;
                break;
            case 2:
                rule = this.ruleMap.rules[j][i].c;
                break;
        }
        return rule;

    }


}