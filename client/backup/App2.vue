<template>
    <div>   
        <Navbar 
            v-if="pageName !== 'LoginPage' && pageName !== 'RegisterPage'"
            :login_emails="login_email"
            @openAddForm="addTaskForm"
            @logout="logout">
        </Navbar>

        <RegisterPage 
            v-if="pageName == 'RegisterPage'"
            @register="register"
            @back="checkAuth">
        </RegisterPage>

        <LoginPage
            v-if="pageName == 'LoginPage'"
            @submitLogin="login"
            @registerForm="registerForm"
            @googleSignIn="googleSignIn">
        </LoginPage>

        <HomePage
            v-if="pageName == 'HomePage'"
            :tasksData="tasks"
            :categoriesData="categories"
            @deleteTask="deleteTask"
            @updateTaskForm="updateTaskForm"
            @fetchTasks="fetchTasks">
        </HomePage>

        <AddFormPage 
            v-if="pageName == 'AddFormPage'"
            @addTask="addTask"
            @back="checkAuth">
        </AddFormPage>

        <UpdateFormPage 
            v-if="pageName == 'UpdateFormPage'"
            :updateDatas="updateData"
            @updateTask="updateTask"
            @back="checkAuth">
        </UpdateFormPage>

    </div>
</template>

<script>
import Navbar from './components/Navbar'
import RegisterPage from './views/RegisterPage'
import LoginPage from './views/LoginPage'
import HomePage from './views/HomePage'
import AddFormPage from './views/AddFormPage'
import UpdateFormPage from './views/UpdateFormPage'
import axios from './config/axios'
import swal from 'sweetalert';
export default {
    name: 'App',
    data() {
        return {
            login_email: '',
            pageName: 'LoginPage',
            updateData: [],
            tasks: [],
            categories: [
            {
                category: 'backlog',
                color: 'bg-info'
            },
            {
                category: 'development',
                color: 'bg-success'
            },
            {
                category: 'product',
                color: 'bg-danger'
            },
            {
                category: 'done',
                color: 'bg-warning'
            }
            ]
        }
    },
    components: {
        Navbar, LoginPage, RegisterPage, HomePage, AddFormPage, UpdateFormPage
    },
    methods: {
        checkAuth() {
             if (localStorage.token) {
                this.pageName = 'HomePage'
                this.fetchTasks()
            } else {
                this.pageName = 'LoginPage'
            }
        },
        login (payload_login) {
            console.log(payload_login)
            axios({
                method: 'post',
                url: `/login`,
                data: {
                    email: payload_login.email,
                    password: payload_login.password,
                }
            })
                .then(({data}) => {
                    console.log(data)
                    localStorage.setItem('token', data.token)
                    swal("", "login is successful", "success");
                    this.login_email = payload_login.email
                    this.checkAuth()
                })
                .catch((err) => {
                    console.log(err)
                    swal("login is failed", "invalid email or password", "error");
                })
        },
        logout() {
            localStorage.clear()
            this.checkAuth()
        },
        fetchTasks() {
            axios({
                url: '/tasks',
                method: 'get',
                headers: {
                    token: localStorage.token
                }
            })
                .then(({data}) => {
                    console.log(data)
                    this.tasks = data.tasks
                    for (let i = 0; i < this.tasks.length; i++) {
                        if(this.tasks[i].User.email == this.login_email) {
                            this.tasks[i].thisIsMe = 'this is yours!'
                        }
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addTaskForm () {
            this.pageName = 'AddFormPage'
        },
        addTask(payload_addTask) {
            console.log(payload_addTask)
            axios({
                method: 'post',
                url: `/tasks`,
                data: {
                    title: payload_addTask.title,
                    category: payload_addTask.category
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                swal("", "task addition is successful", "success");
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
                swal("", "all fields have to be filled in", "error");
            })
        },
        deleteTask(payload_delete) {
            console.log('coba', payload_delete)
            axios({
                method: 'delete',
                url: `/tasks/delete/${payload_delete}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                swal("", "task deletion is successful", "success");
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
                swal("you are not authorized", "", "error");
            })
        },
        updateTaskForm(payload_update) {
            axios({
                method: 'get',
                url: `/tasks/${payload_update}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                this.updateData.push(data.task.id, data.task.title, data.task.category)
                this.pageName = 'UpdateFormPage'
            })
            .catch(err => {
                console.log(err)
                swal("you are not authorized", "", "error");
            })
        },
        updateTask(payload_updated) {
            axios({
                method: 'put',
                url: `/tasks/update/${payload_updated.id}`,
                data: {
                    title: payload_updated.title,
                    category: payload_updated.category
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                swal("", "task update is successful", "success");
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
                swal("", "all fields have to be filled in", "error");

            })
        },
        registerForm: function () {
            this.pageName = "RegisterPage"
        },
        register (payload_register) {
            axios({
                method: 'post',
                url: `/register`,
                data: {
                    email: payload_register.email,
                    password: payload_register.password
                }
            })
            .then(({data}) => {
                console.log(data)
                swal("", "registration is successful", "success");
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
                swal("email is invalid", "", "success");
            })
        },
        googleSignIn(payload_google) {
            let id_token = payload_google.id_token
            axios({
                url: `/googleSignIn`,
                method: 'post',
                data: {
                    id_token
                }
            })
                .then(({ data }) => {
                    console.log(data)
                    this.login_email = payload_google.email
                    swal("", "Google sign-in is successful", "success");
                    localStorage.setItem('token', data.token)
                    this.checkAuth()
                })
                .catch(err => {
                    swal("", "Google sign-in is failed", "error");
                    console.log(err)
                })
        }
    },
    created() {
        this.checkAuth()
    }
}
</script>

<style>
    #form-add-update{width: 500px;}
    #back-add-update{width: 410px;}
    #back-register{width: 1050px;}
    #edit-delete{margin: 3px;}
</style>