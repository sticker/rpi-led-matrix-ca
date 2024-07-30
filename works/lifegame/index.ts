
import { Clock } from "./Clock";
import { Lifegame } from "./Lifegame";
import { LifegameVisualizer } from "./LifegameVisualizer";
import { LifegameVisualizerP5 } from "./LifegameVisualizerP5";
import { Params } from "./Params";

//window.addEventListener('DOMContentLoaded', () => {
  
window.onload = ()=>{
    
    Params.init(2);
    let main = new Lifegame();//Math.random()<0.5 ? 1 : 0);
    let visualizer = new LifegameVisualizerP5(main);
    //let visualizer = new LifegameVisualizer(main);
    
    //let clock = new Clock();

    //let ca = new Lifegame();

    //let hoge:any = new MyApp.Lifegame();


    setInterval(()=>{
        
        main.update();
        visualizer.update();

        //clock.update();
        //console.log(clock.getLines())

    },1000/30);

};