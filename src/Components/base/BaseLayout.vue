<template>
   <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-buttons slot="start">
          <ion-back-button :default-href="defaultBackLink"></ion-back-button>
        </ion-buttons>
        
        <ion-menu-button slot="end"/>
        <ion-title>{{pageTitle}}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-text-center">
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonMenuButton, IonBackButton, IonButtons

} from '@ionic/vue'; 

export default {
    props: ['pageTitle', 'defaultBackLink'],
    components: {
    IonContent, 
    IonHeader, 
    IonPage, 
    IonTitle, 
    IonToolbar,
    IonMenuButton,
    IonBackButton,
    IonButtons
}
}
</script>

<style>

</style>