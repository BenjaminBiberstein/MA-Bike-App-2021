<template>
    <BaseLayout :page-title="`${loadedRide.name} ${loadedRide.date}`" default-back-link="/ridingSelector">
    <OldMap></OldMap>
        <ion-grid>
            <ion-row>
                <ion-col>
                    <h2>Avarage km/h: {{avaragespeed}}</h2> 

                </ion-col>
                <ion-col>
                    <h2>Max km/h: {{maxSpeed}}</h2> 
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <h2>Calories burned: {{calories}}</h2> 

                </ion-col>
                <ion-col>
                    <h2>Time: {{yourneyTime}}</h2> 
                </ion-col>
            </ion-row>
            <ion-row>
                <ion-col>
                    <h2>BMR: {{BMR}}</h2> 

                </ion-col>
                <ion-col>
                    <h2>Distance in km: {{totalDistance}}</h2> 
                </ion-col>
            </ion-row>
        </ion-grid>
    </BaseLayout>
</template>

<script>
//import RideListItem from '../Components/RideListItem.vue'
import BaseLayout from '../Components/base/BaseLayout.vue'


import OldMap from '../Components/OldMap.vue'
import { IonCol, IonGrid, IonRow,   } from '@ionic/vue';


export default {
    name: 'RidingSelectorRides',
    props: ['pageTitle'],
    data() {
        return {
            rideId: this.$route.params.id,
            avaragespeed: 0,
            BMR: 0,
            yourneyTime: 0,
            maxSpeed: 0,
            MET: 0,
            calories: 0,
            timeInSeconds: 0,
            totalDistance: 0,
            METvalues: [
                {
                    speed: 8.9,
                    Mets: 3.5
                },
                {
                    speed: 15.1,
                    Mets: 5.8
                },
                {
                    speed: 19.2,
                    Mets: 6.8
                },
                {
                    speed: 22.4,
                    Mets: 8
                },
                {
                    speed: 25.6,
                    Mets: 10
                },
                {
                    speed: 30.6,
                    Mets: 12
                },
                {
                    speed: 32.2,
                    Mets: 15.8
                },

            ],
        }
    },
    computed: {
        loadedRide() {
            return this.$store.getters.ride(this.rideId);
        },
        getRideDataRides() {
            //gets rideDataRides data
            return this.$store.getters.getRideDataRides;            
        },
        getUser() {
            return this.$store.getters.getUser
        }
    },
    components: {
        BaseLayout,
        OldMap,
        IonCol, 
        IonGrid, 
        IonRow,
         
    },

    async mounted() {
        //loades ride data on mounted
        await this.$store.dispatch('getRideDataRides', this.rideId);
        await this.$store.dispatch('getUserData');
        this.calculateAvarageSpeed();
        this.calculateBMR();
        this.calculateTime();
        this.calculateMaxSpeed();
        this.calculateMET();
        this.calculateCaloriesBurend();
        this.calculateTraveledDistance();
    },
    methods: {
        calculateAvarageSpeed() {
        let sum = []
        this.getRideDataRides.forEach(element => {
            let data = element.speed
            sum.push(data)
        });
        this.avaragespeed = (sum.reduce((a,b) => a + b, 0) / sum.length*3.6).toFixed(1) ;
        },
        calculateBMR() {
            if(this.getUser.gender == 0) {
                //BMR for Men
                this.BMR = (5 + (9.99 * this.getUser.weight) + (6.25 * this.getUser.height) - (4.92 * this.getUser.age)).toFixed();
            } else {
                //BMR for Woman
                this.BMR = ((9.99 * this.getUser.weight) + (6.25 * this.getUser.height) - (4.92 * this.getUser.age) -161).toFixed();
            }
        },
        //I do not end -1 because of a bug that makes the last timestamp wrong
        calculateTime() {
            this.timeInSeconds = (this.getRideDataRides[0].timestamp - this.getRideDataRides[this.getRideDataRides.length - 1].timestamp) / 1000;
            this.yourneyTime = this.convertHMS(this.timeInSeconds)
        },
        //Code from https://www.codegrepper.com/code-examples/javascript/convert+seconds+to+hours+minutes+seconds+javascript
        convertHMS(value) {
            const sec = parseInt(value, 10); // convert value to number if it's string
            let hours   = Math.floor(sec / 3600); // get hours
            let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
            let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
            // add 0 if value < 10; Example: 2 => 02
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds; // Return is HH : MM : SS
        },
        calculateMaxSpeed() {
            let tempSpeed = 0;
            this.getRideDataRides.forEach(element => {
                if(element.speed > tempSpeed) {
                    tempSpeed = element.speed
                }
            })
            this.maxSpeed = (tempSpeed * 3.6).toFixed(1)
        },
        calculateMET() {
            let tempMet = 0;
            for(let i = 0; i < this.METvalues.length; i++) {
                if(this.METvalues[i].speed <=  this.avaragespeed) {
                    tempMet = this.METvalues[i].Mets;

                }
            }
            if(tempMet == 0) {
                this.MET = 3.5
            } else{
                this.MET = tempMet;
            }   
        },
        calculateCaloriesBurend() {
            this.calories = ((this.MET * this.getUser.weight * 3.5 / 200) * (this.timeInSeconds / 60)).toFixed()
        },
        //I do not end -1 because of a bug that makes the last coordinate starts @ lat:0, lng:0
        calculateTraveledDistance() {
            let tempDistance = 0;
            for(let i = 0; i < this.getRideDataRides.length -1; i++) {
                    console.log(this.getRideDataRides[i])
                    let lat1 = this.getRideDataRides[i].lat;
                    let lon1 = this.getRideDataRides[i].lng;
                    i++
                    let lat2 = this.getRideDataRides[i].lat;  
                    let lon2 = this.getRideDataRides[i].lng;
                    i--
                    let calculatedDistance = this.distance(lat1, lat2, lon1, lon2);
                    
                    tempDistance = tempDistance + calculatedDistance
            }
            this.totalDistance = tempDistance.toFixed(3);
        },
        
        // JavaScript program to calculate Distance Between
        // Two Points on Earth from https://www.geeksforgeeks.org/program-distance-two-points-earth/#:~:text=For%20this%20divide%20the%20values,is%20the%20radius%20of%20Earth.
        distance(lat1, lat2, lon1, lon2) {

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
            console.log(lat1)
            // calculate the result
            return(c * r);
            
            
        }
    }
}
</script>