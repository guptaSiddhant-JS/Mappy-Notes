'use strict';

// Geoloction 
if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(
    pos =>{
        const {latitude} = pos.coords;
        const {longitude} = pos.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    },
    () => console.log('Could not get your position')
)