import { LedMatrix } from '../src';
import { Lifegame } from "./lifegame/Lifegame";
import { matrixOptions, runtimeOptions } from './_config';
import { Params } from './lifegame/Params';


//import { Lifegame } from './lifegame/js/lifegame.bundle.js';

 const wait = (t: number) => new Promise(ok => setTimeout(ok, t));
 
 (async () => {
   try {
    const matrix = new LedMatrix(matrixOptions, runtimeOptions);
    
    Params.init(0);
    const lifegame:any = new Lifegame();

    while(true){
      matrix.sync();
      lifegame.update();

      matrix
      .clear() // clear the display
      .drawBuffer(lifegame.output,64,64);

      await wait(30);
    }
   } catch (error) {
     console.error(`${__filename} caught: `, error);
   }
 })();
