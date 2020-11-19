import React, { Component } from 'react';
import Spinner from '@client/components/Spinner';
import { getAbout } from '@client/helpers/api/about';
import { errors } from '@client/helpers/constants';

class About extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      about: {},
      errorMessage: '',
    };
  }

  componentDidMount = async () => {
    document.title = 'Coding Blog | O blogu';

    try {
      const { data: about = {} } = await getAbout();

      this.setState(({ isLoading }) => ({
        isLoading: !isLoading,
        about,
      }));
    } catch ({ request = {}, response = {} }) {
      const { status } = request;
      const { data } = response;
      const errorMessage = status ? data.message : errors.SERVER_CONNECTION;

      this.setState({
        errorMessage,
        isLoading: false,
      });
    }
  }

  render = () => {
    const { isLoading, about, errorMessage } = this.state;
    const { description } = about;

    if (isLoading) {
      return (
        <div className="min-vh-100 position-relative">
          <Spinner center />
        </div>
      );
    }

    if (errorMessage) {
      return (
        <div className="server-error position-relative">
          <div className="server-error__container center p-2">
            <p className="text-center mt-4">
              {errorMessage}
            </p>
          </div>
        </div>
      );
    }

    if (!description) {
      return (
        <div className="no-content position-relative">
          <div className="no-content__container center p-2">
            <p className="text-center mt-4">
              Brak treści.
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="about mx-auto">
        <header>
          <h3 className="d-none">
            O blogu
          </h3>
        </header>
        <article>
          <div className="py-5 text-center">
            {description}
          </div>
        </article>
      </div>
    );
  }
}

export default About;
