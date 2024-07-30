export class Params{


    //public static CA1:number = 1;
    //public static CA2:number = 1;
    //public static CA3:number = 1;

    public static caType:number = 0;
    public static dir:number = 0;
    public static id:number = 0;

    constructor(){

    }

    public static init(id:number){

        this.id = id;

        switch(id){
            case 0:
                this.caType = 0;
                this.dir = 1;
                break;
            case 1: 
                this.caType = 1;
                this.dir = 1;
                break;
            case 2:
                this.caType = 2;
                this.dir = 0;
                break;
            case 3: 
                this.caType = 1;
                this.dir = 1;

                break;
            case 4: 
                this.caType = 0;
                this.dir = 1;

                break;

        }


    }



}