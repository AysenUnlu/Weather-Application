## SERVER SIDE ACTIVITIES-ACTIVITY 1: Customer Object  ##

*  This activity is to create `console.log` statements that parse out the information from "customer" object.

 ```javascript
 	  // Step 1: Log the First Name below using console.log
               console.log(customer.firstName);
    // Step 2: Log the Last Name below using console.log
               console.log(customer.lastName);
    // Step 3: Log the State of the Address below using console.log
               console.log(customer.address.state);
    // Step 4: Log the Home Phone Number below using console.log
               console.log(customer.phoneNumber[0].number);
    // Step 5: Log the Fax Number below using console.log
               console.log(customer.phoneNumber[1].number);
 ```              
---
## Activity 3: AJAX to HTML ##

* In this activity, using the starter code in "Unsolved/ajax-to-html.html", we created and appended a new table row to the existing table body. The new row displayed the retrieved movie's `Title`, `Year`, and `Actors`.

* Once we successfully created and populated a new table row, we repeated this process to query the OMDB API for two more movies of our choice! Appended two more rows containing the results from both AJAX requests.

* As a bonus, we refactored our solution to be more DRY by placing repetitive logic inside of functions to be called when needed. 

```javascript

 	// BONUS: tried to make my code as DRY as possible through the use of functions

baseQueryUrl="https://www.omdbapi.com";
apikey="trilogy";

//url constructs the query url with the baseUrl, title of the movie and the apikey

function url(movie){
  return baseQueryUrl+"/?t="+movie+"&apikey="+apikey;
}

// function takes the queryURL and movie title, then shows on the page the corresponding movie's title,Year and actors in a table row

function show(queryURL,movie){
    //ajax ca;;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
          console.log(response);
      // Create and save a reference to new empty table row
          var row=$("<tr>");
      // Create and save references to 3 td elements containing the Title, Year, and Actors from the AJAX response object
          var title=response.Title;
          var year=response.Year;
          var Actors=response.Actors
          
      // Append the td elements to the new table row
          row.append($("<td>"+title+"</td>"));
          row.append($("<td>"+year+"</td>"));
          row.append($("<td>"+Actors+"</td>"));
      // Append the table row to the tbody element
         $("tbody").append(row);
    });
}  

     // The below code fills in the first row of the table

    var movie = "Mr. Nobody";
    var queryURL = url(movie);
    show(queryURL,movie);

    // Repeat the above logic to add rows for two more movies of your choice

    var movie = "Patch Adams";
    var queryURL =url(movie);
    show(queryURL,movie);

    var movie = "The Silence of the Lambs";
    var queryURL = url(movie);
    show(queryURL,movie);

 		   
```
---
## Activity 5: Complete Bujumbura ##

 * In this activity Using either `bujumbura-easier.html` as a starting point, i added in the missing code necessary to accomplish the following:

  * Query the OpenWeatherMap API,"http://openweathermap.org/api" for the current weather data on Bujumbura, Burundi.

  * Log the retrieved data from this query to console.

  * Parse the retrieved data to display wind speed, humidity, and temperature information into the HTML.
  * **BONUS:** Figure out how to convert the Kelvin temperature provided into Fahrenheit.

```javascript

  // This is our API key. Add your own API key between the ""
    var APIKey ="e355f99686f035518df586c2253dfad9";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&APPID="+ APIKey;

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Create CODE HERE to Log the queryURL
       console.log(queryURL);
      // Create CODE HERE to log the resulting object
       console.log(response);
      // Create CODE HERE to transfer content to HTML
       $(".city").html("<h1>"+response.name+" weather details</h1>");
       $(".wind").text("Wind Speed:"+response.wind.speed);
       $(".humidity").text("Humidity:"+response.main.humidity);
      // $(".temp").html((parseInt(response.main.temp)-273.5)*1.80+32);
      // Create CODE HERE to calculate the temperature (converted from Kelvin)
         var kelvin=response.main.temp;
         var fahreniet=(((kelvin-273.5)*1.80)+32).toFixed(2); 
      // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      // Create CODE HERE to dump the temperature content into HTML
        $(".temp").html("Temperature(F):"+fahreniet);
        
 ```
