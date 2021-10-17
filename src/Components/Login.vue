<template>
  <ion-list>
      <ion-item v-show="login_show" :color="login_color" class="ion-text-center">
      <ion-label>
        {{login_text}}
      </ion-label>
    </ion-item>
      <VeeForm @submit="login" :validation-schema="schema">
      <ion-item>
          <ion-label position="fixed">E-Mail</ion-label>
          <VeeField as="ion-input" type="email" v-model="user.email" name="email" ></VeeField>
          <ErrorMessage name="email"></ErrorMessage>
      </ion-item>
      <ion-item>
          <ion-label position="fixed">Password</ion-label>
          <VeeField as="ion-input" type="password" v-model="user.password" name="password"></VeeField>
          <ErrorMessage name="password"></ErrorMessage>
      </ion-item>
      <ion-button type="submit">Login</ion-button>
      </VeeForm>
  </ion-list>
</template>

<script>
import {
    IonList, 
    IonItem,
    IonLabel,
    //IonInput,
    IonButton
} from '@ionic/vue'

import {Form as VeeForm, Field as VeeField, defineRule, ErrorMessage} from 'vee-validate'
import {required, email} from '@vee-validate/rules'

defineRule('required', required)
defineRule('email', email)

//import firebase from '../inclueds/firebase'

export default {
    name: "myLogin",
    components: {
        IonList,
        IonItem,
        IonLabel,
        //IonInput,
        VeeForm,
        ErrorMessage,
        VeeField,
        IonButton
    },
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            schema: {
                email: 'required|email',
                password: 'required',
            },
            login_text: '',
            login_color: '',
            login_show: false,
        }
    },
    methods: {
        async login() {
            this.login_text = 'Login in progress';
            this.login_color = 'tertiary';
            this.login_show = true; 

            try {
            await this.$store.dispatch('login', this.user);
            } catch (erro) {
                this.login_text = 'Invalid login details';
                this.login_color = 'danger';
                return;
            }

            this.login_text = 'Success';
            this.login_color = 'success';
            window.location.reload();
        }
    }
    
}
</script>

<style>

</style>