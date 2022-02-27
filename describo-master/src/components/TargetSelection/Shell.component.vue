<template>
    <div class="flex flex-col">
        <div class="flex flex-row border-b-2 border-gray-400 p-1" v-if="target">
            <div>
                <el-button
                    @click="describeNewFolder"
                    type="primary"
                    size="small"
                    class="focus:outline-none focus:border-2 focus:border-red-600"
                >
                    <i class="fas fa-times"></i>
                </el-button>
            </div>
            <render-selected-target-component
                class="ml-2 text-xl text-gray-700 font-light"
            />
        </div>
      
            <!-- <div class="text-lg text-center text-indigo-700">
                The RO-crate metadata file will be automatically saved to this
                location as you construct it.
            </div> -->

        <div>
            <working-title-component v-if="browseTarget && !workingTitle && !selectedService"
                @working-title="setWorkingTitle"
            />
        </div>

        <div>
            <choose-repository-component v-if="workingTitle && !selectedService" 
            @selected-service="setServiceSelection" />
        </div>

        <div>
            <overview-component v-if="selectedService"/>
    
        </div>
           
        <div class="flex flex-col">
            <local-folder-component v-if="!target && !browseTarget"
                @set-target="setTarget"
                @browse-target="setBrowseTarget"
            />

              <!--  <el-tabs class="mt-4 p-4 style-tab-container bg-gray-200">
                    <el-tab-pane>
                       <span
                            slot="label"
                            class="text-xl text-gray-700 font-light"
                        >
                            Local Folders
                        </span>
                        <local-folder-component
                            @set-target="setTarget"
                            @browse-target="setBrowseTarget"
                        />
                    </el-tab-pane>-->
                    <!-- <el-tab-pane label="Amazon S3">
                        <amazon-s3-component @set-target="setTarget" />
                    </el-tab-pane>
                    <el-tab-pane label="Google Drive">
                        <google-drive-component @set-target="setTarget" />
                    </el-tab-pane>
                    <el-tab-pane label="Microsoft OneDrive">
                        <microsoft-one-drive-component
                            @set-target="setTarget"
                        />
                    </el-tab-pane> -->
                
            <!-- PROFILE SELECTION BUTTON --->    
            <!--    <div class="flex flex-col p-4 mt-4 border" v-if="browseTarget">
                    <div class="flex flex-row">
                        <div class="text-2xl font-light text-gray-800 pt-2">
                            describo Target
                        </div>
                        <div class="flex-grow"></div>
                        <div>
                            <el-button
                                type="primary"
                                @click="setTarget"
                                :disabled="!this.browseTarget"
                                round
                                class="focus:outline-none focus:border-2 focus:border-blue-600"
                            >
                                describe this target
                                <i class="fas fa-long-arrow-alt-right"></i
                            ></el-button>
                        </div>
                    </div> 
                    <file-tree-component
                        :browse-target="browseTarget"
                        class="style-tree-view overflow-scroll"
                    />
                </div>-->
        </div>
    </div> 
</template>

<script>
import LocalFolderComponent from "./LocalFolder.component.vue";
import AmazonS3Component from "./AmazonS3.component.vue";
import GoogleDriveComponent from "./GoogleDrive.component.vue";
import MicrosoftOneDriveComponent from "./MicrosoftOneDrive.component.vue";
import RenderSelectedTargetComponent from "./RenderSelectedTarget.component.vue";
import FileTreeComponent from "components/FileTree/FileTree.component.vue";
import WorkingTitleComponent from "./WorkingTitle.component.vue";
import ChooseRepositoryComponent from "./ChooseRepository.component.vue";
import overviewComponent from "./overview.component.vue";

export default {
    components: {
        RenderSelectedTargetComponent,
        LocalFolderComponent,
        AmazonS3Component,
        GoogleDriveComponent,
        MicrosoftOneDriveComponent,
        FileTreeComponent,
        WorkingTitleComponent,
        ChooseRepositoryComponent,
        overviewComponent
    },
    computed: {
        target: function() {
            return this.$store.state.target;
        },
        //workingTitle: function() {
        //    return this.$store.state.workingTitle;
        //}
    },
    data() {
        return {
            browseTarget: undefined,
            workingTitle: undefined,
            selectedService: undefined,
        };
    },
    methods: {
        setTarget() {
            this.$store.commit("setTarget", this.browseTarget);
            this.browseTarget = undefined;
        },
        setBrowseTarget(target) {
            this.browseTarget = undefined;
            setTimeout(() => {
                this.browseTarget = { ...target };
            }, 100);
        },
        describeNewFolder() {
            this.$store.commit("setTarget", null);
            this.$store.commit("saveProfile", {});
            this.$store.commit("setActiveProfileType", undefined);
        },
        setWorkingTitle(wtitle) {
            this.workingTitle = undefined;
            setTimeout(() => {
                this.workingTitle = { ...wtitle };
            }, 100);
        },
        setServiceSelection(service)
            {
            this.selectedService = undefined;
            setTimeout(() => {
                this.selectedService = { ...service };
            }, 100);
            }
        
    },
};
</script>

<style lang="scss" scoped>
.style-tree-view {
    height: 400px;
}
</style>
