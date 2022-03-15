<template>
    <div> 
        <form>
            <div class="mb-6 mx-16 pb-6 border-b-4">
                <label class="my-4 text-2xl text-gray-700" style="font-weight: bold; padding: 10px;" for="project-name">
                    Name
                </label>
                <input class="ml-16 bg-white appearance-none border-2 border-gray-400 rounded w-3/5 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-700" id="project-name" type="text" value="*working Title des Projektes sollte hier Default als Vorschlag schon drin stehen">
            </div>
        </form>
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
                style="outline-color: rgb(21 128 61)"> 
                    Load Property Set
            </button>
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