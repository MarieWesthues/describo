<template>
    <div class="flex flex-col pt-2 pb-1">
        <div
            class="flex flex-col style-introduction text-xl text-center py-8"
            v-if="!target"
        >
            <p class="my-4 text-3xl">Configure your Project</p>
        </div>

        <div class="flex flex-col">
            <div
                :class="{
                    'flex flex-row': target && profile,
                    'flex flex-col': !target || !profile,
                }"
            >
                <target-selection-component
                    :class="{
                        'w-3/5 mx-1': target && profile,
                        'w-full py-2 px-6': !target || !profile,
                    }"
                />
                <profile-selection-component
                    v-if="target"
                    :class="{
                        'w-2/5 mx-1': target && profile,
                        'w-full px-6': !target || !profile,
                    }"
                />
            </div>
            <!--<crate-creator v-if="target && profile" class="mt-2">
            </crate-creator>-->
            <divider-component/>
            <template-selection-component/>
            <divider-component/>
            <crate-creator class="mt-2"/>
            <divider-component/>
            <project-metadata-component/>
            <divider-component/>
            <confirm-publish/>
            <divider-component/>
        </div>
    </div>
</template>

<script>
import TargetSelectionComponent from "components/TargetSelection/Shell.component.vue";
import ProfileSelectionComponent from "components/ProfileSelection/Shell.component.vue";
import CrateCreator from "components/CrateCreator/Shell.component.vue";
import ChooseRepositoryComponent from "components/TargetSelection/ChooseRepository.component.vue"
import TemplateSelectionComponent from './CrateCreator/TemplateSelection.component.vue';
import DividerComponent from './divider.component.vue';
import ProjectMetadataComponent from './CrateCreator/ProjectMetadata.component.vue';
import ConfirmPublish from './publish/ConfirmPublish.vue';
import defaultProfile from "components/profiles/default";
import CrateTool from "components/CrateCreator/crate-tools";
import { generateId } from "components/CrateCreator/tools";
import ProfileLoader from "components/ProfileSelection/profile-loader";
import { cloneDeep, uniq } from "lodash";
import { mappings } from "components/profiles/type-mappings";
import internalTypeDefinitions from "components/profiles/types";

export default {
    components: {
        TargetSelectionComponent,
        ProfileSelectionComponent,
        CrateCreator,
        ChooseRepositoryComponent,
        TemplateSelectionComponent,
        DividerComponent,
        ProjectMetadataComponent,      
        ConfirmPublish,
        CrateTool,
        ProfileLoader
    },
    data() {
        return {};
    },
    computed: {
        target: function() {
            return this.$store.state.target;
        },
        profile: function() { 
            return this.$store.state.profile;
        },
    },
    beforeMount() {
        this.storeProfile();
        this.loadProfile();
    },
    methods: {
        async storeProfile() {
            this.$store.state.profile = defaultProfile;
            let profile = this.$store.state.profile;
            this.loading = true;
            // load the profile and verify it
            const profileLoader = new ProfileLoader();
            const { valid, errors } = profileLoader.verify({ profile });
            if (!valid) {
                this.$message({
                    message:
                        "There are errors in that profile and it can't be loaded.",
                    type: "error",
                    duration: 10000,
                });
            } else {
                // save default type array mappings
                this.$store.commit("saveMappings", mappings);

                // override with type array mappings from profile if defined
                if (profile.mappings) {
                    this.$store.commit("saveMappings", profile.mappings);
                }

                // load any data packs defined in the profile
                await profileLoader.loadDataPacks({
                    database: this.$store.state.database,
                    $message: this.$message,
                    dataPacks: profile.dataPacks,
                });

                // load type definitions
                let types = {};
                if (
                    profile.enabledCoreTypes &&
                    profile.enabledCoreTypes.length
                ) {
                    profile.enabledCoreTypes = uniq([
                        ...profile.enabledCoreTypes,
                        "File",
                        "Dataset",
                    ]);
                    for (let type of profile.enabledCoreTypes) {
                        types[type] = internalTypeDefinitions[type];
                    }
                } else {
                    types = cloneDeep(internalTypeDefinitions);
                }
                types = { ...types, ...profile.typeDefinitions };

                // save type definitions
                this.$store.commit("saveTypeDefinitions", types);

                // commit the profile
                this.$store.commit("saveProfile", { profile });

                // reset the internal data state
                this.$store.commit("reset");
            }
            this.loading = false;
        },
        async loadProfile() {
            const DatasetTypes = Object.keys(this.$store.state.profile.items);
            if (DatasetTypes.length > 1) {
                this.showRootDatasetSelector = true;
            } else {
                const selection = DatasetTypes.pop();
                this.loadSelection(selection);
            }
        },
        async loadSelection(selection) {
            if (!selection) return;
            this.$store.commit("reset");
            this.$store.commit("setActiveProfileType", selection);

            let rootDatasetName = {};
            const crateTool = new CrateTool();
            let data, errors;
            try {
                ({ data, errors } = await crateTool.readCrate({
                    target: this.$store.state.target,
                }));
            } catch (error) {
                console.log(error);
            }
            if (data) {
                errors = await this.loadCrateDataIntoStore({
                    data,
                    errors,
                });
                this.crateLoadingErrors = [...errors];
            } else {
                let rootDataset = {
                    uuid: generateId(),
                    "@type": "RootDataset",
                };
                this.$store.commit("saveToGraph", rootDataset);
            }
            this.showRootDatasetSelector = false;
            this.ready = true;
        },
        async loadCrateDataIntoStore({ data, errors }) {
            const updateProgress = data.length > 10;
            const dataLength = data.length;
            for (let [idx, element] of data.entries()) {
                if (updateProgress && idx % 10 === 0) {
                    this.percentageLoaded = round((idx / dataLength) * 100);
                }
                await new Promise((resolve) => setTimeout(resolve, 5));
                try {
                    this.$store.commit("saveToGraph", {
                        item: element,
                        operation: "merge",
                    });
                } catch (error) {
                    errors.push(`${error.message}: ${JSON.stringify(element)}`);
                }
            }
            this.percentageLoaded = 0;
            return errors;
        },
    },
};
</script>

<style lang="scss" scoped></style>
