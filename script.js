function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value.trim();
    const apiKey = '872e13480c5681994fd49b69a8149386';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('City not found!');
        }
        return response.json();
      })
      .then(data => {
        const weatherInfo = document.getElementById('weatherInfo');
        const { name, weather, main } = data;
        const { description } = weather[0];
        const { temp, feels_like, humidity } = main;
  
        weatherInfo.innerHTML = `
          <h2>${name}</h2>
          <p><strong>Temperature:</strong> ${(temp-273).toFixed(2)}°C</p>
          <p><strong>Feels like:</strong> ${(feels_like-273).toFixed(2)}°C</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
          <p><strong>Weather Status:</strong> ${description.toLowerCase()}</p>
        `;



      // Update weather animation
        const weatherAnimation = document.getElementById('weatherAnimation');
        weatherAnimation.innerHTML = ''; // Clear previous animations
  
        switch (description.toLowerCase()) {
          case 'broken clouds':
          case 'overcast clouds':
          case 'few clouds':
            case 'scattered clouds':
            weatherAnimation.innerHTML = '<div class="clouds"></div>';
            break;

          case 'smoke':
          case 'haze':
            weatherAnimation.innerHTML = '<div class="fog"></div>';
            break;
         
          case 'clear sky':
            weatherAnimation.innerHTML = '<div class="clear"></div>';
            break;
          case 'rain':
            weatherAnimation.innerHTML = '<div class="rain"></div>';
            break;
          default:
            weatherAnimation.style.display = 'none'; // Hide weather animation
            break;
        }
      
      })
      .catch(error => {
        const weatherInfo = document.getElementById('weatherInfo');
        weatherInfo.innerHTML = `<p>${error.message}</p>`;
      
      });
  
    cityInput.value = '';
  }
  