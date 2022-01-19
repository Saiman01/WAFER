


//Getting the data from google API


const https = require('https');


https.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.214840,-97.133064&radius=1500&type=restaurant&key=AIzaSyBDn0aMrVf2TyndUxmcC0aC8czGEY1d0R8', (resp) => {
  let data = '';
    resp.on("data", (chunk) =>{
      data += chunk; 
    });
    resp.on('end', ()=> {
        
    let l =  JSON.parse(data).results.length;
    console.log(l);//finding the lenght of number of restaurant in the area
        
    var hotel_names = [];
    for (let i = 0; i < 20; i++) {
      let m = JSON.parse(data).results[i].name;
            
      // console.log(m);  
      hotel_names[i]=m;
      console.log(hotel_names[i]);
             
      $form = $("<form></form>");
      $("#items").append("<li>"+  hotel_names[i]+ "</li>");
         
    }
    
    $(document).ready(function(){
      //event handler when the list of item is clicked
      $('li').click(function(){

        //after clicking any restaurant, the following events are executed
        $("#items").fadeOut("slow");
        $("#p").fadeIn("slow");
        $("#p").text($(this).text());

        $("#name").slideToggle("slow");  
        
      });
    });

    //Events handlers when the back button is entered
    $("#back").click(function(){
      $("#items").fadeIn("slow");
      $("#name").fadeOut("slow");
      $("#p").fadeOut("slow");//to show previous page
            
    });

    //Error message
  });

}).on("error", (err)=> {
  console.log("Error:" + err.message);
});
