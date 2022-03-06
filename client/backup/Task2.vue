<template>
    <div>
        <!-- {{ taskDetail }} -->
        <div class="card-body bg-light mb-3 border-light rounded card-container">
            <h4 class="card-text">{{ taskDetail.title }}</h4>
            <p class="card-text">Assignee: {{ taskDetail.User.email }}</p>
            <button class="glyphicon glyphicon-pencil" v-on:click="updateTaskForm(taskDetail.id)"></button>
            <button class="glyphicon glyphicon-remove" @click="deleteTask(taskDetail.id)"></button>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'Task',
    props: [ 'taskDetail' ],
    components: {
        draggable
    },
    methods: {
        deleteTask(id) {
            let payload_delete = id
            this.$emit('deleteTask', payload_delete)
        },
        updateTaskForm(id) {
            let payload_update = id
            this.$emit('updateTaskForm', payload_update)
        }
    }
}
</script>

<style>

</style>