<template>
    <div>
        <!-- {{ taskDetail }} -->
        <div class="card-body bg-light mb-3 border-light rounded card-container">
            <i>{{ taskDetail.thisIsMe }}</i>
            <h4 class="card-text">{{ taskDetail.title }}</h4>
            <p class="card-text">Assignee: {{ taskDetail.User.email }}</p>
            <button class="btn btn-success" id="edit-delete" v-on:click="updateTaskForm(taskDetail.id)">Edit</button>
            <button class="btn btn-danger" id="edit-delete" @click="deleteTask(taskDetail.id)">Delete</button>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
    name: 'Task',
    props: [ 'taskDetail' ],
    data() {
        return {
            yours: false
        }
    },
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