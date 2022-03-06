<template>
   <section id="addform-page" >
        <div class="container" id="form-add-update">
            <div class="card">
                <div id="form-header">
                    <h5 class="card-header info-color white-text text-center py-4">
                    <strong>Add task</strong>
                    </h5>
                </div>
                <div class="card-body px-lg-5 pt-0">
                    <form class="text-center" style="color: #757575;" action="#!" @submit.prevent="addTask">
                
                        <div class="input-group input-group-sm mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroup-sizing-sm">Category</span>
                            </div>
                            <!-- <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" v-model="add_category"> -->
                            <select v-model="add_category">
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
                            <textarea class="form-control" aria-label="With textarea" v-model="add_title"></textarea>
                        </div>

                        <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Add</button>
                        <button type="button" class="btn btn-danger" id="back-add-update" @click="back">Back</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AddFormPage',
    data() {
        return {
            add_title: '',
            add_category: ''
        }
    },
    methods: {
        addTask() {
            let payload_addTask = {
                title: this.add_title,
                category: this.add_category
            }
            this.$emit('addTask', payload_addTask)
        },
        back() {
            this.$emit('back')
        }
    }
}
</script>

<style>
    
</style>