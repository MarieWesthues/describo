<template>
    <div class="flex flex-col">
        <div v-if="template.length">
            <render-profile-report-component
                :report="report"
                v-if="
                    !report.templateAvailable || report.extraProperties.length
                "
            />

            <!-- The special @id component -->
            <render-id-input-component :uuid="uuid" />

            <!-- render the items in the template -->
            <div v-for="input in template" :key="input.property">
                <render-profile-input-component
                    :input="input"
                    :container="container"
                    :show="showAllProperties"
                    @add="add"
                    v-if="input.property !== '@id'"
                />
            </div>

            <!--
            <div class="flex flex-row justify-center my-4">
                <el-button
                    class="flex-grow focus:outline-none focus:border-2 focus:border-blue-600"
                    type="primary"
                    @click="showAllProperties = !showAllProperties"
                    v-if="!showAllProperties"
                >
                    Show all available properties
                </el-button>
            </div>
            -->
            <div class="flex flex-row justify-between">
                <div class="my-4 mx-16">
                    <button
                        type="primary"
                        class="mr-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 border border-green-500 rounded shadow"
                        style="outline-color: rgb(34 197 94)"> 
                            &lt;/&gt; Add Property
                    </button>
                    <button
                        type="primary"
                        
                        class="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 border border-green-700 rounded shadow"
                        style="outline-color: rgb(21 128 61)" @click="loadPropertySetModal = true"> 
                            Load Property Set
                        
                    </button>     

                </div>
                <div class="my-4 mx-16">
                    <button
                        type="primary"
                        class="mr-2 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 border border-blue-800 rounded shadow"
                        style="outline-color: rgb(30 64 175)" @click="savePropertySetModal = true"> 
                            Save as Property Set
                    </button>
                    <button
                        type="primary"
                        
                        class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-600 rounded shadow"
                        style="outline-color: rgb(75 85 99)" @click="saveTemplateModal = true"> 
                            Save as Template
                        
                    </button>     
                </div>
            </div>
            <div class="absolute bottom-16 left-0 ml-16">
                <div class="my-4">
                    <button
                        type="primary"
                        class="bg-white hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 border border-gray-200 rounded shadow"
                        style="outline-color: rgb(229 231 235)"
                    > BACK
                    </button>
                </div>
            </div>
            <div class="absolute bottom-16 right-0 mr-16">
                <div class="my-4">
                    <button
                        type="primary"
                        class="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-400 rounded shadow"
                        style="outline-color: #60a5fa"
                    > CONTINUE
                    </button>
                </div>
            </div>

            <el-dialog
                    title="Choose a property set"
                    :visible.sync="loadPropertySetModal"
                    width="40%"
                    center>
                    <span> 
                        <el-form>
                            <el-form-item >
                                <el-radio-group v-model="form.type" style="display: flex; flex-direction: column;">
                                <el-radio label="Property Set 1" name="type"></el-radio><!-- sind hier nur Platzhalter Namen. Die Labels sollten den abgespeicherten Propety Sets entsprechen-->
                                <el-radio label="Property Set 2" name="type"></el-radio>
                                <el-radio label="Social Media Analysis Set" name="type"></el-radio>
                                <el-radio label="Project XYZ Set" name="type"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </span>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="loadPropertySetModal = false">Save</el-button>
                    </span>
            </el-dialog>
            <el-dialog
                    title="Save as a property set"
                    :visible.sync="savePropertySetModal"
                    width="40%"
                    center>
                    <span> 
                        <el-form>
                            <el-form-item >
                                <el-input v-model="form.property_set_name"></el-input>
                            </el-form-item>
                        </el-form>
                    </span>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="savePropertySetModal = false">Save</el-button>
                    </span>
            </el-dialog>
            <el-dialog
                    title="Save as a template"
                    :visible.sync="saveTemplateModal"
                    width="40%"
                    center>
                    <span> 
                        <el-form>
                            <el-form-item >
                                <el-input v-model="form.template_name"></el-input>
                            </el-form-item>
                        </el-form>
                    </span>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveTemplateModal = false">Save</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { updateTemplate } from "./describe-entry";
import {
    cloneDeep,
    isArray,
    isPlainObject,
    isString,
    isEmpty,
    difference,
    has,
} from "lodash";
import RenderProfileReportComponent from "./RenderProfileReport.component.vue";
import { isSimpleType } from "components/CrateCreator/CoreComponents/simple/component.mixins";
import { generateId } from "components/CrateCreator/tools";

export default {
    components: {
        RenderIdInputComponent: () => import("./RenderIdInput.component.vue"),
        RenderProfileInputComponent: () =>
            import("./RenderProfileInput.component.vue"),
        RenderProfileReportComponent,
    },
    props: {
        uuid: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            typeDefinition: [],
            report: {},
            template: [],
            showAllProperties: false,
            view: {
                definitionDrawer: false,
                property: undefined,
            },
            loadPropertySetModal: false, 
            savePropertySetModal: false,
            saveTemplateModal: false,
            form:{
                property_set_name: "test",
            }
        };
    },
    computed: {
        container: function() {
            return this.$store.getters.getItemById(this.uuid);
        },
    },
    watch: {
        container: {
            handler: function() {
                this.updateTemplate();
            },
            deep: true,
        },
        uuid: function() {
            this.template = [];
            this.$nextTick(() => {
                this.loadProfileInputs();
                this.updateTemplate();
            });
        },
    },
    beforeMount() {
        this.loadProfileInputs();
        this.updateTemplate();
    },
    methods: {
        loadProfileInputs() {
            const container = this.$store.getters.getItemById(this.uuid);
            let type = container["@type"];
            if (isArray(type)) {
                const mappings = this.$store.state.mappings;
                const stringifiedType = type.sort().join(", ");
                if (has(mappings, stringifiedType)) {
                    type = mappings[stringifiedType];
                } else {
                    if (type.includes("Dataset")) {
                        type = "Dataset";
                    } else if (type.includes("File")) {
                        type = "File";
                    } else {
                        type = stringifiedType;
                    }
                }
            }
            if (type === "RootDataset") {
                this.typeDefinition = this.$store.getters.getActiveProfileDefinition();
            } else {
                this.typeDefinition = this.$store.getters.getTypeDefinition(
                    type
                );
            }
        },
        updateTemplate() {
            // if no inputs are defined we want to just show the data pack selector
            if (
                !this.typeDefinition.inputs ||
                !this.typeDefinition.inputs.length
            )
                return;

            // otherwise if inputs are defined - assemble the template for the profile renderer
            let { template, report } = updateTemplate({
                item: this.container,
                typeDefinition: cloneDeep(this.typeDefinition),
            });
            this.report = report;
            this.template = template;
        },
        add({ type, property }) {
            this.template = this.template.map((item) => {
                if (item.property === property) {
                    if (isSimpleType(type)) {
                        if (item.multiple) {
                            item.data.push("");
                        } else {
                            item.data = "";
                        }
                        item.enabled = true;
                    } else {
                        this.$emit("link-item");
                        let item = {
                            "@type": type,
                            uuid: generateId(),
                        };
                        this.$store.commit("saveToGraph", item);
                        this.$store.commit("addNewItem", {
                            itemId: item.uuid,
                            parentId: this.uuid,
                            property,
                        });
                    }
                }
                return item;
            });
        },
    },
};
</script>
