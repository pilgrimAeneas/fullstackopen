import axios from 'axios'


const getWeather = city => {
  const api_key = import.meta.env.VITE_API_KEY
  const URL =
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${api_key}&iconSet=icons1`

  return (
    axios
      .get(URL)
      .then(response => response.data)
  )
}

export default {
  getWeather
}