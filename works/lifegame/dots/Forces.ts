import { Dot } from "./Dot";

export class Forces{

    private static forces: { [name: string]: number } = {};
    public static NUM:number = 20;
    
    public static RADIUS:number = 10;
    public static RADIUS2:number = 8;
    public static strength1:number = 0.15;
    public static strength2:number = 0.15;
    public static WIDTH:number = 64;
    public static HEIGHT:number = 64;
    public static maxSpeed:number = 1;


    public static init(){
        
        //AとB
        
        this.setRandom();

    }

    public static setRandom(){
        let num = Forces.NUM;
        for(let i = 0; i < num; i++){
            for(let j = 0; j < num; j++){
                    this.forces[i+"_"+j] = Math.random()>0.5 ? -1 : 1;
            }
        }

        /*
        this.forces["0_0"] = 1;
        this.forces["0_1"] = -1;
        this.forces["0_2"] = -1;
        
        this.forces["1_0"] = -1;
        this.forces["1_1"] = 1;
        this.forces["1_2"] = -1;
        
        this.forces["2_0"] = -1;
        this.forces["2_1"] = -1;
        this.forces["2_2"] = 1;
        */

    }

    public static getForce(p1:Dot,p2:Dot):number{

        //let rr = this.forces[p1.index+"_"+p2.index];
        let rr = this.forces[p1.type+"_"+p2.type];

        return rr;

    }


}
