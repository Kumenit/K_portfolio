import EventEmitter from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./utils/convertDivsToSpans.js";

export default class Preloader extends EventEmitter{
    constructor(){


        super();
        this.experience=new Experience();
       this.scene =this.experience.scene;
       this.sizes =this.experience.sizes;
      this.resources =this.experience.resources;
      this.time =this.experience.time;
      this.camera=this.experience.camera;
      this.world=this.experience.world;
      this.device=this.sizes.device;

      this.sizes.on("switchdevice",(device)=>{
        this.device=device;
      })
    
      this.world.on("worldready",()=>{
        this.setAssets();
        this.playIntro();
      })

      
      
    }
    setAssets()
    {
        convert(document.querySelector(".intro-text"))
        convert(document.querySelector(".hero-main-title"))
        convert(document.querySelector(".hero-main-description"))
        convert(document.querySelector(".hero-second-subheading"))
        convert(document.querySelector(".second-sub"))
        this.room=this.experience.world.room.actualRoom;
        this.roomChildren=this.experience.world.room.roomChildren;
       // console.log(this.roomChildren.chandle.position);
    }
    firstIntro()
    {
        return new Promise ((resolved)=>{
            this.timeline = new GSAP.timeline();
            this.timeline.to(".preloader",{
               opacity:0,
               delay:1,
               onComplete:()=>{
                document.querySelector(".preloader").classList.add(".hidden")
                console.log("it is in");
               }
            })
            if(this.device === "mobile"){
               this.timeline.to(this.roomChildren.cube.scale,{
                   x:1.4,
                   y:1.4,
                   z:1.4,
                   ease:"back.out(2.5)",
                   duration:3,
               }).to(this.room.position,{
                   z:-1,
                   ease:"power1.out",
                   duration:0.7,
               })
           }else{
               this.timeline.to(this.roomChildren.cube.scale,{
                   x:1.4,
                   y:1.4,
                   z:1.4,
                   ease:"back.out(2.5)",
                   duration:3,
               }).to(this.room.position,{
                   x:-1.5,
                   ease:"power1.out",
                   duration:0.7,
               })
       
           }
           this.timeline.to(".intro-text .animatedis",{
            yPercent:-100,
            stagger:0.05,
            ease:"back.out(1.7)",
           
           }).to(".arrow-svg-wrapper",{
           opacity:1,
           },"like").to(".toggle-bar",{
            opacity:1,
            onComplete:resolved,
            },"like")
        });
        
}
async playIntro()
{
   await this.firstIntro();
   console.log("continue")
    this.scrollOnceEvent=this.onScroll.bind(this);
    window.addEventListener("wheel",this.scrollOnceEvent);
    
}
onScroll(e)
{
    if(e.deltaY > 0 )
    {
        console.log("added  event");
        window.removeEventListener("wheel",this.scrollOnceEvent);
        
        this.playSecondIntro();

        
    }
}
 
    secondIntro()
    {  
        
        
        return new Promise ((resolved)=>{
      this.secondtimeline = new GSAP.timeline();
   
        this.secondtimeline.to(".intro-text .animatedis",{
            yPercent:100,
            stagger:0.07,
            ease:"back.in(1.7)",
           },"fadeout").to(".arrow-svg-wrapper",{
            opacity:0,
            },"fadeout").to(this.room.position,{
            x:0,
            y:0,
            z:0,
            ease:"power1.out",
           
        }).to(this.roomChildren.cube.rotation,{
            y: 2 * Math.PI + Math.PI / 4,
        },"same").to(this.roomChildren.cube.scale,{
            x:9,
            y:9,
            z:9,
        },"same").to(this.camera.OrthographicCamera.position,{
            y:3.5,
        },"same").to(this.roomChildren.cube.position,{
            x:1.2,
            y:9,
            z:0,
        },"same").set(this.roomChildren.body.scale,{
            x:1,
            y:1,
            z:1,
        }).to(this.roomChildren.cube.scale,{
            x:0,
            y:0,
            z:0,
        },"introtext").to(".hero-main-title .animatedis",{
            yPercent:-100,
            stagger:0.07,
            ease:"back.out(1.7)",
        },"introtext").to(".hero-main-description .animatedis",{
            yPercent:-100,
            stagger:0.07,
            ease:"back.out(1.7)",
        },"introtext").to(".first-sub .animatedis",{
            yPercent:-100,
            stagger:0.07,
            ease:"back.out(1.7)",
        },"introtext").to(".second-sub .animatedis",{
            yPercent:-100,
            stagger:0.07,
            ease:"back.out(1.7)",
        },"introtext").to(this.roomChildren.aquarium.scale,{
            x:2.0902469158172607,
            y:1.6496649980545044,
            z:3.5176644325256348,
            ease:"back.out(2.2)",
            duration:0.5,
        },">-0.5").to(this.roomChildren.fish.scale,{
            x:1,
            y:1,
            z:1,
            ease:"back.out(2.2)",
            duration:0.5,
        },).to(this.roomChildren.clock.scale,{
            x:1,
            y:1,
            z:1,
            ease:"back.out(2.2)",
            duration:0.5,
        },">-0.4").to(this.roomChildren.chandle.scale,{
            x:0.6571075916290283,
            y:0.6482077836990356,
            z:2.061847448348999,
            ease:"back.out(2.2)",
            duration:0.5,
        },).to(this.roomChildren.shalve.scale,{
            x:1,
            y:1,
            z:1,
            ease:"back.out(2.2)",
            duration:0.5,
        },">-0.3").to(this.roomChildren.floor_item.scale,{
            x:1,
            y:1,
            z:1,
            ease:"back.out(2.2)",
            duration:0.5,
        },">-0.2").to(this.roomChildren.desk.scale,{
            x:1,
            y:1,
            z:1,
            ease:"back.out(2.2)",
            duration:0.5,
        },">-0.1").to(this.roomChildren.table_stuff.scale,{
            x:1,
            y:1,
            z:1,
            ease:"back.out(2.2)",
            duration:0.5,
        },">-0.1").to(this.roomChildren.floor.scale,{
            x:1,
            y:1,
            z:1,
        }).to(this.roomChildren.computer.scale,{
            x:1,
            y:1,
            z:1,
            ease:"back.out(2.2)",
            duration:0.5,
        }).to(this.roomChildren.chair.scale,{
            x:1,
            y:1,
            z:1,
            ease:"back.out(2.2)",
            duration:0.5,
        },"chair").to(this.roomChildren.chair.rotation,{
              y: 4 * Math.PI + Math.PI / 4,
            ease:"power2.out",
            duration:1,
            
        },"chair").to(".arrow-svg-wrapper",{
            opacity:1,
            onComplete: resolved,
            })

    
    });
    }


    playSecondIntro()
    {
        
      this.secondIntro();

    }
}
