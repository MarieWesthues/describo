<template>
    <div class="flex flex-col items-center">
        <!-- <div class="text-xl font-bold mr-2">
                Select a folder on this computer
            </div> -->
        <div class="my-4">
            <button
                type="primary"
                @click="selectFolder"
                class="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            > SELECT FOLDER
            </button>
        </div>
        <div class="my-4 text-gray-600" style="font-style:italic">
            CHOOSE YOUR FOLDER OF A SPECIFIC RESEARCH PROJECT
                    <button
    
                        class="rounded-full bg-blue-400 w-6 h-6" style="color: white"
                    >
                        <i class="fas fa-question fa-fw"></i>
                    </button> 
               
        </div>
    
    </div>
</template>

<script>
import { remote } from "electron";

export default {
    data() {
        return {
            folder: undefined,
            data: [],
        };
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
