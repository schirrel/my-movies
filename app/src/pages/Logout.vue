<template>
    <div class="container">


<article>
    <h4> Saindo, aguarde...</h4>

</article>  
    </div>
</template>

<script>
import Auth from '../services/security/Auth';
    export default {
        name: 'Login',

        mounted() {
            Auth.logout(()=>{
                    this.$router.push({name:'login'})
                })
        },
        data() {
            return {
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    text-align: left;
}
  
</style>