import * as THREE from "three";
import EventEmitter from "events";
//import Experience from "../Experience";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import {DRACOLoader} from "three/examples/jsm/loaders/DRACOLoader.js"


export default class Resources extends EventEmitter{
    constructor(assets){

        super();
        //this.experience =new Experience();
       // this.renderer = this.experience.renderer;
         this.assets=assets;
         
         this.items={};
         //console.log(this.items);
         this.queue=this.assets.length;
         this.loaded=0;

         this.setLoaders();
         this.startLoading();
        }
        setLoaders()
        {
            this.loaders={};
            this.loaders.gltfLoader=new GLTFLoader();
            this.loaders.dracoLoader=new DRACOLoader();
            this.loaders.dracoLoader.setDecoderPath("/draco/");
            this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
        }
        startLoading()
        {
            for(const asset of this.assets)
            {
                if(asset.type==="glbModel"){
                    this.loaders.gltfLoader.load(asset.path,(file)=>{
                        this.singleAssetLoade(asset,file);
                    })
                }else if(asset.type === "videoTexture"){
                      this.video ={}
                      this.videoTexture ={}

                      this.video[asset.name] = document.createElement("video");
                      this.video[asset.name].src = asset.path;
                      this.video[asset.name].muted =true;
                      this.video[asset.name].playsInline= true;
                      this.video[asset.name].autoplay =true;
                      this.video[asset.name].loop =true;
                      this.video[asset.name].play();


                      this.videoTexture[asset.name] =new THREE.VideoTexture(
                        this.video[asset.name]
                      );
                      this.videoTexture[asset.name].filpY =true;
                      this.videoTexture[asset.name].minFilter =THREE.NearestFilter;
                      this.videoTexture[asset.name].megeFilter =THREE.NearestFilter;
                      this.videoTexture[asset.name].generateMipmaps =false;
                      this.videoTexture[asset.name].encoding =THREE.sRGBEncoding;
                       
                      this.singleAssetLoade(asset,this.videoTexture[asset.name]);
                }
            }
        }
        singleAssetLoade(asset,file)
        {
             this.items[asset.name]=file;
             this.loaded++;
             //console.log("asset is loading");
             if(this.loaded === this.queue)
             {
                //console.log("all assets are done");
                this.emit("ready");
             }

        }


    
}