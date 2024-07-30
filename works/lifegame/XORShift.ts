import { Params } from "./Params";

export class XORShift {

    x:number = 0;
    y:number = 0;
    z:number = 0;
    w:number = 0;


    constructor(seed = 88675123) {
      this.x = 123456789;
      this.y = 362436069;
      this.z = 521288629;
      this.w = seed + Params.id*10000;
    }
    
    // XorShift
    next():number{
      let t;
 
      t = this.x ^ (this.x << 11);
      this.x = this.y; this.y = this.z; this.z = this.w;
      return this.w = (this.w ^ (this.w >>> 19)) ^ (t ^ (t >>> 8)); 
    }

    nextInt(min:number, max:number):number {
      const r = Math.abs(this.next());
      return min + (r % (max + 1 - min));
    }

    random():number{
      return this.nextInt(0,10000)/10000;
    }


  }