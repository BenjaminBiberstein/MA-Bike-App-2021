<script>
import { ref } from '@vue/composition-api'

export default ({
    setup() {
        const DirectionsService = ref({
            origin: LatLng | String | google.maps.Place,
            destination: LatLng | String | google.maps.Place,
            travelMode: BICYCLING,
            unitSystem: UnitSystem.METRIC,
        })
    },
})
</script>
