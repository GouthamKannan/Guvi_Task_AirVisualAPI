
// AirVisual API details 
let APIKey = "ae2a2e35-cda7-4f9f-9899-8ce38080453e";
let APIUrl = "http://api.airvisual.com/v2/";

/**
 * Function to populate the select state dropdown
 */
async function getStateDetails(){
    try {      
        //Get states for the country India
        let response = await fetch(`${APIUrl}states?country=India&key=${APIKey}`);
        let data = await response.json();
    
        //Populating the State dropdown
        let stateDropDown = document.getElementById("state")
        stateDropDown.innerHTML = `<option selected>Choose...</option>`;
        
        data.data.forEach(element => {
            stateDropDown.innerHTML += `<option value="${element.state}">${element.state}</option>` 
        });
        
        // Adding eventlistener to get the city details for selected state
        stateDropDown.addEventListener("change",function(e){getCityDetails(e.target.value)});
    } catch (error) {
        console.log(error)
    }

}

/**
 * Function to populate the select city dropdown
 */
async function getCityDetails(state){
    try {
        //Get cities for the selected state
        let response = await fetch(`${APIUrl}cities?state=${state}&country=India&key=${APIKey}`);
        let data = await response.json();
    
        //Populating the ctiy dropdown
        let cityDropDown = document.getElementById("city")
        cityDropDown.innerHTML = `<option selected>Choose...</option>`;
        
        data.data.forEach(element => {
            cityDropDown.innerHTML += `<option value="${element.city}">${element.city}</option>` 
        });
    
        // Adding eventlistener to get the weather details for selected city
        cityDropDown.addEventListener("change",function(e){getWeatherDetails(e.target.value,state)});
    } catch (error) {
        console.log(error)
    }
}

/**
 * Function to get the weather details for the selected state and city
 */
async function getWeatherDetails(city,state){
    try {
        // Getting weather details
        let response = await fetch(`${APIUrl}city?city=${city}&state=${state}&country=India&key=${APIKey}`);
        let data = await response.json();

        // Populating the weather details
        document.getElementById("location").innerHTML = `Location : ${data.data.location.coordinates[0]}, ${data.data.location.coordinates[1]}`;
        document.getElementById("temperature").innerHTML = `Temperature : ${data.data.current.weather.tp} Celsius`;
        document.getElementById("pressure").innerHTML = `Pressure : ${data.data.current.weather.pr} hPa`;
        document.getElementById("humidity").innerHTML = `Humidity : ${data.data.current.weather.hu} %`;
        document.getElementById("wind-speed").innerHTML = `Wind Speed : ${data.data.current.weather.ws} m/s`;
    } catch (error) {
        console.log(error)
    }
}

 getStateDetails();