---

## Activity 6-Movie JSON Dump:  

* In this activity, using `movie-json-dump.html` as starter code, I added functionality such that clicking `Movie Search` triggers an AJAX call to the OMDb database and the JSON response to be appended onto the page.

```javascript
// CODE GOES HERE
      $.ajax({
        url:queryURL,
        method:"GET",
      }).then(function(response){
        $("#movie-view").html(JSON.stringify(response)); //after converting the response object to string, show it on the page

      });

 ```
--- 
## Activity 7: Movie Button Layout:

* Using `movie-button-layout-easier.html` as a starting-point, I dynamically generated the initial buttons using jQuery and I also create new buttons upon entering the text in the text-box and clicking 'Add a Movie Yo'

```javascript

  // Function for displaying movie data
      function renderButtons() {

        // YOUR CODE GOES HERE
         $("#buttons-view").empty(); //empty the buttons div so it won't repeat itself
         for (var i=0;i<movies.length;i++){ //crete a button for each movie in the array and append it to the div where buttons are presented
          $("#buttons-view").append($("<button>").text(movies[i]));
         };

      }

      // This function handles events where one button is clicked
      $("#add-movie").on("click", function(event) {
        // YOUR CODE GOES HERE
        event.preventDefault(); //prevent submitting when button is clicked
        var movie=$("#movie-input").val(); //get the movie name from the user
        if(movie!==""){ //if movie name is not empty
          movies.push(movie); //push the movie name in the array
        }
        renderButtons(); //show updated buttons div

      });

      // Calling the renderButtons function to display the initial list of movies
      renderButtons();
 
```
---
## Activity 8: Log Movie Name ##

* In this activity, we capture the movie name for both the original and new buttons.


```javascript

      function alertMovieName() {
           // YOUR CODE GOES HERE!!!
           alert( $(this).val()); //get's the button value from the clicked button
        

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < movies.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var button = $("<button>");
          // Adding a class
          button.addClass("movie");
          // Added a value atribute
         button.attr("value",movies[i]);
          // Provided the initial button text
          button.text(movies[i]);
          // Added the button to the HTML
          $("#buttons-view").append(button);
        }
      }

      // This function handles events where one button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // The movie from the textbox is then added to our array
        movies.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Function for displaying the movie info
      // We're adding a click event listener to all elements with the class "movie"
      // We're adding the event listener to the document itself because it will
      // work for dynamically generated elements
      // $(".movies").on("click") will only add listeners to elements that are on the page at that time
      $(document).on("click", ".movie", alertMovieName); 

      // Calling the renderButtons function to display the initial buttons
      renderButtons();

```
---

## Activity 9: Click JSON ##

* In this activity, when we click the movie, corresponding information about the movie in JSON format is dumped at the end of the page

```html
   <form id="movie-form">
      <label for="movie-input">Add a Movie, Yo!</label>
      <input type="text" id="movie-input"><br>

      <!-- Button triggers new movie to be added -->
      <input id="add-movie" type="submit" value="Add a Movie, Yo!">

      <div id="movie-list"></div>
    </form>
```

```javascript

     function displayMovieInfo() {

         var title=$(this).val(); //getting the value attribute from the clicked button
         var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
  
        // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.

         $.ajax({
            url: queryURL,
            method: "GET"
         }).then(function(response) {
             $("#movie-list").html(JSON.stringify(response));
             
            });

       }
       
```
---
## Activity 10: Working Movie App ##

* In this activity, we display various snippets of information about the movie we clicked underneath the page. Newest clicked movie information goes on top. The Rating, release date, plot, year and movie poster are displayed.

