<template>
    <div>
        <div
       
            class="flex flex-col style-introduction text-xl text-center py-8"
        >
            <p class="my-2 text-3xl">Publish your project data</p>
            <p class="my-2 text-xl" style="color: grey"> Make sure your settings are correct!</p>
            <p class="text-xl" style="color: grey"> Your ownCloud project data will be published on Open Science Framework</p>
            
        </div>
        <div style="display: flex; justify-content: center; padding-bottom: 50px;">
            <img src="https://i.ibb.co/5rm3MBF/Oc-logo-1c-l.png" alt="Oc-logo-1c-l" border="0" style="padding-right: 160px;">
            <img src="https://i.ibb.co/V9HgmQn/Osf-black.png" alt="Osf_black" border="0" id="osf" style="margin-left: 160px;">

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
                    class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 border border-green-500 rounded shadow"
                    style="outline-color: #60a5fa"
                    @click="centerDialogVisible = true"
                > PUBLISH
                </button>
            </div>
        </div>
            

        <el-dialog
        title="CAUTION"
        :visible.sync="centerDialogVisible"
        width="40%"
        center>
        <span>After publishing, you will not be able to change any files or metadata of this research project on sciebo RDS.</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">Publish</el-button>
        </span>
        </el-dialog>
    

    </div>
</template>



<script>

export default {
    data() {
        return {
         centerDialogVisible: false
      };
    }
  };

</script>
