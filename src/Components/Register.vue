<template>
  <ion-list>
    <ion-item v-show="register_show" :color="register_color" class="ion-text-center">
      <ion-label>
        {{register_text}}
      </ion-label>
    </ion-item>
    <VeeForm @submit="submitForm" :validation-schema="schema">
      <ion-item>
          <ion-label position="fixed">E-Mail</ion-label>
          <VeeField as="ion-input" type="email" v-model="user.email" name="email"></VeeField>
          <ErrorMessage  name="email" ></ErrorMessage>
      </ion-item>
      <ion-item>
          <ion-label position="fixed">Password</ion-label>
          
            <VeeField as="ion-input" type="password" v-model="user.password" name="password" ></VeeField>
          
          <ErrorMessage  name="password"></ErrorMessage>
      </ion-item>
      <ion-item>
        <ion-label position="fixed" >Age</ion-label>
        <VeeField as="ion-input" type="number" v-model="user.age" name="age"></VeeField>
        <ErrorMessage  name="age"></ErrorMessage>
        </ion-item>
        <ion-item>
            <ion-label position="fixed" >Height (cm)</ion-label>
            <VeeField as="ion-input" type="number" v-model="user.height" name="height"></VeeField>
            <ErrorMessage  name="height"></ErrorMessage>
        </ion-item>
        <ion-item>
            <ion-label position="fixed" >Weight (kg)</ion-label>
            <VeeField as="ion-input" type="number" v-model="user.weight" name="weight"></VeeField>
            <ErrorMessage  name="weight"></ErrorMessage>
        </ion-item>

        <ion-item>
            <ion-label>Fitness Level</ion-label>
            <VeeField name="fitnessLevel" v-slot="{field}">
              <ion-select value="4" v-model="user.fitnessLevel" v-bind="field" name="fitnessLevel">
                <ion-select-option value="0" >No exersice</ion-select-option>
                <ion-select-option value="1">1–3 days a week</ion-select-option>
                <ion-select-option value="2">3–5 days a week</ion-select-option>                   
                <ion-select-option value="3">6–7 days a week</ion-select-option>                   
                <ion-select-option value="4">Hard labour/workout</ion-select-option>                   
              </ion-select>
            </VeeField>
            
            <ErrorMessage  name="fitnessLevel"></ErrorMessage>
        </ion-item>
        <ion-item>
            <ion-label>Biological Sex</ion-label>
            <VeeField name="gender" v-slot="{field}">
              <ion-select value="1" v-model="user.gender" v-bind="field" name="gender">
                <ion-select-option value="0" >Male</ion-select-option>
                <ion-select-option value="1">Female</ion-select-option>                
              </ion-select>
            </VeeField>
            
            <ErrorMessage  name="gender"></ErrorMessage>
        </ion-item>
        <ion-button ion-button type="submit">Register</ion-button>
    </VeeForm>
  </ion-list>
</template>

<script>
import {
    IonList, 
    IonItem,
    IonLabel,
    //IonInput,
    IonSelect,
    IonSelectOption,
    IonButton

} from '@ionic/vue'

import {Form as VeeForm, Field as VeeField, defineRule, ErrorMessage} from 'vee-validate'
import {required, max, email,max_value} from '@vee-validate/rules'

defineRule('required', required)
defineRule('max', max, )
defineRule('email', email)
defineRule('max_value', max_value)


export default {

  name: "myForm",
  methods: {
    async submitForm() {

      this.register_text = 'Register in progress';
      this.register_color = 'tertiary';
      this.register_show = true;

      try {
        await this.$store.dispatch('register', this.user)
      } catch (error) {
        this.register_text = 'Error! Try again later';
        this.register_color = 'danger';
        return
      }

      this.register_text = 'Success';
      this.register_color = 'success';
      window.location.reload();
    }
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        age: null,
        height: '',
        weight: '',
        fitnessLevel: '',
        gender: '',
      },
      schema:{
        email: 'required|max:100|email',
        password: 'required|max:100',
        age: 'required|max:100|max_value:100',
        height: 'required|max:100|max_value:210',
        weight: 'required|max:100|max_value:300',
        fitnessLevel: 'required|',
        gender: 'required',
      },
      register_text: 'Success',
      register_color: 'success',
      register_show: false
    }
  },
  components: {
    IonList,
    IonItem,
    IonLabel,
    //IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    VeeForm,
    ErrorMessage,
    VeeField
  },
}
</script>

<style>

</style>