```javascript

  function displayMovieInfo() {

        var movie = $(this).val();
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

        // Creates AJAX call for the specific movie button being clicked
        //// YOUR CODE GOES HERE!!!
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
          var mdiv=$("<div>"); //div is created to hold movie information such as rating,the date it was released,plot ,year and image
          var p=$("<p>"); //each info exists in a created paragraph
          $(p).text("Rated: "+response.Rated);  //rating of the movie is extracted from response
          $(mdiv).append(p); //added to the div
          $(mdiv).append($("<p>").text("Release Date: "+response.Released)); //Release Date  is extracted
          $(mdiv).append($("<p>").text("Plot: "+response.Plot));//plot is extracted
          $(mdiv).append($("<p>").text("Year: "+response.Year));//year is extracted
          var image= $("<img>"); //image is created
          $(image).attr("src",response.Poster); //its source is the address at the response.Poster
          $(mdiv).append(image); //we add the image to the movie div as well
          $("#movies-view").prepend(mdiv); //newest clicked movie is shown at the top and other clicked ones after that
        });
   }     

```
---

## Activity 11: Bands in Town App ##

* In this activity, we developed an application that searches the Bands In Town API for the artist specified in the search box and lists Artist Name, Thumbnail Image, Number of Fans Tracking the Artist, Number of Upcoming Events for the Artist and a link to the bandsintown url for this artist . 

```javascript

function searchBandsInTown(artist) {
    // Add code to query the bands in town api searching for the artist received as an argument to this function
    // Using jQuery, append the following to the #artist-div :
    // The artist's name
    // The artists thumbnail image
    // The number of fans tracking this artist
    // The number of upcoming events for this artist
    // A link to the bandsintown url for this artist
    // Note: Append actual HTML elements, not just text
    queryURL="https://rest.bandsintown.com/artists/"+artist+"?app_id=codingbootcamp";
    
    $.ajax({
       url:queryURL,
       method:"GET"

    }).then(function(response){
       console.log(response);
       $("#artist-div").append($("<p>").text("Artist's Name: "+response.name));
       $("#artist-div").append($("<img>").attr("src",response.thumb_url));
       $("#artist-div").append($("<p>").text("Number of Fans Tracking: "+response.tracker_count));
       $("#artist-div").append($("<p>").text("Number of Upcoming Events: "+response.upcoming_event_count));
       $("#artist-div").append($("<a href="+response.url+"'>"+"Link"+"</a>"));         
    })
  }
 
```    
-- 
## Activity 12:Cat Button ##

* In this activity, when the button is clicked, a random cat gif is displayed on the page

```javascript
 //When the button is clicked, the function executes
    $("#cat-button").on("click", function() {

      //this url returns a single random gif related to cats
      var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=cats";

      //Performing ajax "GET" request to the query url.
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from our request comes back
        .then(function(response) {
                console.log(response);
        //saving the image_original_url attribute
          var imageUrl = response.data.image_original_url;

          //creates an image tag and stores it
          var catImage = $("<img>");

          // sets the src attribute of the image tag to the imageURL
          catImage.attr("src", imageUrl);
          catImage.attr("alt", "cat image");

          //add the image to the top of the div
          $("#images").prepend(catImage);
        });
    }    

```

## Activity 14 : Dynamic Elements ##
* In this activity, we created an application that triggers gifs to appear related to the animal making the sound listed in the button.


```javascript
$("button").on("click", function() {
      var animal = $(this).attr("data-animal");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
        console.log(response);
        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

        

        // Step 2: since the image information is inside of the data key,
        // make a variable named results and set it equal to response.data
           
        // =============== put step 2 in between these dashes ==================
        var results=response.data;
        // ========================

        

        // Step 3: uncomment the for loop above and the closing curly bracket below.
        // Make a div with jQuery and store it in a variable named animalDiv.
        // Make a paragraph tag with jQuery and store it in a variable named p.
        // Set the inner text of the paragraph to the rating of the image in results[i].
        // Make an image tag with jQuery and store it in a variable named animalImage.
        // Set the image's src to results[i]'s fixed_height.url.
        // Append the p variable to the animalDiv variable.
        // Append the animalImage variable to the animalDiv variable.
        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.

        // ============= put step 3 in between these dashes ======================
        $("#gifs-appear-here").html("");
        for (var i = 0; i < results.length; i++) {
           var animalDiv=$("<div>");
           p=$("<p>");
           p.text(results[i].rating);
           var animalImage=$("<img>");
           $(animalImage).attr("src",results[i].images.fixed_height.url);
           animalDiv.append(p);
           animalDiv.append(animalImage);

           $("#gifs-appear-here").prepend(animalDiv);
         } 

        // ==================================
   

      });
    });

 ```
