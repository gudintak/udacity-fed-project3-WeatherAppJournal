//  baseURL and apiKey are stored here
const apiKey = '&appid=c01353749859251e22299a71e0e59492'
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

//  Lesson 4 - Asynchronous javascript
//  fuction to get weather data using web api
//  Sample zipcode for testing: 11221, 40170
const getWeatherData = async (baseURL, zip, apiKey) => {
  const res = await fetch(baseURL + zip + apiKey)
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

/* Function to POST data */
//  Lesson 3 - HTTP requests & Routes
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
}

//  Updating UI Elements
//  Lesson 4 - Asynchronous javascript

// //sample code from Lesson
// const updateUI = async () => {
//   const request = await fetch('/all');
//   try{
//     const allData = await request.json();
//     document.getElementById('animalName').innerHTML = allData[0].animal;
//     document.getElementById('animalFact').innerHTML = allData[0].facts;
//     document.getElementById('animalFav').innerHTML = allData[0].fav;
//
//   }catch(error){
//     console.log("error", error);
//   }
// }

const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    document.getElementById('date').innerHTML = 'Today is ' + allData.date;
    document.getElementById('temp').innerHTML = 'The temperature in ' + zip.value + ' is ' + allData.temp + 'k';
    document.getElementById('content').innerHTML = 'Your feeling was: ' + allData.content;

  } catch (error) {
    console.log("error", error);
  }
}

// //  Here is the code from the lesson videos
// function performAction(e){
//   const newAnimal =  document.getElementById('animal').value;
//   const favFact =  document.getElementById('favorite').value;
//
//   getAnimal('/animalData',)
//   // New Syntax!
//   .then(function(data){
//     // Add data
//     console.log(data);
//     postData('/addAnimal', {animal:data.animal, fact: data.fact, fav:favFact} );
//   })
//   .then(
//     updateUI()
//   )
// }

//  using two .then is not updating DOM unless I click generate button twice, so
//  updateUI is put in .then()
//  function for generate button
function generateWeatherReport() {
  const zip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;

  getWeatherData(baseURL, zip, apiKey)
    .then(function(data) {
      postData('/add', {
        temp: data.main.temp,
        date: newDate,
        content: content,
      });
      updateUI('/all');
    })
};

//  adding event listener to the generate button
document.getElementById('generate').addEventListener('click', generateWeatherReport)

// //  Checking if this is working or not
// getWeatherData(baseURL, 11221, apiKey)
//   .then(function(data) {
//     console.log(data);
//   })
