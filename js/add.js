(function(){

var reviews_list = document.querySelector('.reviews_list');
var titleField = document.querySelector('.titleField');
var cityField = document.querySelector('.cityField');
var imgField = document.querySelector('.imgField');
var descriptionField = document.querySelector('.descriptionField');
var submit_btn = document.querySelector('.submit');
var city;

var local_data 	= JSON.parse(localStorage.getItem('locations_data'));
    
if(!local_data){
    local_data = {locations:{}}
}

window.initAutoComplete = function(){
    var options = {types: ['(cities)']};
    var autocomplete = new google.maps.places.Autocomplete(cityField, options);

autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    city = {
            place_id : place.place_id,
            formatted_address : place.formatted_address,
            lat : place.geometry.location.lat(),
            lng : place.geometry.location.lng()
            }
    })
}
    
submit_btn.addEventListener('click',function(){
		if(!chkFormStatus()) return;
		if(!local_data.locations[city.place_id]){
			local_data.locations[city.place_id] = city;
			local_data.locations[city.place_id].reviews = [];
		}
		var review = {
			id: local_data.locations[city.place_id].reviews.length,
			title: titleField.value,
			img_url: imgField.value,
			description: descriptionField.value
		}
		local_data.locations[city.place_id].reviews.push(review);
		
		localStorage.setItem('locations_data',JSON.stringify(local_data));
		
		window.location.href = '../index.html';
	})
    
    function chkFormStatus(){
		var formOK = true;
		if(!titleField.value){
			formOK = false;
            titleField.className += " color";
            titleField.value += 'Please enter a title...';
            setTimeout(function(){ titleField.value = ''; }, 2000);
            return;
        }
		if(!cityField.value){
			formOK = false;
            cityField.className += " color";
            cityField.value += 'Please enter a city name...';
            setTimeout(function(){ cityField.value = ''; }, 2000);
            return;
		}
		if(!imgField.value){
			formOK = false;
			imgField.className += " color";
            imgField.value += 'Please enter a URL...';
            setTimeout(function(){ imgField.value = ''; }, 2000);
            return;
		}else if(!chkValidURL(imgField.value)){
			formOK = false;
            imgField.className += " color";
            imgField.value = '';
            imgField.value += 'Please enter a valid URL address...';
            setTimeout(function(){ imgField.value = ''; }, 2000);
            return;
		}
		if(!descriptionField.value){
			formOK = false;
            descriptionField.className += " color";
            descriptionField.value += 'Please enter a description...';
            setTimeout(function(){ descriptionField.value = ''; }, 2000);
            return;
		}
        
        //Did i use the cities from the list?
        if(!city){
            cityField.className += " color";
            cityField.value = '';
            cityField.value += 'Please use the suggested city list... ';
            setTimeout(function(){ cityField.value = ''; }, 2000);
            return;
        }
        
		return formOK;
	}
    
function chkValidURL(url) {
     return /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}
    
    
})()