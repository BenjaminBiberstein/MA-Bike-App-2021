<template>
    <BaseLayout pageTitle="Settings">
        <ion-list>
            <ion-item v-show="register_show" :color="register_color" class="ion-text-center">
                <ion-label>
                    {{register_text}}
                </ion-label>
            </ion-item>
            <VeeForm @submit="submitForm" >
                <ion-item>
                    <ion-label position="fixed" >Age</ion-label>
                    <VeeField as="ion-input" type="number" v-model="user.age" name="age" :placeholder="`${getUser.age}`"></VeeField>
                    <ErrorMessage  name="age"></ErrorMessage>
                </ion-item>
                <ion-item>
                    <ion-label position="fixed" >Height (cm)</ion-label>
                    <VeeField as="ion-input" type="number" v-model="user.height" name="height" :placeholder="`${getUser.height}`"></VeeField>
                    <ErrorMessage  name="height"></ErrorMessage>
                </ion-item>
                <ion-item>
                <ion-label position="fixed" >Weight (kg)</ion-label>
                <VeeField as="ion-input" type="number" v-model="user.weight" name="weight" :placeholder="`${getUser.weight}`"></VeeField>
                <ErrorMessage  name="weight"></ErrorMessage>
                </ion-item>

                <ion-item>
                    <ion-label>Fitness Level</ion-label>
                    <VeeField name="fitnessLevel" v-slot="{field}">
                    <ion-select value="4" v-model="user.fitnessLevel" v-bind="field" name="fitnessLevel" :placeholder="`${fittnessText}`">
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
                    <ion-select value="1" v-model="user.gender" v-bind="field" name="gender" :placeholder="`${genderText}`">
                        <ion-select-option value="0" >Male</ion-select-option>
                        <ion-select-option value="1">Female</ion-select-option>                
                    </ion-select>
                    </VeeField>
                    
                    <ErrorMessage  name="gender"></ErrorMessage>
                </ion-item>
                <ion-button ion-button type="submit">Update Information</ion-button>
            </VeeForm>
        </ion-list>
    </BaseLayout>

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

import {Form as VeeForm, Field as VeeField, ErrorMessage} from 'vee-validate'
import BaseLayout from '../Components/base/BaseLayout.vue'




export default {

  name: "Settings",
  computed: {
      getUser() {
          return this.$store.getters.getUser
      }
  },
  async mounted() {
              await this.$store.dispatch('getUserData');
              this.getTexts()
  },
  methods: {
    async submitForm() {

      this.register_text = 'Register in progress';
      this.register_color = 'tertiary';
      this.register_show = true;
        
        //Checking for updates otherwis using old value
        if(this.user.age == null) {
            this.user.age = this.getUser.age
        }
        if(this.user.height == '') {
            this.user.height = this.getUser.height
        }
        if(this.user.weight == '') {
            this.user.weight = this.getUser.weight
        }
        if(this.user.fitnessLevel == '') {
            this.user.fitnessLevel = this.getUser.fitnessLevel
        }
        if(this.user.gender == '') {
            this.user.gender = this.getUser.gender
        }

      try {
        await this.$store.dispatch('updateUserData', this.user)
      } catch (error) {
        this.register_text = 'Error! Try again later';
        this.register_color = 'danger';
        return
      }

      this.register_text = 'Success';
      this.register_color = 'success';
      window.location.reload();
    },
    //Texts for the placeholder text in gender and fittnesLevel
    getTexts() {
        //gender text
        for(let i = 0; i < this.genderTextOtions.length; i++) {
            if(this.genderTextOtions[i].id == this.getUser.gender) {
                this.genderText = this.genderTextOtions[i].text; 
            }
        }
        //fittnessLevel text
        for(let i = 0; i < this.fittnessTextOptions.length; i++) {
            if(this.fittnessTextOptions[i].id == this.getUser.fitnessLevel) {
                this.fittnessText = this.fittnessTextOptions[i].text; 
            }
        }
    },
  },
  data() {
    return {
        //oldFitnessLevel: this.getUser.fitnessLevel,
      user: {
        age: null,
        height: '',
        weight: '',
        fitnessLevel: '',
        gender: '',
      },
    genderTextOtions: [
        {
            id: 0,
            text: 'male'
        },
        {
            id: 1,
            text: 'female'
        }
    ],
    genderText: "",
    fittnessTextOptions: [
        {
            id: 0,
            text: 'No exersice' 
        },
        {
            id: 1,
            text: '1–3 days a week' 
        },
        {
            id: 2,
            text: '3–5 days a week' 
        },
        {
            id: 3,
            text: '6–7 days a week'
        },
        {
            id: 4,
            text: 'Hard labour/workout'
        },
    ],
    fittnessText: "",
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
    VeeField,
    BaseLayout
  },
  
}
</script>

<style>

</style>