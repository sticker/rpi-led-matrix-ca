import { RuleMap } from './RuleMap';
import { Rules } from "./Rules";

export class Lifegame1{

    public grid1 :number[][];
    public grid2 :number[][];
    private isPingPong : boolean = false;
    //private rule:number = 0;
    private ruleMap:RuleMap;

    constructor(ruleMap: RuleMap){
        
        this.grid1 = [];
        this.grid2 = [];

        this.ruleMap = ruleMap;

        for(let j=0;j<64;j++){

            let listA = [];
            let listB = [];

            for(let i=0;i<64;i++){
                let value = 1;//Math.random()<0.5 ? 1 : 0 
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

        this.calc1d(ruleIndex);
        

    }

    calc1d(ruleIndex:number){
        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){

                //1d
                    let rule =  this.getRule(i,j,ruleIndex);
                    
                    this.setPixel(
                        Rules.getValue1D(
                            rule,
                            this.getPixel(i-1,j+1),
                            this.getPixel(i,j+1),
                            this.getPixel(i+1,j+1)
                        ),
                        i,
                        j
                    );
                

            }
        }
    }

    calc2d(ruleIndex:number){
        for(let j=0;j<64;j++){
            for(let i=0;i<64;i++){


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

                if(Math.random()<0.001){
                    //this.setPixel(Math.random()<0.5 ? 1 : 0,i,j);
                }
                

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