'use strict';

const form = document.querySelector('.form');
const containerLocation = document.querySelector('.location');
const inputType = document.querySelector('.form__input--type');
const inputTitle = document.querySelector('.form__input--title');
const inputNote = document.querySelector('.form__input--note');
// App Architecture
class Location{
    date = new Date();
    id= (Date.now() + '').slice(-10);
        constructor(type , coords , title , note){
            this.type = type;
            this.coords = coords;
            this.title = title;
            this.note = note;
        }
}

class App {
    #map;
    #mapEvent;
    #locations =[];

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

        const type = inputType.value;
        const title = inputTitle.value;
        const note = inputNote.value;
        const {lat , lng} = this.#mapEvent.latlng;
        let location;
        //  Storeing the user inputed Value
          location = new Location(type , [lat , lng] , title , note);
      
        //    Added loaction to the arry
        this.#locations.push(location);
        console.log(location);
        // Render the Location on the Map
               this._renderLocationMarker(location);
        // Rendering the Location on the List
        this._renderLocation(location)   ;
                // Clearing the responces
            inputType.value = inputTitle.value = inputNote.value ='';
        } 
        _renderLocationMarker(loc){
            L.marker(loc.coords).addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth:250,
                    minWidth:100,
                    autoClose:false,
                    closeOnClick:false,
                    className:`${loc.type}-popup`,
                })
            )
            .setPopupContent(loc.title)
            .openPopup();
        }
        _renderLocation(loc){
          // Date 
         let today = loc.date;
         let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
         let html = `
               <li class="location location--Food" data-id="${loc.id}">
               <div class="location__heading">
               <div class="location__type">${loc.type}</div>
               <div class="location__date">📅 ${date}</div>
             </div>
               </li> 
         ` ;
         form.insertAdjacentHTML('afterend' , html);
        
         console.log(date);
        }
        


}
const app = new App ();

// <div class="location__head">
{/* <span class="location__heading">
               
🍔 👀 🛒
</span>
<span class="location__value">${loc.type}</span>
<span class="location__heading">
<span class="location__icon"></span>
<span class="location__value">${date}</span>
</span>
</div>
<div class="location__title">
<span class="location__icon">➤</span>
<span class="location__value">${loc.title}</span>
</div>
<div class="location__note">
<span class="location__icon">📝</span>
<span class="location__value">${loc.note}</span>
</div>    */}