/* eslint-disable vue/script-setup-uses-vars */
/* eslint-disable vue/script-setup-uses-vars */
<template>
  <ion-app>
    <!-- Import Menu global -->
    <GlobalMenu/>
    <ion-router-outlet />
  </ion-app>
</template>

<script >
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import GlobalMenu from './Components/GlobalMenu.vue'
export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    GlobalMenu
  },
  created() {
    /* Keeping user loged in */
    this.$store.dispatch('init_login');
  },
});
</script>