export class ClockSeg{


    lines:{x:number,y:number}[];

    p00:{x:number,y:number} = {x:0,y:0};
    p10:{x:number,y:number} = {x:0,y:0};
    p20:{x:number,y:number} = {x:0,y:0};

    p01:{x:number,y:number} = {x:0,y:0};
    p11:{x:number,y:number} = {x:0,y:0};
    p21:{x:number,y:number} = {x:0,y:0};

    p02:{x:number,y:number} = {x:0,y:0};
    p12:{x:number,y:number} = {x:0,y:0};
    p22:{x:number,y:number} = {x:0,y:0};


    constructor(){
        this.lines = [];
    }

    update(
        nn:number,
        xx:number,
        yy:number,
        ww:number,
        hh:number        
    ){

        this.p00.x = xx;
        this.p00.y = yy;
        this.p10.x = xx+ww/2;
        this.p10.y = yy;
        this.p20.x = xx+ww;
        this.p20.y = yy;

        this.p01.x = xx;
        this.p01.y = yy+hh/2;
        this.p11.x = xx+ww/2;
        this.p11.y = yy+hh/2;
        this.p21.x = xx+ww;
        this.p21.y = yy+hh/2;

        this.p02.x = xx;
        this.p02.y = yy+hh;
        this.p12.x = xx+ww/2;
        this.p12.y = yy+hh;
        this.p22.x = xx+ww;
        this.p22.y = yy+hh;

        this.lines = [];
        switch(nn){
            case 0:
                this.set0();
                break;
            case 1:
                this.set1();
                break;
            case 2:
                this.set2();
                break;
            case 3:
                this.set3();
                break;

        }

    }

   
    set0(){
     
        this.lines[0] = this.p00;
        this.lines[1] = this.p20;

        this.lines[2] = this.p20;        
        this.lines[3] = this.p22;
        
        this.lines[4] = this.p22;
        this.lines[5] = this.p02;

        this.lines[5] = this.p02;
        this.lines[6] = this.p00;
        
    }

    set1(){

        this.lines[0] = this.p10;
        this.lines[1] = this.p12;

    }

    set2(){
        /* 
        p00 p10 p20
        p01 p11 p21
        p02 p12 p22
        */
        this.lines[0] = this.p00;
        this.lines[1] = this.p20;

        this.lines[2] = this.p20;        
        this.lines[3] = this.p02;

        this.lines[4] = this.p02;
        this.lines[5] = this.p22;
    }

    set3(){
        /* 
        p00 p10 p20
        p01 p11 p21
        p02 p12 p22
        */
        this.lines[0] = this.p00;
        this.lines[1] = this.p20;

        this.lines[2] = this.p20;
        this.lines[3] = this.p22;
        
        this.lines[4] = this.p02;
        this.lines[5] = this.p22;
        
        this.lines[6] = this.p01;
        this.lines[7] = this.p21;

    }


}