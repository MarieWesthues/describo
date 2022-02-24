<template>
    <div> 
        <div class="my-4 text-gray-700" style="font-weight: bold; padding-bottom: 50px; display: flex; justify-content: center">
                       Choose an open access repository to publish your research data
        </div>
    <div style="display: flex; justify-content: center">
       <div style="display: flex; justify-content: space-between; width: 400px;">
        <button style="outline-color: transparent">
            <img @click="chooseService('osf')" style="opacity: 0.5;" src="https://i.ibb.co/V9HgmQn/Osf-black.png" alt="Osf_black" border="0" id="osf">
            </button> 
            <button  style="outline-color: transparent" >        
                <img @click="chooseService('zenodo')" style="opacity: 0.5;" src="https://i.ibb.co/FxScXJy/Zenodo-gradient-200.png" alt="Zenodo-gradient-200" border="0" id="zenodo">
            </button>
        </div>
    </div>
        <div style="display: flex; justify-content: flex-end; padding: 100px;">
                <button class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
            OK
                </button>
        </div>
               
    
</div>
</template>

<script>
import { remote } from "electron";

export default {
    data() {
        return {
  
        }
    },   
  
    methods:{
    chooseService (idName){
       var logo = document.getElementById(idName)
       if (logo.style.opacity == "0.5"){

            logo.style.opacity="1";

       }
        else if(logo.style.opacity=="1"){
        
            logo.style.opacity="0.5";
 
            
        }

       
    }
    },
};
</script>