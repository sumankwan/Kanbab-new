<template>
    <section id="login-page">
        <div class="container">
            <h3 class="text-center bg-warning">“Decide the outer boundaries of the kanban system. It is often best to limit this to the immediate span of political control. Do not force visualization, transparency, and WIP limits on any department that does not volunteer to collaborate.”  ~ David J. Anderson</h3><br>
            <div class="card">
                <div id="form-header">
                    <h5 class="card-header info-color white-text text-center py-4">
                    <strong>Sign in</strong>
                    </h5>
                </div>
                <div class="card-body px-lg-5 pt-0">
                    <form class="text-center" style="color: #757575;" action="#!">
                
                        <div class="md-form">
                            <input type="email" class="form-control" placeholder="input your email" v-model="login_email">
                            <label for="materialLoginFormEmail">E-mail</label>
                        </div>
                        
                        <div class="md-form">
                            <input type="password" class="form-control" placeholder="input your password" v-model="login_password">
                            <label for="materialLoginFormPassword">Password</label>
                        </div>
                
                        <button @click="login" class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0">Sign in</button>
    
                        <p>Not a user?
                            <br>
                            <button @click="registerForm" class="btn btn-success">Register</button>
                        </p>
                
                        <p>or sign in with:</p>
                        <GoogleLogin class="btn btn-primary" id="google" :params="params" :onSuccess="onSuccess">Google Sign-In</GoogleLogin>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import GoogleLogin from 'vue-google-login'
export default {
    name: 'LoginPage',
    components: {
        GoogleLogin
    },
    data() {
        return {
            login_email: '',
            login_password: '',
            params: {
                    client_id: "444938398854-kp9g9gmtbuuln5v5r8usi3io3bvfjenk.apps.googleusercontent.com"
            }
        }
    },
    methods: {
        login() {
            let payload_login = {
                email: this.login_email,
                password: this.login_password
            }
            this.$emit('submitLogin', payload_login)
        },
        registerForm() {
            this.$emit('registerForm')
        },
        onSuccess(googleUser) {
            
            console.log(googleUser);
        
            // This only gets the user information: id, name, imageUrl and email
            console.log(googleUser.getBasicProfile());

            let payload_google = {
                id_token: googleUser.getAuthResponse().id_token,
                email: googleUser.rt.$t
            }
            
            // let payload_google = googleUser.getAuthResponse().id_token
            
            this.$emit('googleSignIn', payload_google)
        }
    }
}
</script>

<style>

</style>