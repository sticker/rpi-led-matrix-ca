import { dir } from 'console';
import { Params } from './Params';
import { RuleMap } from './RuleMap';
import { Rules } from "./Rules";

export class Lifegame1{

    public grid1 :number[][];
    public grid2 :number[][];
    public frames :number[];
    public velocity :number[];
    public velocity2 :number[];
    
    private isPingPong : boolean = false;
    //private rule:number = 0;
    private ruleMap:RuleMap;
    private frame:number=0;
    

    constructor(ruleMap: RuleMap){
        
        this.grid1 = [];
        this.grid2 = [];
        this.velocity = [];
        this.velocity2 = [];
        
        this.frames = [];
        this.ruleMap = ruleMap;

        for(let i=0;i<64;i+=4){
                       
            let n = Math.floor(1+Math.random()*19);
            let n2 = Math.floor(1+Math.random()*2);
            
            this.velocity[i+0]= n;
            this.velocity[i+1] = n;
            this.velocity[i+2] = n;
            this.velocity[i+3] = n;
            this.velocity2[i+0] = n2;
            this.velocity2[i+1] = n2;
            this.velocity2[i+2] = n2;
            this.velocity2[i+3] = n2;
                        
        }

        for(let j=0;j<64;j++){

            this.frames[j]=0; 
            let listA = [];
            let listB = [];

            for(let i=0;i<64;i++){
                //let value = i%(j+1)<=(j+1)/2 ? 1 : 0; 
                let value = (j+i)%8<4?1:0;
                if((j+i)%4<2) value = 1-value;

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
            if(this.frames[j]>20){
                this.frames[j]=this.frames[j]%20;
                flag=true;
            }

                for(let i=0;i<64;i++){
                    let p = this.getPixel(i,j);
    
                    let idx = flag?i+this.velocity2[j]:i;
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