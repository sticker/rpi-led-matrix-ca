import { ClockSeg } from "./ClockSeg"

export class Clock{


    hh0:ClockSeg;
    hh1:ClockSeg;

    mm0:ClockSeg;
    mm1:ClockSeg;
    
    ss0:ClockSeg;
    ss1:ClockSeg;
    

    constructor(){

        this.hh0 = new ClockSeg();
        this.hh1 = new ClockSeg();
        this.mm0 = new ClockSeg();
        this.mm1 = new ClockSeg();
        this.ss0 = new ClockSeg();
        this.ss1 = new ClockSeg();

    }

    

    update(){

        let w = 32;
        let h = 20

        this.hh0.update(
            0,
            0,0,w,h
        );
        this.hh1.update(
            1,
            w,0,w,h
        );
        this.mm0.update(
            2,
            0,h,w,h
        );
        this.mm1.update(
            3,
            w,h,w,h
        );
        this.ss0.update(
            0,
            0,h*2,w,h
        );
        this.ss1.update(
            0,
            w,h*2,w,h
        );

        /*
        console.log(this.hh0.lines)
        console.log(this.hh1.lines)
        console.log(this.mm0.lines)
        console.log(this.mm1.lines)
        console.log(this.ss0.lines)
        console.log(this.ss1.lines)  
        */      
    }

    getLines():{x:number,y:number}[]{

        let output = [];
        output=output.concat(this.hh0.lines);
        output=output.concat(this.hh1.lines);
        output=output.concat(this.mm0.lines);
        output=output.concat(this.mm1.lines);
        output=output.concat(this.ss0.lines);
        output=output.concat(this.ss1.lines);
        return output;

    }

}