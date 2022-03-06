<template>
    <section id="updateform-page">
        <div class="container" id="form-add-update">
            <div class="card">
                <div id="form-header">
                    <h5 class="card-header info-color white-text text-center py-4">
                    <strong>Update task</strong>
                    </h5>
                </div>
                <div class="card-body px-lg-5 pt-0">
                    <form class="text-center" style="color: #757575;" action="#!" @submit.prevent="updateTask(updateDatas[0])">
                    
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Category</span>
                            </div>
                            <!-- <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model="updateDatas[2]"> -->
                            <select v-model="updateDatas[2]">
                                <option value="backlog">backlog</option>
                                <option value="development">development</option>
                                <option value="product">product</option>
                                <option value="done">done</option>  
                            </select>
                        </div>

                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Title</span>
                            </div>
                            <textarea class="form-control" aria-label="With textarea" v-model="updateDatas[1]"></textarea>
                        </div>
                        <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Update</button>
                        <button type="button" id="back-add-update" class="btn btn-danger" @click="back">Back</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'UpdateFormPage',
    props: ['updateDatas'],
    methods: {
        updateTask(id) {
            console.log(this.updateDatas)
            let payload_updated = {
                id: id, 
                title: this.updateDatas[1], 
                category: this.updateDatas[2]
                }
            this.$emit('updateTask', payload_updated) 
        },
        back() {
            this.$emit('back')
        }
    }
}
</script>

<style>

</style>