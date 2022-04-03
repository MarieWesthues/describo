<template>

    <div
        class="flex flex-row mb-2 mx-16 pb-2 border-b-4"
        :class="{
            'bg-yellow-400 py-6': view.property,
            hidden: input.group !== 'important' && !show,
        }"
    >
        <!-- input label -->
        <div class="my-2 text-2xl text-gray-700" style="font-weight: bold; padding: 10px;">
            <div class="text-lg">
                {{ renderLabel(input) }}
            </div>
        </div>
            <!--
            <div class="flex-grow"></div>
            <div class="flex flex-row space-x-2">
                <render-profile-item-linker-component
                    v-if="showLinker(input) && input.showAddControl"
                    :types="input['@type']"
                    :parentId="container.uuid"
                    :property="input.property"
                    @done="$emit('done')"
                />
                <add-control
                    :template="input"
                    @add="add"
                    v-if="input.showAddControl"
                />
                <div>
                    <el-button
                        @click="loadPropertyDefinition(input)"
                        size="mini"
                        type="primary"
                        round
                        class="focus:outline-none focus:border-2 focus:border-blue-600"
                    >
                        <i class="fas fa-question fa-fw"></i>
                    </el-button>
                </div>
            </div>-->
        
        <!--<div class="align-middle text-sm my-4 text-gray-600">{{ input.help }}</div>-->
        <!-- end: input label -->

        <div v-if="!input.multiple">
            <!-- render simple types in place -->
            <div v-if="isSimpleType(input['@type'])">
                <render-core-component
                    class="flex-grow my-1 ml-32"
                    :template="input"
                    :reference="container.uuid"
                    @saved="notifySaved"
                />
            </div>
            <!-- show tag for complex type entries -->
            <div v-else class="flex flex-row p-2">
                <render-profile-item-component
                    v-if="input.data"
                    :item="input"
                    :reference="container.uuid"
                />
            </div>
        </div>

        <div v-if="input.multiple" class="flex flex-row flex-wrap p-2">
            <div v-for="instance of input.data" :key="loopKey(instance)">
                <!-- render simple types in place -->
                <div
                    v-if="
                        isSimpleType(input['@type']) ||
                            isSimpleType(instance['@type']) ||
                            dataIsSimpleType(instance)
                    "
                >
                    <render-core-component
                        class="m-1"
                        :template="{ ...input, data: instance }"
                        :reference="container.uuid"
                        @saved="notifySaved"
                    />
                </div>

                <!-- show tag for complex type entries -->
                <div v-else>
                    <render-profile-item-component
                        class="m-1"
                        :item="{ ...input, data: instance }"
                        :reference="container.uuid"
                    />
                </div>
            </div>
        </div>

        <div>
            <el-button
                @click="loadPropertyDefinition(input)"
                size="mini"
                type="primary"
                round
                class="focus:outline-none focus:border-2 focus:border-blue-600"
            >
                <i class="fas fa-question fa-fw"></i>
            </el-button>
        </div>

        <!-- data inspector drawer-->
        <definition-drawer-component
            :drawer="view.definitionDrawer"
            :url="view.url"
            :definition="view.definition"
            :type="view.type"
            @close="closeDefinitionDrawer"
        />
        <!-- end: data inspector drawer-->
    </div>
    
</template>

<script>
import { shortName } from "src/renderer/filters";
import { isURL } from "validator";
import { isArray, isPlainObject, isString, isEmpty, difference } from "lodash";
import AddControl from "./AddControl.component.vue";
import RenderProfileItemComponent from "./RenderProfileItem.component.vue";
import RenderProfileItemLinkerComponent from "./RenderProfileItemLinker.component.vue";
import DefinitionDrawerComponent from "./DefinitionDrawer.component.vue";
import {
    SimpleTypes,
    isSimpleType,
} from "components/CrateCreator/CoreComponents/simple/component.mixins";

export default {
    components: {
        AddControl,
        RenderCoreComponent: () =>
            import("./RenderCoreComponent.component.vue"),

        RenderProfileItemComponent,
        RenderProfileItemLinkerComponent,
        DefinitionDrawerComponent,
    },
    props: {
        input: {
            type: Object,
            required: true,
        },
        container: {
            type: Object,
            required: true,
        },
        show: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            saved: false,
            showHelp: false,
            view: {
                definitionDrawer: false,
                url: undefined,
                definition: undefined,
            },
        };
    },
    methods: {
        dataIsSimpleType(input) {
            return isPlainObject(input) && input.uuid ? false : true;
        },
        isSimpleType(type) {
            return isSimpleType(type);
        },
        showLinker(input) {
            let types = input["@type"];
            if (isString(types)) types = [types];
            return difference(types, SimpleTypes).length ? true : false;
        },
        loopKey(instance) {
            return instance.uuid ? instance.uuid : instance;
        },
        renderLabel(input) {
            return input.label || shortName(input.property);
        },
        showAlert(input) {
            return (
                input.required &&
                ((isArray(input.data) && isEmpty(input.data)) || !input.data)
            );
        },
        add({ type, property }) {
            this.$emit("add", { type, property });
        },
        loadPropertyDefinition(input) {
            if (isURL(input.property)) {
                this.view.url = input.property;
            } else {
                if ("definition" in this.input) {
                    this.view.definition = this.input.definition;
                } else {
                    this.view.url = `https://schema.org/${input.property}`;
                }
            }
            this.view.definitionDrawer = true;
        },
        closeDefinitionDrawer() {
            this.view = {
                definitionDrawer: false,
                property: undefined,
            };
        },
        notifySaved() {
            this.saved = true;
            setTimeout(() => {
                this.saved = false;
            }, 500);
        },
    },
};
</script>
