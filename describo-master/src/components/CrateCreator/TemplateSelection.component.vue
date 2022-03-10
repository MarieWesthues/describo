<template>
    <div> 
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center">
            <div class="my-4 text-2xl text-gray-700" style="font-weight: bold; padding: 10px;">
                Select a Template
            </div>
        </div>
        <div style="display: flex; justify-content: center">
            <div class="mb-3 xl:w-2/5">
                <select name="templates" class="form-select
                block
                w-full
                px-4
                py-2
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-lg example">
                    <option value="" selected disabled hidden>Select a Template...</option>
                    <option value="newtemplate"> New Template </option>
                    <option value="osf"> OSF Requirements (Standard) </option>
                    <option value="zenodo"> Zenodo Requirements (Standard) </option>
                    <option value="custom1"> Template 1 (Custom) </option>
                    <option value="custom2"> Template 2 (Custom) </option>
                </select>
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
    </div>
</template>

<script>

export default {
};

</script>
