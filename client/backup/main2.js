const baseUrl = `http://localhost:3000`

function onSignIn (googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.          
}

Vue.component('', {
    data: function() {
        return {
            count: 0
        }
    },
    methods: {

    },
    template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

var app = new Vue({
    el: '#app',
    data: {
      login_email: '',
      login_password: '',
      pageName: 'login',
      add_category: '',
      add_title: '',
      update_id: '',
      update_category: '',
      update_title: '',
      register_email: '',
      register_password: '',
      tasks: [],
      categories: [
          {
            category: 'backlog',
            seen_backlog: false
          },
          {
            category: 'development',
            seen_development: false
          },
          {
            category: 'product',
            seen_product: false
          },
          {
            category: 'done',        
            seen_done: false
          }
        ]
    },
    methods: {
        login: function () {
            console.log(this.login_email)
            console.log(this.login_password)
            axios({
                method: 'post',
                url: `${baseUrl}/login`,
                data: {
                    email: this.login_email,
                    password: this.login_password
                }
            })
            .then(({data}) => {
                console.log(data)
                localStorage.setItem('token', data.token)
                this.checkAuth()
            })
            .catch((err) => {
                console.log(err)
            })
        },
        checkAuth() {
            if (localStorage.token) {
                this.pageName = 'home'
                this.fetchTasks()
            } else {
                this.pageName = 'login'
            }
        },
        fetchTasks: function() {
            axios({
                method: 'get',
                url: `${baseUrl}/tasks`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                this.tasks = data.tasks
            })
            .catch(err => {
                console.log(err)
            })
        },
        filteredCategory (category) {
            return this.tasks.filter(el => el.category === category)
        },
        logout: function () {
            const auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
              console.log('User signed out.');
            });        
            localStorage.clear()
            this.checkAuth()
        },
        addTaskForm: function () {
            this.pageName = 'addform'
        },
        addTask: function() {
            console.log(this.add_title)
            console.log(this.add_category)
            axios({
                method: 'post',
                url: `${baseUrl}/tasks`,
                data: {
                    title: this.add_title,
                    category: this.add_category
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteTask: function(id) {
            axios({
                method: 'delete',
                url: `${baseUrl}/tasks/delete/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
        },
        updateTaskForm: function(id) {
            axios({
                method: 'get',
                url: `${baseUrl}/tasks/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                this.update_id = data.task.id
                this.update_title = data.task.title
                this.update_category = data.task.category
                this.pageName = 'updateform'
            })
            .catch(err => {
                console.log(err)
            })
        },
        updateTask: function(id) {
            console.log(this.update_title)
            console.log(this.update_category)
            axios({
                method: 'put',
                url: `${baseUrl}/tasks/update/${id}`,
                data: {
                    title: this.update_title,
                    category: this.update_category
                },
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                console.log(data)
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
        },
        // onSignIn: function (googleUser) {
        //     var profile = googleUser.getBasicProfile();
        //     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        //     console.log('Name: ' + profile.getName());
        //     console.log('Image URL: ' + profile.getImageUrl());
        //     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.          
        //     // let id_token = googleUser.getAuthResponse().id_token
        //     // console.log(id_token)
        //     // localStorage.setItem('token', id_token)
        //     // this.checkAuth()
        // },
        registerForm: function () {
            this.pageName = "register"
        },
        register: function () {
            console.log(this.register_email)
            console.log(this.register_password)
            axios({
                method: 'post',
                url: `${baseUrl}/register`,
                data: {
                    email: this.register_email,
                    password: this.register_password
                }
            })
            .then(({data}) => {
                console.log(data)
                this.checkAuth()
            })
            .catch(err => {
                console.log(err)
            })
        }      
    },
    created () {
        this.checkAuth()
    }
  })