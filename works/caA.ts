import { LedMatrix } from '../src';
import { matrixOptions, runtimeOptions } from './_config';
import { Params } from './lifegame/Params';
import { CAMain } from './lifegame/lifegame/CAMain';

const wait = (t: number) => new Promise(ok => setTimeout(ok, t));
 
(async () => {
   try {
    const matrix = new LedMatrix(matrixOptions, runtimeOptions);
    
    Params.init(0);
    const ca:any = new CAMain();
    let numConnect = 1;

    //無限ループ
    while(true){
      matrix.sync();

      ca.update(numConnect);//コネクト数を渡す

      matrix
      .clear() // clear the display
      .drawBuffer(ca._output,64,64);

      await wait(30);
    }
   } catch (error) {
     console.error(`${__filename} caught: `, error);
   }
 })();
