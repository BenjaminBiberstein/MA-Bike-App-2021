In this repository one can find my source code and APK for my Bike App produced inside of the Matruaarabeit 2021.

To use the APK one can download it to ones Android device and install it. There will be some alerts that warn you of harmful apps. This is because my app is not liscenced. On opening the app one has to have location settings turned on. As well as acept the promt, that the map may use the location.


To look at the source code one has to download all of the files in master branch. Because this is a public repository I have removed my google maps API key. One hast to add ones one key in the files src/components/OldMap.vue and src/components/GoogleMaps.vue.

I also removed my Firebase Firestore configaration. One has to setup a Firebse firestore data base with three collections called: users, rides and rideData. One also has to setup the Firebase Authentication. To add the Firebase Firestore one has to go to src/inclueds/firestore.js and add the configuration.

Then if one wants to run the app in the browser one has to run "yarn" in the comand line inside of the Bike-App_Code directory to download all of the node modules. And then run the coman "ionic serve" to create a local server with the app. If one wants to open it up in Android Studio one can run the comand "ionic cap open android". After every is loaded one can run the app and test it on the emulator.
To look at the source code one has to download all of the files in master branch. Because this is a public repository I have removed my google maps API key. One hast to add ones one key in the files src/components/OldMap.vue and src/components/GoogleMaps.vue. 

I also removed my Firebase Firestore configaration. One has to setup a Firebse firestore data base with three collections called: users, rides and rideData. One also has to setup the Firebase Authentication. To add the Firebase Firestore one has to go to src/inclueds/firestore.js and add the configuration.

Then if one wants to run the app in the browser one has to run "yarn" in the comand line inside of the Bike-App_Code directory to download all of the node modules. And then run the coman "ionic serve" to create a local server with the app. 
If one wants to open it up in Android Studio one can run the comand "ionic cap open android". After every is loaded one can run the app and test it on the emulator. 


Yarn: https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable

Android Studio: https://developer.android.com/studio?gclsrc=ds&gclsrc=ds&gclid=CISgn7zSz_MCFUcTGwod72cHLw

Google Maps API key: https://developers.google.com/maps/documentation/javascript/get-api-key

Firebase Firestore: https://firebase.google.com/docs/firestore

Firebase Authentication: https://firebase.google.com/docs/auth
