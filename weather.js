// This is our API key. Add your own API key between the ""
   $.ajax({
    url: 'test.php',
    success: function(data) {
      console.log(data);
      APIKey=data;
    }
  });

  //city="Los Angeles,US";
   var city="";
   //="Ankara,Turkey";

   
   
  //$(document).ready(function(){
      
     var currentCity=$("#current-city");
     var currentTemperature=$("#temperature");
     var currentHumidity=$("#humidity");
     var currentWSpeed=$("#wind-speed");
     var searchCity=$("#search-city");
     var searchButton=$("#search-button");
     var uvIndex=$("#uv-index");
     var icon=$("#icon");
     var deleteButton=$("#delete");
     var positionButton=$("#position");
     var result=$("#embedMap");
    

     var sCity=[];
     //searches the city to see if it exists in the entries from the storage which means if it is searched before.
     function find(c){
       for(var i=0;i<sCity.length;i++){
         if(c.toUpperCase()===sCity[i]){
           return -1;
         }
       }
       return 1;
     }
     //displays the current weather and 5 day forecast for the city entered by the user
     function displayCityWeather(event){
         event.preventDefault();
        if (searchCity.val().trim()!==""){
            city=searchCity.val().trim();
            currentWeather(city);
              
          }    
     }
     
     
    // We then created an AJAX call
    function currentWeather(city){
         // Here we are building the URL we need to query the database
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+ APIKey;
       
        // Ajax Call to get the current data

        $.ajax({
         url: queryURL,
         method: "GET",
         error: function (xhr, ajaxOptions, thrownError) {
           //var err=$("<span>"+xhr.status+"-"+thrownError+"</span>");
           if (xhr.status===404){
               $("#msg").empty();
               $("#msg").append(searchCity.val()+" was not found!!!");
               $(".modal").modal('show');
           }    
          //alert(xhr.status+"-"+thrownError);
         }
        }).then(function(response) {
            // Displays the City, (date) and weather icon
           // console.log(response);
            var iconcode = response.weather[0].icon;
            var iconurl = "https://openweathermap.org/img/wn/"+iconcode+"@2x.png";
            var date=new Date(response.dt*1000).toLocaleDateString();
            $(currentCity).html(response.name+" ("+date+")"+"<img src="+iconurl+">");

           //  console.log(response);
           //Displays Temperature. Temperature is in Kelvin, needs to be converted to Fahreniet.

            var tempK=response.main.temp;
            var tempF=(((tempK-273.5)*1.80)+32).toFixed(2) ; 
            $(currentTemperature).html(tempF+" &#8457");

            //Displays Humidity
            var humidity=response.main.humidity;
            $(currentHumidity).html(humidity+"%");

            //Displays wind speed- We have to convert meters per second to miles per hour
           var ws=response.wind.speed;
           var wsmp=(ws*2.237).toFixed(1);
           $(currentWSpeed).html(wsmp+" MPH");

           //UVIndex displays the current uv index and is passed the coordinates of the city as parameters
           //UVIndex(response.coord.lon,response.coord.lat);
           
           UVIndex(response.coord.lon,response.coord.lat);
           forecast(response.id);
           /////////////////////////////////////////////////
           if(response.cod==200){
              sCity=JSON.parse(localStorage.getItem("cname"));
             // console.log(sCity);
              if (sCity==null){
                  sCity=[];
                  sCity.push(city.toUpperCase());
                  localStorage.setItem("cname",JSON.stringify(sCity)); 
                  addToList(city);
                
               }
               else{
                  if(find(city)>0){
                    sCity.push(city.toUpperCase());
                    localStorage.setItem("cname",JSON.stringify(sCity)); 
                    addToList(city);
                  }  
               }
            }
          
            
          });
    }

    //Returns the UVIndex value of the city. City's coordinates are passed as parameters.
    function UVIndex(ln,lt){
      var qURL="https://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lt+"&lon="+ln;
      $.ajax({
        url:qURL,
        method: "GET"
      }).then(function(response) {
        $(uvIndex).html(response.value);
      });    

      }

    //This function displays the 5 day forecast.
    function forecast(cid){
        var dayover=false;

        var qURL="https://api.openweathermap.org/data/2.5/forecast?id="+cid+"&appid="+APIKey;
    
        $.ajax({
            url:qURL,
            method: "GET"
        }).then(function(response) {
        
              for (i=0;i<5;i++){
  
                var date=new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
                var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
                var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
                var tempK=response.list[((i+1)*8)-1].main.temp;
                var tempF=(((tempK-273.5)*1.80)+32).toFixed(2) ; //convert to Fahreniet
                var humidity=response.list[((i+1)*8)-1].main.humidity;
               

                $("#fDate"+i).html(date);
                $("#fImg"+i).html("<img src="+iconurl+">");
                $("#fTemp"+i).html(tempF+" &#8457");
                $("#fHumidity"+i).html(humidity+"%");
              }
             // console.log(response);
                       
          });  
          
          
     }
     //Dynamically adds the passed city on the page where previous searches are shown. It also sets the data-value attribute 
     //to the city's name.
     function addToList(c){
      var lEl= $("<li>"+c.toUpperCase()+"</li>");
      $(lEl).attr("class","list-group-item");
      $(lEl).attr("data-value",c.toUpperCase());
      $("ul").append(lEl); 
     }

     function invokePastSearch(event){
       var elEL=event.target;
       if (event.target.matches("li")){
          city=elEL.textContent.trim();
          currentWeather(city);
       }
     }

    
    //search history is loaded from the local storage  and each city is added to the list on the page and the weather information about the
    //last entry which is the last city searched is shown on the page
    function loadCities(){
      $("ul").empty();
      var sCity=JSON.parse(localStorage.getItem("cname"));
      //console.log(sCity);
      if (sCity!==null){
       sCity=JSON.parse(localStorage.getItem("cname"));
       for(var i=0;i<sCity.length;i++){
         addToList(sCity[i]);
       }
       city=sCity[i-1];
       currentWeather(city);
      }
    } 
    //Deletes the search history from page and the local storage.
    function deleteHistory(event){
      event.preventDefault();
      sCity=[];
      localStorage.removeItem("cname");
      document.location.reload();
    }

    $(searchButton).on("click",displayCityWeather);
    $(document).on("click",invokePastSearch);
    $(window).on("load",loadCities);
    $(deleteButton).on("click",deleteHistory);
    $(positionButton).on("click",showPosition);
  
 // });  
 /*************************BONUS************************************************* */

  function showPosition() {
    //If navigator.geolocation exists, then the geolocation services are available.
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMap, showError);
    } else {
        alert("Browser does not support HTML5 geolocation.");
    }
  }  
 
// Define callback function for successful attempt
function showMap(position) {
    // Get location data
    lat = position.coords.latitude;
    long = position.coords.longitude;
    var latlong = new google.maps.LatLng(lat, long);
    //map options, centered according to coordinates.
    var myOptions = {
        center: latlong,
        zoom:16,
        mapTypeControl: true,
        navigationControlOptions: {
            style:google.maps.NavigationControlStyle.SMALL
        }
    }
    
    var map = new google.maps.Map(document.getElementById("embedMap"), myOptions);
    var marker = new google.maps.Marker({ position:latlong, map:map, title:"You are here!" });
}
 
// Define callback function for failed attempt
function showError(error) {
    if(error.code == 1) {
        result.innerHTML = "You did not want to share your position!!";
    } else if(error.code == 2) {
        result.innerHTML = "The network is down or the positioning service can't be reached!!";
    } else if(error.code == 3) {
        result.innerHTML = "The attempt timed out before it could get the location data!!";
    } else {
        result.innerHTML = "Geolocation failed due to unknown error!!";
    }
}
/************************************************************************************* */
  

  
  
  
