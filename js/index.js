(function(){
    
    
    document.querySelector('.edit').style.display = "none";
    // first initialazings        
    var add_review_btn = document.querySelector('.add_review_btn');
    var reviews2	= document.querySelector('.reviews');
    var search_input = document.querySelector('#search');
    var edit_page	= document.querySelector('.edit');
    var go_back	= document.querySelector('.img');
    var submit_btn = document.querySelector('.submit');
    
    
    var city;
    var markerArr = [];
    var local_data 	= JSON.parse(localStorage.getItem('locations_data'));
    
    if(local_data){
		//if reviews exist get random city...
        var cities_Array = Object.keys(local_data.locations);
        var len = cities_Array.length;
            
        //return randomize city for each time we load the page.
        cities_Array.getRandom = function(){
            var i = Math.floor(Math.random()*len);
            return this[i];
        }
        
        var city_to_show = cities_Array.getRandom();
        var city_place_id = city_to_show;
		populate_reviews_list(city_place_id);
	}else{
        // Let's take Tel Aviv as our default city to view in the map
		city = {
			lat:32.0879585,
			lng:34.7622266
        }
	}
    
    
    
	function populate_reviews_list(place_id){
		city = local_data.locations[place_id];
		var reviews = city.reviews;
		var html_string = '';
		reviews.forEach((review)=>{
            // build the HTML page for showing the list
            html_string += `<li onclick='buildReviewPage("${review.id}","${city.place_id}","${review.img_url}","${review.title}","${review.description}");' class="review_item" data-id="${review.id}" >
                                <img class="review_thumb" src="${review.img_url}">
                                <div class="texts_box">
                                    <h4 class="review_title">${review.title}</h4>
                                    <p class="review_description">${review.description}</p>
                                </div>
				            </li>`
            })
        // inject my HTML list to the page
        reviews2.innerHTML = html_string;
    }
    
   
    
    // set google map api for our map view and search
    window.initMap = function() {
        var mapDiv = document.getElementById('map');
        var map = new google.maps.Map(mapDiv, {
          center: {lat: city.lat, lng: city.lng},
          zoom: 11
        });
        
        var options = {types: ['(cities)']};
        var autocomplete = new google.maps.places.Autocomplete(search_input,options);
        
        autocomplete.addListener('place_changed', function() {
            
            if (markerArr.length > 0) {
                markerArr[0].setMap(null);
            }
            
            var place = autocomplete.getPlace();
            var myLatLng = {
                lat:place.geometry.location.lat(),
                lng:place.geometry.location.lng()
            };
            map.setCenter(myLatLng);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: place.formatted_address
              });
            
            markerArr.unshift(marker);
            populate_reviews_list(place.place_id)
            
        })
    }
    

 
    add_review_btn.addEventListener('click',()=>{
        window.location.href = '../add.html' // Add a new review
    });
    
    
})()
