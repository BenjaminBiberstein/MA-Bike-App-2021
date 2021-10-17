<template>
    <base-layout page-title="Ride Selecetor">
        <!-- <rides-list :rides="rides"></rides-list> -->
        <ion-list v-if="!isEditing">
            <ion-item  v-for="ride in rideData" :key="ride.rideId" >
                <ion-label :router-link="`/ridingSelector/${ride.rideId}`"> {{ride.name}} {{ride.date}}</ion-label> 
                <ion-icon @click="edit(ride.rideId)" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'%3E%3Ctitle%3ECreate%3C/title%3E%3Cpath d='M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/%3E%3Cpath d='M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z'/%3E%3C/svg%3E"></ion-icon>
                <ion-icon @click="deleteData(ride.rideId)" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='ionicon' viewBox='0 0 512 512'%3E%3Ctitle%3ETrash%3C/title%3E%3Cpath d='M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/%3E%3Cpath stroke='currentColor' stroke-linecap='round' stroke-miterlimit='10' stroke-width='32' d='M80 112h352'/%3E%3Cpath d='M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='32'/%3E%3C/svg%3E"></ion-icon>
            </ion-item>
        </ion-list>
        <ion-item v-if="isEditing">
            <ion-label position="fixed">Ride name</ion-label>
            <ion-input type="text" name="name" v-model="editingData.name" placeholder="new ride name"></ion-input>
            <ion-button @click="cancel">Cancel</ion-button>
            <ion-button @click="rename">Submit</ion-button>
        </ion-item>
    </base-layout>
</template>

<script>
import BaseLayout from '../Components/base/BaseLayout.vue'
//import RidesList from '../Components/RidesList.vue'
//import { useStore } from 'vuex'
import {
    //IonButton,
    IonItem,
    IonList,
    IonLabel,
    IonIcon,
    IonButton, 
    IonInput,
} from '@ionic/vue'


export default {
    name: 'RidingScreenSelector',
    components: {
        BaseLayout,
        //RidesList,
        IonButton,
        IonItem,
        IonList,
        IonLabel,
        IonIcon,
        IonInput,
    },
    data() {
        return {
            isEditing: false,
            editingData: {
                name: "",
                rideId: "",
                renameValue: false,
            },
        }
    },
    computed: {
        rideData() {
            //gets ride data
            return this.$store.getters.rideData;
        }
    },
    mounted() {
        //loads ride data on mounted
        this.$store.dispatch('getRideData')
        
    },
    methods: {
        edit(rideId) {
            //toggeling the input field
            this.isEditing = !this.isEditing;
            //seting the rideId from ride that needs to bechanged
            this.editingData.rideId = rideId;

        },
        async rename() {
            this.isEditing = !this.isEditing;
            /* if(this.editingData == "") {
                this.editingData = this.rideData.name
            } */
            await this.$store.dispatch('nameRide', this.editingData)
            this.renameValue = true
            setTimeout(this.reloadPage, 500)
        },
        deleteData(rideId) {
            this.editingData.rideId = rideId
            this.$store.dispatch('deletRide', this.editingData)
        },
        reloadPage() {
            if(this.renameValue) {
                window.location.reload(true);
                this.renameValue = false
            }
            
        },
        cancel() {
            this.isEditing = !this.isEditing;
        }
    },
}
</script>
