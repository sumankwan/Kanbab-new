<template>
    <section id="register-page">
        <div class="container">
            <div class="card">
                <div id="form-header">
                    <h5 class="card-header info-color white-text text-center py-4">
                    <strong>Register</strong>
                    </h5>
                </div>
                <div class="card-body px-lg-5 pt-0">
                    <form class="text-center" style="color: #757575;" action="#!">
                
                        <div class="md-form">
                            <input type="email" v-model="register_email" class="form-control">
                            <label for="materialLoginFormEmail">E-mail</label>
                        </div>
                        
                        <div class="md-form">
                            <input type="password" v-model="register_password" class="form-control">
                            <label for="materialLoginFormPassword">Password</label>
                        </div>
                
                        <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" @click="register">Register</button>
                        
                        <button type="button" class="btn btn-danger" id="back-register" @click="back">Back</button>
                
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'RegisterPage',
    data() {
        return {
            register_email: '',
            register_password: ''
        }
    },
    methods: {
        register() {
            let payload_register = {
                email: this.register_email,
                password: this.register_password
            }
            this.$emit('register', payload_register)
        },
         back() {
            this.$emit('back')
        }
    }
}
</script>

<style>

</style>