import Experience from "../Experience";
import * as THREE from "three";

export default class Floor{
    constructor(){ 
       this.experience=new Experience();
       this.scene =this.experience.scene;
      
      

      this.setFloor();
      this.setCircles();
 
    }
    
    setFloor()
    {
        this.geometry =new THREE.PlaneGeometry(100,100);
        this.material =new THREE.MeshStandardMaterial({
            color:0xffffff,
            side: THREE.BackSide,
        });
        this.plane =new THREE.Mesh(this.geometry,this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = Math.PI /2;
        this.plane.position.y=-0.1;
        this.plane.receiveShadow = true;
    }
    setCircles()
    {
         const geometry =new THREE.CircleGeometry(5,64);
         this.material1=new THREE.MeshStandardMaterial({color:0xe5a1aa});
         const material2=new THREE.MeshStandardMaterial({color:0x8395CD});
         const material3=new THREE.MeshStandardMaterial({color:0x7AD0AC});
         this.circle=new THREE.Mesh(geometry,this.material1);
         this.circle2=new THREE.Mesh(geometry,material2);
         this.circle3=new THREE.Mesh(geometry,material3);
         this.circle.position.y=-0.09;
         this.circle2.position.y=-0.08;
         this.circle2.position.x=2;
         this.circle3.position.y=-0.07; 
         this.circle.scale.set(0,0,0);
         this.circle2.scale.set(0,0,0);
         this.circle3.scale.set(0,0,0);
         this.circle.rotation.x = this.circle2.rotation.x =this.circle3.rotation.x =-Math.PI/2
         this.circle.receiveShadow =this.circle2.receiveShadow =this.circle3.receiveShadow =true;
          
         this.scene.add(this.circle);
         this.scene.add(this.circle2);
         this.scene.add(this.circle3);
    }
    resize(){
       
     
    }
    update(){
        
   
      
    }
}