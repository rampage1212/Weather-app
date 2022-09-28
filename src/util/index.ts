import { API_KEY, WEEK_DAYS, NUMBER_OF_DAYS } from '../constants';

export const getWeatherIconUrl = (icon: string): string => `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const getApiDataUrl = (path: string, city: string): string => `https://api.openweathermap.org/data/2.5/${path}?units=metric&q=${city}&appid=${API_KEY}`;

export const fetchAPIData = async (url: string): Promise<any> => {
  const response = await fetch(url);
  return response.json();
};

export const getNextFourDays = (): string[] => {
  const nextFourDays = [];

  for (let i = 1; i <= NUMBER_OF_DAYS; i += 1) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dayIndex = date.getDay();
    nextFourDays.push(WEEK_DAYS[dayIndex].slice(0, 3));
  }

  return nextFourDays;
};
