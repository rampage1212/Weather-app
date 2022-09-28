import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Props } from './todays-weather-interface';
import { getWeatherIconUrl } from '../../util';
import { LOCAL_IMGS } from '../../constants';

class TodaysWeather extends React.PureComponent<Props> {
  render() {
    const { todaysWeather } = this.props;
    const { temp, main, icon } = todaysWeather;
    let is_img: string = null;
    LOCAL_IMGS.map((one) => {
      if (icon.search(one) != -1)
        is_img = one;
    })
    return (
      <Container className="todays-weather-container">
        <div className="day">Today</div>
        <Row className="weather-details">
          <Col xs={12} lg={{ span: 3 }} className="weather-image-container">
            {is_img != null ?
              <>
                <img alt="weather icon" src={`img/${is_img}.png`} />
              </> :
              <>
                <img alt="weather icon" src={getWeatherIconUrl(icon)} />
              </>
            }
          </Col>
          <Col xs={12} lg={{ span: 3 }} className="description">
            <div className="temperature">
              {temp}°
            </div>
            <div className="main">{main}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default TodaysWeather;
