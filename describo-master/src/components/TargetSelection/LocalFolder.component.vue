<template>
    <div class="flex flex-col items-center">
        <!-- <div class="text-xl font-bold mr-2">
                Select a folder on this computer
            </div> -->

        <div class="flex items-center justify-center">
            <div class="w-40 h-40 bg-gray-300 rounded-full">
            </div>
        </div>

        <div class="my-4">
            <button
                type="primary"
                @click="selectFolder"
                class="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                style="outline-color: gray"
            > SELECT FOLDER
            </button>
        </div>
        <div style="display: flex; flex-direction: row; align-items: center"> 
            <div class="my-4 text-gray-600" style="font-style: italic; padding: 5px">
                CHOOSE YOUR FOLDER OF A SPECIFIC RESEARCH PROJECT
            </div>
            <tooltip-component/>
        </div>
    </div>
</template>

<script>
import { remote } from "electron";
import tooltipComponent from "./tooltip.component.vue"


export default {
    data() {
        return {
            folder: undefined,
            data: [],
        }
    },
    components:{
        tooltipComponent
    },
    methods: {
        async selectFolder() {
            let folder = await remote.dialog.showOpenDialog({
                properties: ["openDirectory"],
            });
            if(!folder.canceled){
                this.folder = folder.filePaths[0];
                this.$emit("browse-target", { type: "local", folder: this.folder });
            }
        },
   
    },
};
</script>
