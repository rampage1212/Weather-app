import React from 'react';
import Header from '../header';
import TodaysWeather from '../todays-weather';
import ForecastWeather from '../forecast-weather';
import ErrorBoundary from '../error-boundary';
import { CITIES } from '../../constants';
import {
  getNextFourDays, getApiDataUrl, fetchAPIData,
} from '../../util';
import { Props, State } from './content-section-interface';
import { ForecastWeatherInterface } from '../forecast-weather/forecast-weather-interface';

const nextFourDays = getNextFourDays();

class ContentSection extends React.Component <Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // setting the first city by default
      activeCity: CITIES[0],
    };
  }

  async componentDidMount(): Promise<void> {
    const { activeCity } = this.state;

    await this.updateData(activeCity);
  }

  async updateData(activeCity: string): Promise<void> {
    const currentWeatherPromise = fetchAPIData(getApiDataUrl('weather', activeCity));
    const forecastWeatherPromise = fetchAPIData(getApiDataUrl('forecast', activeCity));

    const [currenWeatherData, forecastWeatherData] = await Promise.all(
      [currentWeatherPromise, forecastWeatherPromise],
    );

    const todaysWeather = {
      temp: Math.round(currenWeatherData?.main?.temp),
      icon: currenWeatherData?.weather[0]?.icon,
      main: currenWeatherData?.weather[0]?.main,
    };
    const { list } = forecastWeatherData;
    const forecastWeather: Partial<ForecastWeatherInterface> = {};

    nextFourDays.forEach((day, i) => {
      // api returns 3 hours forecast. 8*3 = 24 hours = 1 day
      const index = (i + 1) * 8;

      forecastWeather[day] = {
        temp: Math.round(list[index]?.main?.temp),
        icon: list[index]?.weather[0]?.icon,
      };
    });

    this.setState({
      activeCity,
      todaysWeather,
      forecastWeather,
    });
  }

  render() {
    const { activeCity, todaysWeather, forecastWeather } = this.state;

    return (
      <ErrorBoundary>
        <div className="content-section-container">
          <Header
            activeCity={activeCity}
            updateData={async (city: string): Promise<void> => { await this.updateData(city); }}
          />
          <div className="weather-dashboard">
            {todaysWeather && <TodaysWeather todaysWeather={todaysWeather} />}
            {forecastWeather
          && <ForecastWeather forecastWeather={forecastWeather} nextFourDays={nextFourDays} />}
          </div>
        </div>
      </ErrorBoundary>

    );
  }
}

export default ContentSection;