---

## Activity 15: Pausing GIFs ##

* This activity is about creating an application that displays gifs and when the gif is still, when it's clicked on it, it animates. If it animates, it becomes still.

```javascript
 $(".gif").on("click", function() {
      // STEP ONE: study the html above.
      // Look at all the data attributes.
      // Run the file in the browser. Look at the images.

      // After we complete steps 1 and 2 we'll be able to pause gifs from giphy.

      // STEP TWO: make a variable named state and then store the image's data-state into it.
      // Use the .attr() method for this.

      // ============== FILL IN CODE HERE FOR STEP TWO =========================

         var state=$(this).attr("data-state");

      // =============================================

      // STEP THREE: Check if the variable state is equal to 'still',
      // then update the src attribute of this image to it's data-animate value,
      // and update the data-state attribute to 'animate'.
            if(state==="still"){
               $(this).attr("src",$(this).attr("data-animate"));
               $(this).attr("data-state","animate");
            }
            
      // If state is equal to 'animate', then update the src attribute of this
      // image to it's data-still value and update the data-state attribute to 'still'
      // ============== FILL IN CODE HERE FOR STEP THREE =========================

            else if (state==="animate"){
              $(this).attr("src",$(this).attr("data-still"));
               $(this).attr("data-state","still");
            }

      // ==============================================

      // STEP FOUR: open the file in the browser and click on the images.
      // Then click again to pause.
    });
 

      
```
---
## Activity 16 : NewYork Times Search ##
* This application is about searching New York Times for a term related to article. There are also input fields that specify the bumber of records to be retrieved and Start and End Years which are optional.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>NY Times</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" type = "text/css" href="styles.css">
   
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script> 
</head>
<body>
    <div class="container-fluid">

       <div class="jumbotron ml-2 mr-2  text-center text-light p-5">
            <h1> <i class="far fa-newspaper"></i> New York Times Search</h1>
       </div> 

        <div class="card ml-2 mr-2">
            <h6 class="card-title bg-light p-2 font-weight-bold"><i class="fas fa-calendar-alt ml-2"></i> Search Parameters</h6>
            <div class="card-body">
                    <form mt-0>
                        <div class="form-group ">
                            <label for="searchTerm">Search Term:</label>
                            <input type="text" class="form-control required" id="searchTerm">
                        </div>
                        <div class="form-group">
                            <label for="numRecords">Number of Records to Retrieve:</label>
                            <input type="text" class="form-control required" id="numrecords">
                        </div>
                        <div class="form-group">
                            <label for="startYear">Start Year(Optional):</label>
                            <input type="text" class="form-control" id="startYear">
                        </div>
                        <div class="form-group">
                            <label for="endYear">End Year(Optional):</label>
                            <input type="text" class="form-control" id="endYear">
                        </div>
                        <button type="submit" class="btn btn-transparent"><i class="fas fa-search"></i> Search</button>
                        <button type="submit" class="btn btn-transparent"><i class="fas fa-trash-alt"></i> Clear Results</button>        
                    </form>
            </div>     
        </div>  

        <div class="card ml-2 mr-2 mt-1">
             <h6 class="card-title bg-light p-2 font-weight-bold"><i class="fas fa-table"></i> Top Articles</h6>
             <div class="card-body">
                        
                 
            </div>   
        </div> 
    
         <div class="card-footer  mt-1 text-center ml-2 mr-2 mb-1">
                Made with lots of love <i class="fas fa-heart"></i>
         </div>
           
    </div>    
         
        
        
    <script src="ny.js"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.8/js/all.js" integrity="sha384-SlE991lGASHoBfWbelyBPLsUlwY1GwNDJo3jSJO04KZ33K2bwfV9YBauFfnzvynJ" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
</body>
</html>

```

```javascript

 ```
 --   

