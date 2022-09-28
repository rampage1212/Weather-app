import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Props } from './forecast-weather-interface';
import { getWeatherIconUrl } from '../../util';
import { LOCAL_IMGS } from '../../constants';

class ForecastWeather extends React.PureComponent<Props> {
  render() {
    const { forecastWeather, nextFourDays } = this.props;

    return (
      <Container className="forecast-weather-container">
        <Row>
          {nextFourDays.map((day: string, i: number) => {
            const { temp, icon } = forecastWeather[day];
            let is_img: string = null;
            LOCAL_IMGS.map((one) => {
              if (icon.search(one) != -1)
                is_img = one;
            })
            return (
              <Col className="weather-details" key={i} xs={6} md={6} lg={3}>
                <div className="day">{day}</div>
                {is_img != null ?
                  <>
                    <img alt="weather icon" src={`img/${is_img}.png`} />
                  </> :
                  <>
                    <img alt="weather icon" src={getWeatherIconUrl(icon)} />
                  </>
                }
                <div className="temperature">{temp}°</div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default ForecastWeather;
