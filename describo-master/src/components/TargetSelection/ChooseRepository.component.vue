<template>
    <div> 
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; padding-bottom: 50px;">
            <div class="my-4 text-gray-700" style="font-weight: bold">
                Choose an open access repository to publish your research data
            </div>
            <tooltip-component/>
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
            <button v-on:click="emitSelectedService(selectedService)" class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                OK
            </button>
        </div>
    </div>
</template>

<script>
import { remote } from "electron";
import tooltipComponent from "./tooltip.component.vue" 

export default {
    data() {
        return {
            selectedService: undefined,
            
       
        }
    },   
    components:{
        tooltipComponent
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
    }, 

    emitSelectedService(selectedService){
        this.$emit("selected-service", selectedService);
        
    },
    //changeExplanation(explanation){
   //     this.explanation = "The choice is voluntarily";
   // }
    }

};
</script>