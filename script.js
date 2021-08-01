'use strict';

const form = document.querySelector('.form');
const containerLocation = document.querySelector('.location');
const inputType = document.querySelector('.form__input--type');
const inputTitle = document.querySelector('.form__input--title');
const inputNote = document.querySelector('.form__input--note');
let map , mapEvent;
// Geoloction 
if(navigator.geolocation)
navigator.geolocation.getCurrentPosition(
    pos =>{
        const {latitude} = pos.coords;
        const {longitude} = pos.coords;
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
        const coords = [latitude , longitude];
         map = L.map('map').setView(coords, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
           }).addTo(map);

        
        map.on('click' , (mapEl) =>{
           mapEvent = mapEl;
           form.classList.remove('hidden');
           inputTitle.focus();
     
        })
    },
    () => alert('Could not get your position')
)
form.addEventListener('submit' , (el) =>{
    el.preventDefault();
    // Clearing the responces
    inputType.value = inputTitle.value = inputNote.value ='';
           console.log(mapEvent);
            const {lat , lng} = mapEvent.latlng;
            L.marker([lat , lng]).addTo(map)
        .bindPopup(
            L.popup({
                maxWidth:250,
                minWidth:100,
                autoClose:false,
                closeOnClick:false,
            })
        )
        .setPopupContent('Title')
        .openPopup();

})