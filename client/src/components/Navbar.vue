<template>
     <section id="navbar">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <button class="btn-warning" style="margin-top: 12.5px" @click="addTaskForm">Add a task</button>
                <div class="collapse navbar-collapse d-flex flex-row-reverse" id="navbarSupportedContent">
                    <button class="btn btn-outline-primary my-2 my-sm-0" @click="logout">Logout</button>
                    <span class="bg-warning" style="margin-right: 5px;">{{ login_emails }}</span>   
                </div>
            </nav>
    </section>
</template>

<script>
export default {
    name: 'Navbar',
    props: ['login_emails'],
    methods: {
        addTaskForm() {
            this.$emit('openAddForm')
        },
        logout() {
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style>