<template>
<div> 
     <div
            class="flex flex-col style-introduction text-xl text-center">
            <p class="my-4 text-3xl">Overview</p>
    </div>
    <div style="display: flex; flex-direction: column; font-size: large; align-items: center;">  
        <div style="padding-bottom: 80px; display: flex; flex-direction: row;">
            <h2 style="font-weight: bold; padding-right: 50px;">Current Folder: </h2>
            <p style="padding-right: 50px;">/HierSteht/nur/einPlatzhalter</p> <!--hier sollte der Pfad des ausgewählten Ordners stehen-->
            <button class="flex-shrink-0 bg-gray-400 hover:bg-gray-500 border-gray-400 hover:border-gray-500 text-sm border-4 text-white py-2 px-2 rounded" type="button">        
                </button>
        </div>
        <div style="padding-bottom: 80px; display: flex; flex-direction: row"> 
            <h2 style="font-weight: bold; padding-right: 55px;"> Project Title: </h2> 
            <p style="padding-right: 50px;">"Platzerhalter Titel"</p><!--hier sollte angegeben WorkingTitel oder ein Default Titel stehen-->
            <button class=" bg-gray-400 hover:bg-gray-500 border-gray-400 hover:border-gray-500 text-sm border-4 text-white py-2 px-2 rounded" type="button">        
            </button>
        </div>
        <div>
            <div style="display: flex; flex-direction: row">
            <h2 style="font-weight: bold; padding-right: 50px;">Selected Services: </h2>
             <button class=" bg-gray-400 hover:bg-gray-500 border-gray-400 hover:border-gray-500 text-sm border-4 text-white py-2 px-2 rounded" type="button">        
                </button>
            </div>
            <div style="display: flex; justify-content: space-between; width: 250px; padding-top:20px;">
            
                    <img src="https://i.ibb.co/V9HgmQn/Osf-black.png" alt="Osf_black" border="0" id="osf" style="padding-right: 30px;">
          
                    <img src="https://i.ibb.co/FxScXJy/Zenodo-gradient-200.png" alt="Zenodo-gradient-200" border="0" id="zenodo">
            </div>
            <el-tooltip content="Top center" placement="top">
                <el-button>Dark</el-button>
            </el-tooltip>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
  
};

</script>
