import React from 'react';
import classNames from 'classnames';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Props } from './header-interface';
import { CITIES } from '../../constants';

class Header extends React.PureComponent<Props> {
  async handleOnClick(city: string): Promise<void> {
    const { updateData } = this.props;

    await updateData(city);
  }

  render() {
    const { activeCity } = this.props;

    return (
      <Container className="header-container">
        <Row>
          {CITIES.map((city: string, i: number) => {
            const cityHeaderClassName = classNames('city-header', { active: city === activeCity });
            return (
              <Col
                lg={4}
                xs={12}
                onClick={async (): Promise<void> => { await this.handleOnClick(city); }}
                className={cityHeaderClassName}
                key={i}
              >
                {city.toLocaleUpperCase()}
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Header;
