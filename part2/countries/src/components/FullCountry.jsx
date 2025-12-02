import services from '../services/Weather'
import { useState, useEffect } from 'react'

const FullCountry = ({ country }) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
    services
      .getWeather(country.capital[0])
      .then(data =>
        setWeather({
          temp: data.currentConditions.temp,
          wind: data.currentConditions.windspeed,
          icon: data.currentConditions.icon,
        }))
  }, [])

  if (!weather) {
    return <></>
  }

  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([l, lang]) => <li key={l}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} alt={`The flag of ${country.name.common}`} />
      <h2>Weather in {country.capital[0]}</h2>
      <div>
        Temperature {Math.round((weather.temp - 32) * (5 / 9))} Celsius
      </div>
      <div>
        Wind {weather.wind} m/s
      </div>

      <img
        src={`https://raw.githubusercontent.com/visualcrossing/WeatherIcons/refs/heads/main/PNG/1st%20Set%20-%20Color/${weather.icon}.png`}
        alt="image icon for the current weather"
      />
    </>
  )
}

export default FullCountry