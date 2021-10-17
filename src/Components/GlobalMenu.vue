<template>
    <ion-menu side="start"  menu-id="first" content-id="globalMenu">
        <ion-header>
            <ion-toolbar color="tertiary">
                <ion-title>Menu</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list >
                <ion-button expand="full" router-link="/settings" color="danger">Settings</ion-button>
                <ion-button expand="full" router-link="/ridingScreen" color="danger">Riding Screen</ion-button>                    
                <ion-button expand="full" router-link="/ridingSelector" @click="reloadPage" color="danger">Riding Selector</ion-button>   
                <ion-button expand="full" router-link="/home" @click.prevent="signout" color="danger">Log out</ion-button>
            </ion-list>
        </ion-content>
    </ion-menu>
   <ion-router-outlet id="globalMenu"></ion-router-outlet>
</template>

<script>
import { 
  IonContent, 
  IonHeader, 

  IonList, 
  IonMenu, 
  IonRouterOutlet,
  IonTitle, 
  IonToolbar,
  IonButton,
} from '@ionic/vue';

import {mapActions} from 'vuex';

export default {
  name: 'GlobalMenu',
  props: ['pageTitle'],
  components: {
    IonContent, 
    IonHeader, 
    IonList, 
    IonMenu, 
    IonRouterOutlet,
    IonTitle, 
    IonToolbar,
    IonButton,
  },
  methods: {
    ...mapActions(['signout', 'reloadPage']),

  }
}

</script>
