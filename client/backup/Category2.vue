<template>
    <div class="col-3">
        <div class="card" >
            <div class="card-body category-container rounded">
                <h4 class="card-title">{{ categoryContainer.category }}</h4>
                <div style="position: relative; height: 65vh; overflow-y: auto;">
                    <div class="container">
                        <draggable v-model="myArray">
                            <transition-group>
                                <div v-for="element in myArray" :key="element.id">
                                    {{element.name}}
                                    <Task
                                        v-for="task in filteredTask"
                                        :key="task.id"
                                        :taskDetail="task"
                                        @deleteTask="deleteTask"
                                        @updateTaskForm="updateTaskForm">
                                    </Task>
                                </div>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Task from './Task'
import draggable from 'vuedraggable'
export default {
    name: 'Category',
    props: [ 'categoryContainer', 'tasksContainer' ],
    components: {
        Task, draggable
    },
    computed: {
        filteredTask() {
            return this.tasksContainer.filter(el => el.category == this.categoryContainer.category)
        }
    },
    methods: {
        deleteTask(payload_delete) {
            this.$emit('deleteTask', payload_delete)
        },
        updateTaskForm(payload_update) {
            this.$emit('updateTaskForm', payload_update)
        }
    }
}
</script>

<style>

</style>