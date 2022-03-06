<template>
    <div class="col-3">
        <div class="card" >
            <div 
                class="card-body category-container rounded shadow-lg" 
                style="color: black;">
                <!-- :class="categoryContainer.color"> -->
                <h4 class="card-title">{{ categoryContainer.category }}</h4>
                <div style="position: relative; height: 65vh; overflow-y: auto;">
                    <div class="container">
                        <draggable :list="filteredTask" group="task" :move="onMove" :category="categoryContainer" @end="updateCategory">
                            <Task
                                v-for="task in filteredTask"
                                :key="task.id"
                                :taskDetail="task"
                                :id="task.id"
                                @deleteTask="deleteTask"
                                @updateTaskForm="updateTaskForm">
                            </Task>
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
import axios from '../config/axios'
import swal from 'sweetalert';
export default {
    name: 'Category',
    props: [ 'categoryContainer', 'tasksContainer' ],
    data() {
        return {
            currentId: null,
            currentCategory: null
        }
    },
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
        },
        updateCategory() {
            axios({
                method: 'patch',
                url
            })
        },
        onMove(evt) {
            console.log(evt)
            console.log(evt.draggedContext.element.id)
            console.log(evt.relatedContext.component.$attrs.category.category)
            this.currentId = evt.draggedContext.element.id
            // this.currentCategory = evt.relatedContext.component.$attrs.category.category
            this.currentCategory = evt.relatedContext.component.$attrs.category.category
        },
        updateCategory() {
            axios({
                url: `/tasks/updateCategory/${this.currentId}`,
                method: 'patch',
                data: {
                    category: this.currentCategory
                },
                headers: {
                    token: localStorage.token
                }
            })
                .then(_ => {
                    this.$emit('fetchTasks')
                })
                .catch(err => {
                    console.log(err)
                    if (this.currentId !== null) {
                        swal("you are not authorized", "", "error");
                    } else {
                        swal("", "please drag and hold on target category for 3 seconds", "error")
                    }
                })
        }
    }
}
</script>

<style>

</style>