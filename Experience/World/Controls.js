import Experience from "../Experience";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";
export default class Controls{
    constructor(){ 
       this.experience=new Experience();
       this.scene =this.experience.scene;
       this.sizes =this.experience.sizes;
      this.resources =this.experience.resources;
      this.time =this.experience.time;
      this.camera=this.experience.camera;
      this.world=this.experience.world;
      this.room =this.experience.world.room.actualRoom;
      this.room.children.forEach(child=>{
         if(child.type === "RectAreaLight"){
            this.rectLight=child;
         }
      });
      this.circle=this.world.floor.circle;
      this.circle2=this.world.floor.circle2;
      this.circle3=this.world.floor.circle3;
      GSAP.registerPlugin(ScrollTrigger);
      this.setSmoothScroll();
      this.setScrollTriger();






      // this.progress=0;
      // this.dummyCurve=new THREE.Vector3(0,0,0);
      // this.position = new THREE.Vector3(0,0,0);
      // this.lookAtPosition = new THREE.Vector3(0,0,0);
      // this.directionalVector=new THREE.Vector3(0,0,0);
      // this.staticVector=new THREE.Vector3(0,1,0);
      // this.crossVector=new THREE.Vector3(0,0,0);
      // this.setPath();
      // this.onWheel(); what 

    }
    resize(){
       
     
    }
    update(){

      
    }

