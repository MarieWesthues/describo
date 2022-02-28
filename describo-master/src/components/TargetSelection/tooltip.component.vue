<template>
    <div style="padding-left: 5px;"> 
        <popper
                trigger="clickToOpen"
                :options="{
                placement: 'top',
                modifiers: { offset: { offset: '0,10px' } }
                }"
            >
            <div class="popper my-4 text-gray-600" style="font-style:italic">
                {{erklaerung}}
               
            </div>
            <button
                class="rounded-full bg-blue-400 w-6 h-6" style="color: white; outline-color: transparent" slot="reference">
                    <i class="fas fa-question fa-fw"></i>
                </button>
            </popper>
        </div> 
</template>

<script>
import { remote } from "electron";
import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css'; 

export default {

    data() {
        return {
            erklaerung: "Lorem Ipsum"
        }
    },   

components:{
    'popper': Popper
},
//methods: {
//emitExplanation(explanation){
 //this.$emit("tooltip-explanation", explanation);
   // }


//},
};
</script>