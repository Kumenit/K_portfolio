import Experience from "../Experience";
import * as THREE from "three";
import Room from "./Room";
import Enviroment from "./Enviroment.js"
import Controls from "./Controls";
import Floor from "./Floor";
import EventEmitter from "events";
export default class World extends EventEmitter{
    constructor(){ 
        super();
       this.experience=new Experience();
       this.sizes=this.experience.sizes;
       this.scene=this.experience.scene;
       this.canvas=this.experience.canvas;
       this.camera=this.experience.camera;
       this.resources =this.experience.resources;
       this.theme =this.experience.theme;
       
       
       this.resources.on("ready",()=>{
        this.enviroment = new Enviroment();
       
        this.floor=new Floor();
        this.room=new Room();
        this.emit("worldready");
        
        this.controls =new Controls();
        
       // console.log("created room");
       });
      this.theme.on("switch",(theme)=>{
        this.switchTheme(theme);
      })

     
       
       //this.room=new Room(); 
       //console.log(this.scene,this.camera.PerspectiveCamera )
    }
    switchTheme(theme)
    {
      if(this.enviroment){
          this.enviroment.switchTheme(theme)
      }
    }
   
    resize(){
       
     
    }
    update(){
        if(this.room)
        {
            this.room.update();
        }
        if(this.controls)
        {
            this.controls.update();
        }
      
    }
}