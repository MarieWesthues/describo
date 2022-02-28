<template>
<div> 
    <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
    <div class="my-4 text-gray-700" style="font-weight: bold; padding: 10px;">
        DEFINE A WORKING TITLE
    </div>
    <tooltip-component/>
    </div>
    <div style="display: flex; justify-content: center">
        <form class="w-full max-w-sm">
            <div class="flex items-center border-b border-green-500 py-2">
                <input v-model="workingTitle" class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Working Title" aria-label="Full name">
                <button 
                    v-on:click="emitWorkingTitle(workingTitle)" 
                    class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="button">
                        OK
                </button>
            </div>
        </form>     
    </div>
</div>
</template>

<script>
import tooltipComponent from "./tooltip.component.vue"

export default {
    
    data() {
        return {
            workingTitle: undefined,
    
        }
    },
 components:{
        tooltipComponent
    },

    methods: {
        emitWorkingTitle(workingTitle) {
            //this.workingTitle = workingTitle;
                this.$emit("working-title", workingTitle);
                if (workingTitle==null){
                    workingTitle = "Default";
                    console.log(workingTitle)
                }
                else{
                    console.log(workingTitle)
                }
            return workingTitle
                   
        },
    },  
};

</script>
