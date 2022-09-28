export interface ForecastWeatherInterface {
  [day: string]: {
    temp: number,
    icon: string
  }
}

export interface Props {
  forecastWeather: ForecastWeatherInterface,
  nextFourDays: string[]
}