     setupASScroll() {
      // https://github.com/ashthornton/asscroll
      const asscroll = new ASScroll({
        disableRaf: true });
    
    
      GSAP.ticker.add(asscroll.update);
    
      ScrollTrigger.defaults({
        scroller: asscroll.containerElement });
    
    
      ScrollTrigger.scrollerProxy(asscroll.containerElement, {
        scrollTop(value) {
          if (arguments.length) {
            asscroll.currentPos = value;
            return;
          }
          return asscroll.currentPos;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        fixedMarkers: true });
    
    
      asscroll.on("update", ScrollTrigger.update);
      ScrollTrigger.addEventListener("refresh", asscroll.resize);
    
      requestAnimationFrame(() => {
        asscroll.enable({
          newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
    
      });
      return asscroll;
    }

    setSmoothScroll()
    {

      this.asscroll =this.setupASScroll();
        
    }
    setScrollTriger(){
      ScrollTrigger.matchMedia({
         "(min-width:969px)":()=>{
           console.log("fired desktop");
           //reset
           this.room.scale.set(0.11,0.11,0.11);
           this.room.position.set(0,0,0)
           this.rectLight.width =0.5;
           this.rectLight.height=0.5;
        //first section -----------
           this.firstMoveTimeLine= new GSAP.timeline({
            scrollTrigger:{
               trigger:".first-move",
               start:"top top",
               end:"bottom bottom",
               scrub:0.6,
               invalidateOnRefresh:true,
            }
           });
           this.firstMoveTimeLine.to(this.room.position,{
            x:() =>{
               return this.sizes.width*0.0014
            }
           });
        //second section ---------
        this.secondMoveTimeLine= new GSAP.timeline({
         scrollTrigger:{
            trigger:".second-move",
            start:"top top",
            end:"bottom bottom",
            scrub:0.6,
            invalidateOnRefresh:true,
         }
        });
        this.secondMoveTimeLine.to(this.room.position,{
         x:() =>{
            return 1;
         },
         z:()=>{
            return this.sizes.height* 0.0032; 
         }
        },"same");
        this.secondMoveTimeLine.to(this.room.scale,{
        x:0.4,
        y:0.4,
        z:0.4,
        },"same");
        this.secondMoveTimeLine.to(this.rectLight,{
         width:0.5*4,
         height:0.7 * 4,
         },"same");
         //third section -----------
         this.thirdMoveTimeLine= new GSAP.timeline({
            scrollTrigger:{
               trigger:".third-move",
               start:"top top",
               end:"bottom bottom",
               scrub:0.6,
               invalidateOnRefresh:true,
            }
           });
           this.thirdMoveTimeLine.to(this.camera.OrthographicCamera.position,{
            x:-2.5,
            y:0.6,
           }); 
 




         },
         
 
         "(max-width:968px)":()=>{
            console.log("fired mobile")
         //resets
         this.room.scale.set(0.07,0.07,0.07);
         this.rectLight.width =0.3;
         this.rectLight.height=0.3;
            //first section -----------
               this.firstMoveTimeLine= new GSAP.timeline({
                scrollTrigger:{
                   trigger:".first-move",
                   start:"top top",
                   end:"bottom bottom",
                   scrub:0.6,
                   invalidateOnRefresh:true,
                },
               }).to(this.room.scale,{
                  x:0.1,
                  y:0.1,
                  z:0.1,
               })
             //second section ---------
        this.secondMoveTimeLine= new GSAP.timeline({
         scrollTrigger:{
            trigger:".second-move",
            start:"top top",
            end:"bottom bottom",
            scrub:0.6,
            invalidateOnRefresh:true,
         }
        }).to(this.room.scale,{
         x:0.25,
         y:0.25,
         z:0.25,
        },"same").to(this.rectLight,{
         width:0.3*3.4,
         height:0.3*3.4,
        },"same").to(this.room.position,{
         y:-0.22,
         x:1.2,
        },"same");
        //third section -----------
        this.thirdMoveTimeLine= new GSAP.timeline({
         scrollTrigger:{
            trigger:".third-move",
            start:"top top",
            end:"bottom bottom",
            scrub:0.6,
            invalidateOnRefresh:true,
         }
        }).to(this.room.position,{
         z:-4.5,
        });

          },
      all: ()=>{
         this.sections=document.querySelectorAll(".section");
         this.sections.forEach(section=>{
            this.progressWrapper =section.querySelector(".progress-wrapper");
            this.progressBar =section.querySelector(".progress-bar");

            if(section.classList.contains("right"))
            {
               GSAP.to(section,{
                  borderTopLeftRadius:10,
                  scrollTrigger:{
                     trigger:section,
                     start:"top bottom",
                     end:"top top",
                  
                     scrub:0.6,
                  }
                  

               });
               GSAP.to(section,{
                  borderBottomLeftRadius:700,
                  scrollTrigger:{
                     trigger:section,
                     start:"bottom bottom",
                     end:"bottom top",
                  
                     scrub:0.6,
                  }
                  

               });
            }else{
               GSAP.to(section,{
                  borderTopRightRadius:10,
                  scrollTrigger:{
                     trigger:section,
                     start:"top bottom",
                     end:"top top",
                  
                     scrub:0.6,
                  }
                  

               });
               GSAP.to(section,{
                  borderBottomRightRadius:700,
                  scrollTrigger:{
                     trigger:section,
                     start:"bottom bottom",
                     end:"bottom top",
                  
                     scrub:0.6,
                  }
                  

               });
            }
            GSAP.from(this.progressBar,{
               scaleY:0,
               scrollTrigger:{
                  trigger:section,
                  start:"top top",
                  end:"bottom bottom",
                  scrub:0.4,
                  pin:this.progressWrapper,
                  pinSpacing:false,
               }
            });
         });
         //circles
          //first section -----------
          this.firstMoveTimeLine= new GSAP.timeline({
            scrollTrigger:{
               trigger:".first-move",
               start:"top top",
               end:"bottom bottom",
               scrub:0.6,
               invalidateOnRefresh:true,
            }
           }).to(this.circle.scale,{
            x:3,
            y:3,
            z:3,
           });
          
        //second section ---------
        this.secondMoveTimeLine= new GSAP.timeline({
         scrollTrigger:{
            trigger:".second-move",
            start:"top top",
            end:"bottom bottom",
            scrub:0.6,
            invalidateOnRefresh:true,
         }
        }).to(this.circle2.scale,{
         x:3,
         y:3,
         z:3,
        },"same").to(this.room.position,{
            y:0.7,
        },"same");
       
         //third section -----------
         this.thirdMoveTimeLine= new GSAP.timeline({
            scrollTrigger:{
               trigger:".third-move",
               start:"top top",
               end:"bottom bottom",
               scrub:0.6,
               invalidateOnRefresh:true,
            }
           }).to(this.circle3.scale,{
            x:3,
            y:3,
            z:3,
           });
       
 


 

         //mini platform animations
         this.secondPartTimeline= new GSAP.timeline({
            scrollTrigger:{
               trigger:".third-move",
               start:"center center",
              
            }
           });

           this.room.children.forEach(child=>{
            if(child.name === "floor"){
             this.first=  GSAP.to(child.position,{
                   x:-3.5231199264526367,
                   y: 0.3155050277709961,
                   z:6.632895469665527,

                  // x:0,
                  // y:0.3155050277709961,
                  // z:0,
                  duration:0.3
               });
               
            }
            if(child.name === "mailbox"){
             this.second=  GSAP.to(child.scale,{
                  x:1,
                  y:1,
                  z:1,
                  ease:"back.out(2)",
                  duration:0.3,
               })
            }

            if(child.name === "lamp"){
             this.third=  GSAP.to(child.scale,{
                  x:1,
                  y:1,
                  z:1,
                  ease:"back.out(2)",
                  duration:0.3,
               })
            }
            if(child.name === "floor1"){
             this.fourth=  GSAP.to(child.scale,{
                  x:1,
                  y:1,
                  z:1,
                  ease:"back.out(2)",
                  duration:0.3,
               })
            }
            if(child.name === "floor2"){
             this.fifth=  GSAP.to(child.scale,{
                  x:1,
                  y:1,
                  z:1,
                  ease:"back.out(2)",
                  duration:0.3,
               })
            }
            if(child.name === "floor3"){
            this.sixth=    GSAP.to(child.scale,{
                  x:1,
                  y:1,
                  z:1,
                  ease:"back.out(2)",
                  duration:0.3,
               })
            }if(child.name === "dirt"){
            this.seventh=   GSAP.to(child.scale,{
                  x:1,
                  y:1,
                  z:1,
                  ease:"back.out(2)",
                  duration:0.3,
               })
            }
            if(child.name === "flower1"){
             this.eighth=   GSAP.to(child.scale,{
                  x:1,
                  y:1,
                  z:1,
                  ease:"back.out(2)",
                  duration:0.3,
               })
            }
            if(child.name === "flower2"){
              this.ninth= GSAP.to(child.scale,{
                  x:1,
                  y:1,
                  z:1,
                  ease:"back.out(2)",
                  duration:0.3,
               });
            }
           });
           this.secondPartTimeline.add(this.first);
           this.secondPartTimeline.add(this.second);
           this.secondPartTimeline.add(this.third);
           this.secondPartTimeline.add(this.fourth,"-=0.2");
           this.secondPartTimeline.add(this.fifth,"-=0.2");
           this.secondPartTimeline.add(this.sixth,"-=0.2");
           this.secondPartTimeline.add(this.seventh,"-=0.2");
           this.secondPartTimeline.add(this.eighth);
           this.secondPartTimeline.add(this.ninth,"-=0.1");
           
      }
 

      });
  
    }

     
   //  setPath()
   //  {
   //     this.curve = new THREE.CatmullRomCurve3([
   //      new THREE.Vector3(-5,0,0),
   //      new THREE.Vector3(0,0,-5),
   //      new THREE.Vector3(5,0,10),
   //      new THREE.Vector3(7,0,6),
   //      new THREE.Vector3(0,10,5),
   //      new THREE.Vector3(5,0,5),
      
   //     ],true);

       
   //     const points=this.curve.getPoints(50)
   //     const geometry=new THREE.BufferGeometry().setFromPoints(points);
   //     const material =new THREE.LineBasicMaterial({color:0xff0000});
   //     const curveObject=new THREE.Line(geometry,material);
   //     this.scene.add(curveObject);
   //  }
   //  onWheel()
   //  {
   //    window.addEventListener("wheel",(e)=>{
   //       console.log(e);
   //       if(e.deltaY > 0)
   //       {
   //          this.lerp.target +=0.01;
   //           //this.back =false;
            
   //       }else{
   //          this.lerp.target -=0.01;
   //           //this.back=true;
            
   //       }

   //    })
   // }
   //in the update
   // this.curve.getPointAt(this.lerp.current % 1,this.position);
   //    this.camera.OrthographicCamera.position.copy(this.position);
   //    this.directionalVector.subVectors(
   //     this.curve.getPointAt ((this.lerp.current % 1)+0.000001),
   //       this.position
   //    );
   //    this.directionalVector.normalize();
   //    this.crossVector.crossVectors(
   //       this.directionalVector,
   //       this.staticVector,
   //    );
   //    this.crossVector.multiplyScalar(100000);
   //    this.camera.OrthographicCamera.lookAt(0,0,0)
   
}