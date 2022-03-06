<template>
    <section id="home-page">
        <div style="margin-right: 45px; margin-left: 45px">
            <div class="row" style="margin-top: 25px;">
                <Category 
                    v-for="(category, i) in categoriesData" 
                    :key="i"
                    :categoryContainer="category"
                    :tasksContainer="tasksData"
                    @deleteTask="deleteTask"
                    @updateTaskForm="updateTaskForm"
                    @fetchTasks="fetchTasks">
                </Category>
            </div>
        </div>
    </section>   
</template>

<script>
import Category from '../components/Category'
export default {
    name: 'HomePage',
    props: [ 'tasksData', 'categoriesData' ],
    components: {
        Category
    },
    methods: {
        deleteTask(payload_delete) {
            this.$emit('deleteTask', payload_delete)
        },
        updateTaskForm(payload_update) {
            this.$emit('updateTaskForm', payload_update)
        },
        fetchTasks() {
            this.$emit('fetchTasks')
        }
    }
}
</script>

<style>

</style>