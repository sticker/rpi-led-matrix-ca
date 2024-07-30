import { Dots } from "../dots/Dots";
import { Forces } from "../dots/Forces";
import { CA } from "./CA";

export class CAMain{

    private _dots   :Dots;
    private _ca     :CA;
    private _output:Uint8Array;// = new Uint8Array(64*64*3);
    private _flag:boolean = false;
    private _count:number = 0;

    constructor(){

        this._output = new Uint8Array(64*64*3);
        this._dots  = new Dots();
        this._ca    = new CA();
    }

    update(){
        

        if(this._count++%60==0){
            this._flag=!this._flag;
            Forces.setRandom();
            console.log("setRandom");
            if(this._flag){
                //this._dots.update();
                //this._ca.setGrid(this._dots.getGrids());
            }else{
                
            }
    
        }

        //this._dots.dots[this._count%this._dots.dots.length].visible = true;

        //this._dots.setVisible(0.5+0.5*Math.sin(this._count*0.01));

       //if(this._flag){
       // this._ca.update(0);
       //}else{
        this._dots.update();
       //}
        
        this.getGrid();
    }



    getGrid():Uint8Array{

        //let list = this._dots.getGrids();
       
        let list1 = this._ca.getGrid();
        let list2 = this._dots.getGrids();
        let colors2 = this._dots.getColors();

        for(let i=0;i<64;i++){
            for(let j=0;j<64;j++){
                
                let idx = i+j*64;

                this._output[idx*3+0] = 0;
                this._output[idx*3+1] = 0;
                this._output[idx*3+2] = 0;
                
                switch(colors2[j][i]){
                    case 0:
                        this._output[idx*3+0] = this.getValue(idx, i,j, list1, list2);
                        break;
                    case 1:
                        this._output[idx*3+1] = this.getValue(idx, i,j, list1, list2);
                        break;
                    case 2:
                        this._output[idx*3+2] = this.getValue(idx, i,j, list1, list2);

                        break;
                }

            }
        }

        let nn = Math.floor(Math.sin(this._count*0.1)*2+2);
        let res = Math.pow(2,nn);
        this.changeResolution(res);

        return this._output;

    }

    changeResolution(res:number){

        //console.log(res);
        for(let j=0;j<64;j+=res){
            for(let i=0;i<64;i+=res){
            
                let rr = 0; 
                let gg = 0;
                let bb = 0;
                for(let jj=0;jj<res;jj++){
                    for(let ii=0;ii<res;ii++){
                        let idx = (i+ii)+(j+jj)*64;
                        
                        rr=Math.max(this._output[idx*3+0],rr);
                        gg=Math.max(this._output[idx*3+1],gg);
                        bb=Math.max(this._output[idx*3+2],bb);

                    }
                }
                for(let jj=0;jj<res;jj++){
                    for(let ii=0;ii<res;ii++){
                        let idx = (i+ii)+(j+jj)*64;
                        
                        this._output[idx*3+0] = rr;
                        this._output[idx*3+1] = gg;
                        this._output[idx*3+2] = bb;
                        
                    }
                }


            }
        }
          

    }


    getValue(idx:number, i:number,j:number, list1:number[][],list2:number[][]):number{

        //list2[j][i];
        //this._output[idx*3+1] = list2[(j)%64][(i)%64]*255;
        let output = 0;
        output = list2[j][i] > 70 ? 255 : 0;
        //if(list2[j][i]>5 && list2[j][i]<70){
        //    output =(i%2+j%2)%2==0 ? 255 : 0;
        //}
        return output;

    }


}