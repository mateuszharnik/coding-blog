import React, { Component } from 'react';
import Spinner from '@client/components/Spinner';
import NoContent from '@client/components/NoContent';
import ServerError from '@client/components/ServerError';
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
        <ServerError message={errorMessage} />
      );
    }

    if (!description) {
      return (
        <NoContent />
      );
    }

    return (
      <div className="about mx-auto">
        <header>
          <h3 className="d-none">
            O blogu
          </h3>
        </header>
        <article className="container about__description row mx-auto">
          <div className="py-5 text-center">
            {description}
          </div>
        </article>
      </div>
    );
  }
}

export default About;
