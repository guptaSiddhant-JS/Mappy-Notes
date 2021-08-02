'use strict';

const form = document.querySelector('.form');
const containerLocation = document.querySelector('.location');
const inputType = document.querySelector('.form__input--type');
const inputTitle = document.querySelector('.form__input--title');
const inputNote = document.querySelector('.form__input--note');

// App Architecture
class App {
    #map;
    #mapEvent;
    constructor(){
       this._getPosition();

       form.addEventListener('submit' , this._newLocation.bind(this));
    }
    _getPosition(){
        // Geoloction 
        if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition( this._loadMap.bind(this) , 
            () => alert('Could not get your position')
            )
    }
    _loadMap(pos){
            const {latitude} = pos.coords;
            const {longitude} = pos.coords;
            // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
            const coords = [latitude , longitude];
             this.#map = L.map('map').setView(coords, 13);
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               }).addTo(this.#map);
    
            
            this.#map.on('click' ,this._showForm.bind(this));
      
    }
    _showForm(mapEl){
        this.#mapEvent = mapEl;
               form.classList.remove('hidden');
               inputTitle.focus();
    }
    _newLocation(el){
        el.preventDefault();
        // Clearing the responces
        inputType.value = inputTitle.value = inputNote.value ='';
                const {lat , lng} = this.#mapEvent.latlng;
                L.marker([lat , lng]).addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth:250,
                    minWidth:100,
                    autoClose:false,
                    closeOnClick:false,
                })
            )
            .setPopupContent('Title')
            .openPopup();}


}
const app = new App ();

