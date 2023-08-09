import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap"
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
export default class Room{
    constructor(){ 
       this.experience=new Experience();
       this.scene1 =this.experience.scene;
       this.time =this.experience.time;
      this.resources =this.experience.resources;
      this.room=this.resources.items.room;
      //console.log(this.room?.scene);
      this.actualRoom =this.room?.scene;
      this.roomChildren={};
      //console.log(this.actualRoom);

      this.lerp={
        current:0,
        target:0,
        ease:0.1, 
     }
      this.setModel();
      this.setAnimation();
      this.onMouseMove();
    }
    setModel()
    {
        this.actualRoom?.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow=true;
          

            if(child instanceof THREE.Group)
            {
                child.children.forEach((grouchild) =>
                {
                    grouchild.castShadow = true;
                    grouchild.receiveShadow=true;
                });
            }
            if(child.name === "Computer")
            {
                child.children[0].material = new THREE.MeshBasicMaterial({
                    map:this.resources.items.screen,

                })
            }
            
            if(child.name === "Aquarium")
            {
                //console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness=0;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior =3;
                
                
                child.children[0].material.transmission=1;
                
                child.children[0].material.opacity=1;
            }
            if(child.name === "floor")
            {
                console.log(child.position);
                 child.position.x=-1.289521;
                  child.position.z=3.03572;
               
                
            }
            if(child.name === "chandle")
            {
                console.log(child.scale);
            }
           
            // if(child.name === "mailbox" || child.name==="lamp" || child.name==="floor1" || child.name==="floor2" || child.name==="floor3" || child.name==="dirt" || child.name==="flower1" || child.name==="flower2")
            // {
            //     child.scale.set(0,0,0);
            // }
            child.scale.set(0,0,0);
            if(child.name === "Cube")
            {
               // child.scale.set(1,1,1);
                child.position.set(0,1.3,0);
                child.rotation.y=Math.PI/4;
            }
            this.roomChildren[child.name.toLowerCase()]=child;
            
        });

        const width=0.8;
        const height=0.5;
        const intensity=1;
        const rectLight=new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(6.83047,7.11,-4.1);
        rectLight.rotation.x=-Math.PI/2;
        rectLight.rotation.z=-Math.PI/4;
        this.actualRoom.add(rectLight);

        this.roomChildren['rectLight']= rectLight;

        const reactLightHelper =new RectAreaLightHelper(rectLight);
        //rectLight.add(reactLightHelper);


        this.scene1.add(this.actualRoom);
        this.actualRoom?.scale.set(0.11,0.11,0.11)
       //this.actualRoom?.rotation.y == Math.PI;
    }
    setAnimation()
    {
         this.mixer=new THREE.AnimationMixer(this.actualRoom);
        if(this.room?.animations[0])
        {
            
         this.swim=this.mixer.clipAction(this.room?.animations[0]);
         this.swim.play();
         this.b1=this.mixer.clipAction(this.room?.animations[1]);
         this.b1.play();
         this.b2=this.mixer.clipAction(this.room?.animations[3]);
         this.b2.play();
         this.clock=this.mixer.clipAction(this.room?.animations[4]);
         this.clock.play();
        }else{
            console.log("error hapend");
        }
        
    }
    onMouseMove()
    {
        window.addEventListener("mousemove",(e)=>{
            this.rotation =((e.clientX - window.innerWidth/2)*2)/window.innerWidth;
                 this.lerp.target=this.rotation * 0.15;
        })
    }
   
    resize(){
       
     
    }
    update(){
        
      this.lerp.current =GSAP.utils.interpolate(
        this.lerp.current,
        this.lerp.target,
        this.lerp.ease
     );
     if( this.actualRoom?.rotation)
     {
    this.actualRoom.rotation.y=this.lerp.current;
    
     }else{
        console.log("kome happened");
     }

     this.mixer.update(this.time.delta * 0.0009);
        
      
    }
}