<template>
    
  <div class="map" ref="mapDivRef" ></div>
  <div> Latitude: {{loc.lat}}, Longitude: {{loc.lng}}</div>
  <!-- <h2>km/h: {{currSpeed.speed}} </h2> -->
  <h2 v-if="!speedCheker">km/h: 0</h2>
  <h2 v-else>km/h: {{speed}}</h2>
  <h2>Time: {{time}}</h2>
  <h2>km: {{rideDistance}}</h2>

    
    <ion-button v-if="!userRiding" @click="startRide">Start Riding</ion-button>
    <ion-button v-else @click="endRide">Finish Ride</ion-button>
    <ion-button  @click="recenter">Recenter on Location</ion-button>


    <!-- <ion-button @click="test"></ion-button> -->

</template>

<script>
//import { App, BackgroundTask } from '@capacitor/core';
import {IonButton} from '@ionic/vue'
import {ref, onMounted, computed, } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

import {Loader} from '@googlemaps/js-api-loader'

const GOOGLE_MAPS_API_KEY = YOURAPIKEY


import { useStore } from 'vuex'


export default {
    props: {

    },
    setup() {
        
        //initialize store
        const store = useStore()

        const userRiding = computed(() => store.state.userRiding) 

        //Api key setup and Map Div
        const loader = new Loader({apiKey: GOOGLE_MAPS_API_KEY})
        const mapDivRef = ref(null) 

        //Map
        const myMap = ref();
        onMounted(async () => {
            await getCurrentPosition()
        

            await loader.load()        
            
            
            // eslint-disable-next-line no-undef
            myMap.value = new google.maps.Map(mapDivRef.value, {
                center: loc.value,
                zoom: 20,
                mapTypeId: 'satellite',
                mapDetails: 'biking'
            }) 

            //Creates new marker
            creatMarker()
            
            
            myMap.value.setCenter(loc.value);   
            
        })

        setInterval(() => {
                //Getting position
                getCurrentPosition()

                if(userRiding.value) {
                //Calling function that creates firebase docs
                startRide()
                //calculates ridden distance when ridign
                calculateDistance()
                //Centering Map view
                myMap.value.setCenter(loc.value);
                }
                diplayMarker()
                
                //Check speed value
                if(loc.value.speed == null) {
                    speedCheker.value = false;
                } else {
                    speedCheker.value = true;
                }

                
                
                //m/s to km/h
                speed.value = (loc.value.speed * 3.6).toFixed(1)
            }, 5000)

        //Crate speed 
        const speed = ref()

        const markerStorer = ref([])
        const marker = ref()
        //Create marker
        const creatMarker = () => {
            const bikeIcon = {
                url: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='30px' height='20px' viewBox='0 0 30 20' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3EBice%3C/title%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='Bice' transform='translate(0.000000, 0.000000)' fill='%23FF3CC3'%3E%3Cpath d='M23.3425711,6.67776234 C23.0502646,6.68081559 22.7584753,6.70307839 22.469092,6.74440664 L22.3224009,6.17126565 C22.3493442,6.03933728 22.3493442,5.90332821 22.3224009,5.77139984 L21.655623,3.10562777 C21.623508,2.98023905 21.566852,2.86245386 21.4889285,2.7590774 L20.9888451,0.759748351 C20.8782366,0.312567726 20.4762228,-0.00117576746 20.0153493,3.31207338e-06 L16.0146819,3.31207338e-06 C15.462305,3.31207308e-06 15.014515,0.447568365 15.014515,0.999667838 C15.014515,1.55176731 15.462305,1.99933236 16.0146819,1.99933236 L19.2352192,1.99933236 L19.3352359,2.4058626 C16.0653854,2.79628277 13.0171463,4.25870264 10.667123,6.56446703 L10.667123,3.66543991 C10.667123,3.11334043 10.2193331,2.66577538 9.66695618,2.66577538 L5.99967768,2.66577538 C5.44730077,2.66577538 4.99951081,3.11334043 4.99951081,3.66543991 C4.99951081,4.21753938 5.44730077,4.66510443 5.99967768,4.66510443 L8.66678932,4.66510443 L8.66678932,6.97099727 C6.03415825,6.14410558 3.16392332,7.02354907 1.4472532,9.18307196 C-0.269416933,11.3425949 -0.477767594,14.3359257 0.923186293,16.7122328 C2.32414018,19.0885398 5.04488759,20.3567526 7.76671468,19.9021834 C10.4885418,19.4476143 12.6489754,17.3642012 13.2008791,14.6617497 L14.6677905,14.6617497 C15.0215954,14.6609917 15.3486732,14.4734599 15.527934,14.1685819 C15.527934,14.1685819 16.0880274,13.2155683 16.7881443,12.0559575 C16.2477082,14.8169735 17.5001667,17.6198033 19.9180318,19.0602153 C22.3358969,20.5006272 25.3983122,20.2683277 27.5709922,18.4797 C29.7436723,16.6910723 30.5585785,13.7314224 29.6074388,11.0835499 C28.656299,8.43567743 26.1440077,6.6699868 23.3292355,6.67109791 L23.3425711,6.67776234 Z M10.093694,10.1765882 C10.7354511,10.8696949 11.1516364,11.7411537 11.2872265,12.6757495 L8.34006814,12.6757495 C8.86874062,11.8048965 9.45456587,10.9700139 10.093694,10.1765882 L10.093694,10.1765882 Z M6.67312337,18.0072936 C4.78743961,18.0093278 3.085771,16.8770661 2.36009768,15.137479 C1.63442437,13.3978918 2.0273191,11.3927551 3.35592322,10.0552873 C4.68452734,8.71781943 6.68781054,8.31079222 8.43341705,9.02364176 C7.39089167,10.333997 6.49642659,11.7554822 5.76630541,13.2622194 C5.62558327,13.5720733 5.65222231,13.9321945 5.83700639,14.2179941 C6.02179047,14.5037937 6.33933878,14.6760161 6.67979115,14.6750785 L11.1538709,14.6750785 C10.5632913,16.6549586 8.74015935,18.0107743 6.67312337,18.0072936 L6.67312337,18.0072936 Z M14.1010293,12.6757495 L13.3075636,12.6757495 C13.1521143,11.1670876 12.4864734,9.75654377 11.4205821,8.67709139 C13.4209158,6.59778918 16.2480541,4.67843329 19.8219837,4.38519836 L20.0620238,5.35154074 C18.8822252,5.82657306 17.8751603,6.64948741 17.1748754,7.71074902 C16.1280341,9.27022568 14.7077972,11.6494272 14.1010293,12.6757495 Z M23.3425711,18.0072936 C21.2245194,18.0038623 19.3743043,16.5753786 18.8359669,14.5279086 C18.2976295,12.4804386 19.2061449,10.3273355 21.0488551,9.28355454 L22.3824109,14.6150987 C22.4924206,15.0598686 22.8908529,15.3729615 23.3492389,15.3748437 C23.431168,15.384885 23.5140176,15.384885 23.5959467,15.3748437 C23.8532576,15.3103425 24.0743904,15.1463112 24.2106919,14.9188395 C24.3469934,14.6913678 24.3872968,14.4190919 24.3227346,14.1619174 L22.9891788,8.75706456 L23.3692422,8.75706456 C25.9470011,8.75706456 28.0366876,10.8457015 28.0366876,13.4221657 C28.0366876,15.9986299 25.9470011,18.0872668 23.3692422,18.0872668 L23.3425711,18.0072936 Z' id='Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E"
            }
            // eslint-disable-next-line no-undef
             marker.value =  new google.maps.Marker({
                    position: loc.value,
                    icon: bikeIcon,
                })
            markerStorer.value.push(marker.value)
            markerStorer.value[0].setMap(myMap.value)
        }
        //diplay marker on map
        const diplayMarker = () => {
            markerStorer.value[0].setPosition(loc.value)
            
        }
        //Recenter view and amrker on current position
        const recenter = () => {
            diplayMarker()
            myMap.value.setCenter(loc.value);
        }

        //Speed true or false
        const speedCheker = ref(false);

        //Initialize const for Speed Time Pos
        const loc = ref({
            lat: 0,
            lng: 0,
            speed: 0,
            timestamp: 0
        })
        
        //Pos Speed and Time
        const getCurrentPosition = async () => {
        const pos = await Geolocation.getCurrentPosition({enableHighAccuracy: true});
        loc.value = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            speed: pos.coords.speed,
            timestamp: pos.timestamp
        };
        };
        
        //initializes the ride
        const startRide = ()=> {
            if(loc.value.lat > 0) {
               store.dispatch('startRide', loc.value)
            } 
        }

        
        //ends the ride
        const endRide = () => {
            store.dispatch('endRide')
            rideDistance.value = 0;
        }
        // Initialize time data
        const time = ref('00:00:00');
        //Need tempTime to store the 
        const tempTime = ref(0)
        // add 1 to time if user is riding else = 0
        setInterval(() => {
            //checks if user is riding
            if(userRiding.value) {
                tempTime.value = tempTime.value + 1
                time.value = tempTime.value
                time.value = convertHMS(time.value)
            } else {
                time.value = '00:00:00'
                tempTime.value = 0
            }        
        }, 1000)
        //Converts time to HH:MM:SS
        //Code from https://www.codegrepper.com/code-examples/javascript/convert+seconds+to+hours+minutes+seconds+javascript
        const convertHMS = (value) => {
            const sec = parseInt(value, 10); // convert value to number if it's string
            let hours   = Math.floor(sec / 3600); // get hours
            let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
            let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
            // add 0 if value < 10; Example: 2 => 02
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
        }
        //Gets ride data form Vuex
        const rideData = computed(() => store.getters.getRideDataRides)
        const rideDistance = ref('0.000')
        //I do not start @ 0 because of a bug that makes the first coordinate start @ lat:0, lng:0
        const calculateDistance = () => {
            let tempDistance = 0;
            for(let i = 1; i < rideData.value.length -1; i++) {
                if(rideData.value[i].lat == 0) {
                    i++
                    return
                }else {
                let lat1 = rideData.value[i].lat;
                let lon1 = rideData.value[i].lng;
                i++
                let lat2 = rideData.value[i].lat;  
                let lon2 = rideData.value[i].lng;
                i--
                tempDistance = tempDistance + distance(lat1, lat2, lon1, lon2);  
                }  
            }
            rideDistance.value = tempDistance.toFixed(3);
        }
        // JavaScript program to calculate Distance Between
        // Two Points on Earth from https://www.geeksforgeeks.org/program-distance-two-points-earth/#:~:text=For%20this%20divide%20the%20values,is%20the%20radius%20of%20Earth.
        const distance = (lat1, lat2, lon1, lon2) => {
            // The math module contains a function
            // named toRadians which converts from
            // degrees to radians.
            lon1 =  lon1 * Math.PI / 180;
            lon2 = lon2 * Math.PI / 180;
            lat1 = lat1 * Math.PI / 180;
            lat2 = lat2 * Math.PI / 180;
    
            // Haversine formula
            let dlon = lon2 - lon1;
            let dlat = lat2 - lat1;
            let a = Math.pow(Math.sin(dlat / 2), 2)
                    + Math.cos(lat1) * Math.cos(lat2)
                    * Math.pow(Math.sin(dlon / 2),2);
                
            let c = 2 * Math.asin(Math.sqrt(a));
    
            // Radius of earth in kilometers. Use 3956
            // for miles
            let r = 6371;
    
            // calculate the result
            return(c * r);
        }



        return {
            
            mapDivRef, getCurrentPosition, loc, startRide, endRide, userRiding, time, speedCheker, rideDistance, recenter, speed
        }
    },
    components: {
        IonButton
    }
}
</script>

<style>
.map {
    width: 100%;
    height: 50%;
}

</style>
