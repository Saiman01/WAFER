//variable required for google map API
var map, infoWindow, position; 
//autocomplete functionality 
let autocomplete; 

//get location from the user and use autocomplete functionality
function initialize(){
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('location'), {
        types: ['geocode'],
        componentRestrictions: {'country': ['US']}, 
        fields: ['geometry', 'name', 'place_id'],
    }); 
    autocomplete.addListener('place_changed', function (){
        var place = autocomplete.getPlace(); 
        if(!place.geometry){
            document.getElementById('location').placeholder = "Enter a location"; 
        }
        else {
            position = place.geometry.location; 
            map.setCenter(position);   
            infoWindow.setPosition(position); 
            infoWindow.setContent("The location you entered!"); 
            infoWindow.open(map); 
        }
    }); 
}

//render the map using google map API
function createMap() {
    var options = {
        center: {lat:37.234332396, lng: -115.80666344}, 
        zoom: 13, 
        mapTypeId: 'terrain',
        gestureHandling: 'none',
        zoomControl: true
    };
    map = new google.maps.Map(document.getElementById('map'), options); 
    initialize(); 

    infoWindow = new google.maps.InfoWindow (); 

    //if user loction is accessible
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(p){
            position ={
                lat: p.coords.latitude,
                lng: p.coords.longitude
            };
        
        infoWindow.setPosition(position); 
        infoWindow.setContent("Your Location!")
        infoWindow.open(map); 
        map.setCenter(position); 

        }, function(){
            handleError("Oops! Something went wrong! Please try again", map.Center()); 
        })
    }
    else {
        handleError("Cannot access your location. Check if you have given location permission or enter a location you want", map.Center()); 
    }
    //if user location is not accesible
    function handleError(content,position){
        infoWindow.setPosition(position); 
        infoWindow.setContent(content); 
        infoWindow.open(map); 
    }
}

//<script type='text/javascript' src='js/helpers.js'></script>     

