<template>
    <base-layout page-title="Riding Screen">

        <GMap></GMap>
    </base-layout>
</template>

<script>
//import { onMounted } from '@vue/runtime-core'
//import MyMaps from '../Components/Map.vue'


import BaseLayout from '../Components/base/BaseLayout.vue'
//import MyMap from '../Components/Maps.vue'
import GMap from '../Components/GoogleMaps.vue'

export default {
    name: 'RidingScreen',
    components: {
        BaseLayout,
        //MyMap,
        GMap,
        
    },

}
</script>
