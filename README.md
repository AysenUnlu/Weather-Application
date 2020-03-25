# WEATHER APPLICATION

## About: ##

This is a Weather Dashboard application with search functionality to find current weather conditions and the future weather outlook for multiple cities by using Open Weather API. This application runs in the browser and features dynamically updated HTML and CSS powered by jQuery.

* It displays the following under current weather conditions:

  * City

  * Date

  * Icon image (visual representation of weather conditions)

  * Temperature

  * Humidity

  * Wind speed

  * UV index

*  It Includes a 5-Day Forecast below the current weather conditions. Each day for the 5-Day Forecast displays the following:

  * Date

  * Icon image (visual representation of weather conditions)

  * Temperature

  * Humidity

* It stores previously searched for cities in localstorage and displays them to the user. User can delete the history by a press of a button.

* It loads last searched city forecast on page load.

* This application also shows the user's current location on the dashboard.


## Installation: ##

    You can check the running project:

    [Weather](https://my-static-weather-application.herokuapp.com/index.html)

## Usage: ##

  ![Welcome Page](images/weather.gif)

   - When the user runs the application, he is presented with a Weather Dashboard which shows the current weather conditions as well as 5-day weather forecast for the last searched city. And the user can see his search history. First the weather conditions for Los Angeles is searched.

   - When user enters another city such as Princeton,NJ. The information about that city is going to be shown and the city is added to the search history which you can also see it on left side of the dashboard. If the same city is searched again, there will not be double entries in the search history.

   - If the user enters a city that does not exists, he will be prompted with a modal which shows the error message. If we enter `Hogwarts`, we'll be presented with an error message stating that it is not found.

   - When the user clicks on one of the cities in his search history, the information about current weather and 5-day forecast of the chosen city will be shown on the page. And the city will not be added to the end of the history since there will not be double entries in the search history. When `Los Angeles` is entered again; without adding that into search history, the information will be shown on the screen.

  - When user clicks "Show my Position on Google Map", he will be presented with a map on which his location is marked if he gives permission for the app to use his location. Since at the time, I am not using an API key to access the Google Maps, although the location is shown, the map is not loaded properly and has message "for development purposes only" But the user still can zoom in and out of his location.

  - If the user deletes his search history, it will be deleted from the local storage too and even if the page is refreshed, the screen will be the same


---------------------------------------------------------------------------------------------------------------------------

## How: ##

* When the page is loaded, the "loadCities" function is fired up. In this function, the search history is fetched from the local storage and each city in the history is added to the list on the left part of the page by "addToList" function. The last entry of the search history which is also the last searched city is passed as a parameter to the function "currentWeather" which shows the current weather and forecast for the last searched city.

* "addToList" function dynamically adds the passed city on the page where previous searches are shown. It also sets the data-value attribute to the city's name for finding out about the city when the corresponding button is clicked.

* "currentWeather" function is passed the city as an argument to show the weather information about that city. Ajax call is made to the OpenWeather API, by including the city and the API Key in the search query. If the call returns with a 404-not found error, error message of city not being found will be shown in a modal to the user. If the call is a success than the weather information will be returned in "response" variable. Name of the city, date and icon code will be extracted from the returned data. By using the icon code and the address for the weather images to update the "src" attribute, image is formed and added dynamically to the page. Temperature information returned was in Kelvin and is converted to Fahreneit. Wind speed is converted from meters per second to miles per hour (MPH). Humidity data is also extracted from response. "UVIndex" function is called with coordinate information and it returns the UV Index of the city. To fetch UV index another AJAX call is made in the "UVIndex" function by including the latitute and longitute information in the query url. And uv index for that city is shown on the page. "forecast" function is called with the city id. When the ajax call was success (which is determined by the code 200), the citites will be fetched from local storage. If there are no entries in the local storage, the city will be stored in the storage and also will be shown on the page where the search history is displayed. If there are entries in the storage, by using "find" function, we will search the entries from the storage to see if the city exists; if it exists,to prevent double entry, it won't be added to the storage or the page. If it does not previously searched, then it will be added to the storage and the page.

*  "forecast" function displays the 5-day forecast. API call id made with city id to get the forecast and for each day, data (date,icon,temp, humidity) is extracted and is shown on the page. 

* When the user enters a city name and presses the search button, "displayCityWeather"  function is fired up. The spaces in the user input is removed and the "currentWeather" function is called to display the current weather and 5-day forecast for that city.

* "deleteHistory" function deletes all the search history from the page and the local storage.

* When "show my position on google map" button is clicked, "showPosition" function is fired up. In that function, first the existance of "navigator.geolocation" object is  tested; if it exists geolocation services are available; if not, the browser does not support it. To obtain the user's current location, "getCurrentLocation" function is called with 2 callback functions passed as arguments (showMap and showError). When location is not obtained, "showError" function displays the error messages in the page where the map is supposed to be. For map options; it's stated that it's going to be centered based on coordinates. Before that, google coordinates object "latlong" is formed from the position data that's fetched from geolocation. The initial resolution at which to display the map is set by the zoom property, where zoom 0 corresponds to a map of the Earth fully zoomed out, and larger zoom levels zoom in at a higher resolution. We chose 16 to show the streets and landmarks around our location. Map type control is enabled and by updating navigation control options, we're only going to use zoom on the map. Then we create a new map with specified options to be shown in the HTML div specified by the fort parameter. Then we create a marker object which marks our position on the map.

## Credits: ## 

I'm greatful for our instructor Omar Patel and TA's Tyler Bray, Matthew Calimbas and PeterPark for their help on the issues encountered in the process of developing this application.

The web sites that I found useful while implementing the application are listed below:

  * https://getbootstrap.com/docs/4.3/getting-started/introduction/
  * https://openweathermap.org/api
  * https://www.freecodecamp.org/learn/front-end-libraries/jquery/
  * https://developers.google.com/maps/documentation/javascript/tutorial
  * https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
  * https://fontawesome.com/icons/trash-alt?style=solid
  
## Licence: ##

Anybody is welcomed to copy code snippets and test it out.

## Limitations: ##

 Since the API key for google maps can not be acquired without giving credit card information, I used the default settings. Although it shows the user's location correctly, the map has not been downloaded properly. 