import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { routes } from '@client/helpers/constants';
import img from '@client/assets/images/undraw_page_not_found_su7k.svg';

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 10,
    };
    this.interval = null;
    this.time = 1000;
  }

  componentDidMount() {
    document.title = 'Coding Blog | 404';

    this.interval = setInterval(this.count, this.time);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  count = () => {
    const { counter } = this.state;
    const { history } = this.props;

    this.setState((prevState) => ({
      counter: prevState.counter - 1,
    }));

    if (counter <= 0) {
      history.push(routes.HOME);
    }
  };

  render() {
    const { counter } = this.state;

    return (
      <div className="not-found">
        <div className="not-found__container center p-2">
          <img
            src={img}
            className="not-found__image"
            alt="Liczba 404"
          />
          <p className="text-center mt-4">
            <span className="d-block">Nie znaleziono strony.</span>
            Przekierowanie do <Link to={routes.HOME} title="Wróć do strony głównej">strony głównej</Link> nastąpi za {counter}s.
          </p>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(NotFound);
