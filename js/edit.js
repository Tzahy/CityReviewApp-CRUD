// buildReviewPage function is getting all the necessary parameters in order to update and delete later on.
// I don't implement here validation for the form (do it in the add new review page)
// I don't call the function on the load of the program because i don't have all the data yet.

var buildReviewPage = function(rev_id,id,img,title,description){
    
    var reviews_list = document.querySelector('.reviews_list');
    var titleField = document.querySelector('.titleField');
    var cityField = document.querySelector('.cityField');
    var imgField = document.querySelector('.imgField');
    var descriptionField = document.querySelector('.descriptionField');
    var update_btn = document.querySelector('.update');
    var local_data 	= JSON.parse(localStorage.getItem('locations_data'));
    var edit_page	= document.querySelector('.edit');
    var city;
            
    document.querySelector('.container').style.display = "none";
    document.querySelector('.edit').style.display = "";
    
    var place = local_data.locations[id].formatted_address; // Getting city formatted name from the API
    
    // building the HTML page with the inputs to modify from what i choose from the list.
    var html_string2=`<h1 class="main_title">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SHow Review&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></h1>
                        <div class="review-form2">
                        <div class="form-item-box">
                            <span class="form-label">Review Title</span>
                            <input class="form-input text-input titleField" 
                            onFocus="this.className='form-input text-input titleField'"
                            type="text" placeholder="${title}"/>
                        </div> 
                        <div class="form-item-box">
				            <span class="form-label">City</span>
				            <input class="form-input text-input cityField" 
				            onFocus="this.className='form-input text-input cityField'"
				            type="text" placeholder="${place}"/>
			             </div>  
                        <div class="form-item-box">
                            <span class="form-label">Image URL</span>
                            <input class="form-input text-input imgField" 
                            onFocus="this.className='form-input text-input imgField'"
                            type="text" placeholder="${img}"/>
                        </div>
                        <div class="description-box">
                            <span class="form-label">Description</span>

                            <textarea class="form-input text-input descriptionField"
                            onFocus="this.className='form-input text-input descriptionField'"
                            placeholder="${description}" rows="4" cols="50"></textarea>

                        </div>
                        <div class='a'>
                            <button class="update">Update</button>
                            <button class="delete">Delete</button>
                        </div>
                        
		                </div>`
        
    edit_page.innerHTML = html_string2; //Showing the HTML page by inject it to a dev (not open a new page)
         
    // start configuring the delete part             
    var del = document.querySelector('.delete');
            
    //delete a review from localStorage            
    del.addEventListener('click',function(event){ 
        var local_data 	= JSON.parse(localStorage.getItem('locations_data'));
        var len = local_data.locations[id].reviews.length;
        // remove the item i choose from the localStorage array
        if (len == '1'){
           rev_id = '0';
           rev_id = local_data.locations[id].reviews.splice(rev_id, 1);
        }else{
           local_data.locations[id].reviews.splice(rev_id - 1, 1);     
        }
                
        localStorage.setItem('locations_data',JSON.stringify(local_data)); // modify the localStorage
        window.location.href = '../index.html' // Go back to the main window with my modifications
    })
            
    
    // start configuring the update process
    var update_btn = document.querySelector('.update');
          
    update_btn.addEventListener('click',function(){
            
        var titleField= document.querySelector('.titleField').value;
        var cityField = document.querySelector('.cityField').value;
        var imgField = document.querySelector('.imgField').value;
        var descriptionField = document.querySelector('.descriptionField').value;
        var local_data 	= JSON.parse(localStorage.getItem('locations_data'));
              
        // checking if a field was modified - if not take what we had in the placeholder
        if (!titleField){
            var titleField = document.querySelector('.titleField').placeholder;
        }
        if (!cityField){
            var cityField = document.querySelector('.cityField').placeholder;
        }
        if (!imgField){
            var imgField = document.querySelector('.imgField').placeholder;
        }
        if (!descriptionField){
            var descriptionField = document.querySelector('.descriptionField').placeholder;
        }
              
       
    // build the new modified object
    var review = {
        id: local_data.locations[id].reviews.length,
        title: titleField,
        img_url: imgField,
        description: descriptionField
    }
              
       
                     
     var local_data = JSON.parse(localStorage.getItem('locations_data'));
    
     // modify the localStorage with the new data we updated
     local_data.locations[id].reviews.splice(rev_id, 1);
     local_data.locations[id].reviews.push(review);
	 localStorage.setItem('locations_data',JSON.stringify(local_data));
     window.location.href = '../index.html';
     
    })
}
    

