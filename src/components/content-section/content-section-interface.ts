export interface Props {
}

export interface State {
  activeCity: string,
  forecastWeather?: {
    [day: string]: {
      temp: number,
      icon: string
    }
  },
  todaysWeather?: {
    temp: number,
    main: string,
    icon: string
  }
}
