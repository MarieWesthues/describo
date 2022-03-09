<template>
<div> 
    <div
            class="flex flex-col style-introduction text-xl text-center">
            <p class="my-4 text-3xl">Overview</p>
    </div>
       <div style="font-weight: bold"> 
        <div>
            <h2>Current Folder</h2>
        </div>
        <div> 
            <h2>Project Title:  </h2>
            </div>
        <div>
            <h2>Selected Services</h2>
        </div>
       </div>
</div>
</template>

<script>
import WorkingTitleComponent from "./WorkingTitle.component.vue";
import { remote } from "electron"; 
export default {
    data() {
        return {
            
        }
    },
components:{
    WorkingTitleComponent
}
  
};

</script>
