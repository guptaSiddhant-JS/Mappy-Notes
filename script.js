'use strict';

// Geoloction 
if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(
    pos =>{
        const {latitude} = pos.coords;
        const {longitude} = pos.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        const coords = [latitude , longitude];
        const map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           }).addTo(map);

        L.marker(coords).addTo(map)
        .bindPopup('Siddhant Home.')
        .openPopup();
    },
    () => console.log('Could not get your position')
)