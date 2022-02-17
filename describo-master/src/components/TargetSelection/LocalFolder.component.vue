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
                    <el-button
                        size="mini"
                        type="primary"
                        circle
                        class=" focus:outline-none focus:border-2 focus:border-blue-600"
                    >
                        <i class="fas fa-question fa-fw"></i>
                    </el-button> 
               
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
            this.folder = folder.filePaths[0];
            this.$emit("browse-target", { type: "local", folder: this.folder });
        },
    },
};
</script>
