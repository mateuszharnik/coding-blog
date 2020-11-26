import React, { Component, createRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook, faGithub, faInstagram, faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import Spinner from '@client/components/Spinner';
import NoContent from '@client/components/NoContent';
import ServerError from '@client/components/ServerError';
import { getAuthors } from '@client/helpers/api/authors';
import { errors, genders } from '@client/helpers/constants';
import femaleAvatar from '@client/assets/images/undraw_female_avatar_w3jk.svg';
import maleAvatar from '@client/assets/images/undraw_male_avatar_323b.svg';

class Authors extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      isLoadingAuthors: false,
      pagination: {},
      authors: [],
      errorMessage: '',
    };

    this.time = 100;
    this.authorsRef = createRef();
    this.throttleScroll = throttle(this.checkScrollPosition, this.time);
    this.debounceScroll = debounce(this.checkScrollPosition, this.time);
  }

  componentDidMount = async () => {
    document.title = 'Coding Blog | Autorzy';

    window.addEventListener('scroll', this.throttleScroll);
    window.addEventListener('scroll', this.debounceScroll);

    try {
      const { data } = await getAuthors();
      const { authors = [], pagination = {} } = data;

      this.setState(({ isLoading }) => ({
        isLoading: !isLoading,
        pagination,
        authors,
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
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.throttleScroll);
    window.removeEventListener('scroll', this.debounceScroll);
  };

  checkScrollPosition = () => {
    if (!this.authorsRef?.current) return;

    const { pagination, isLoadingAuthors } = this.state;
    const { remaining } = pagination;
    const { bottom } = this.authorsRef.current.getBoundingClientRect();

    const shouldFetch = bottom - 200 < window.innerHeight;

    if (!(shouldFetch && remaining && !isLoadingAuthors)) return;

    this.setLoadingAuthors();
  }

  setLoadingAuthors = (isLoadingAuthors = true) => {
    this.setState({
      isLoadingAuthors,
    }, this.loadAuthors);
  }

  loadAuthors = async () => {
    try {
      const { pagination } = this.state;
      const { skip, limit } = pagination;

      const { data } = await getAuthors(skip + limit);
      const { authors: newAuthors = [], pagination: newPagination = {} } = data;

      this.setState(({ authors }) => ({
        isLoadingAuthors: false,
        authors: [...authors, ...newAuthors],
        pagination: { ...newPagination },
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
  };

  render = () => {
    const {
      isLoading, authors, isLoadingAuthors, errorMessage,
    } = this.state;
    const authorsLength = authors.length;

    const checkSocialMedia = ({ social_media }) => social_media?.facebook
      || social_media?.github
      || social_media?.instagram
      || social_media?.twitter;

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

    if (!authors.length) {
      return (
        <NoContent />
      );
    }

    return (
      <div className="authors mx-auto">
        <header>
          <h3 className="d-none">Autorzy</h3>
        </header>
        <article ref={this.authorsRef}>
          <>
            {authors.map((author, index) => (
              <div
                className={`author py-5 text-center${
                  index % 2 || authorsLength === 1 ? '' : ' bg-light'
                }`}
                key={author._id}
              >
                <div className="container row mx-auto">
                  <div
                    className={`d-flex justify-content-center align-items-center mb-3${
                      authorsLength > 1 ? ' col-lg-4 mb-lg-0' : ' mx-auto'
                    }`}
                  >
                    {author.image ? (
                      <img
                        className="author__image rounded-circle"
                        src={author.image}
                        alt="Zdjęcie autora"
                      />
                    ) : (
                      <img
                        className="author__image rounded-circle"
                        src={author.gender === genders.MALE ? maleAvatar : femaleAvatar}
                        alt="Avatar autora"
                      />
                    )}
                  </div>
                  <div className={`w-100${authorsLength > 1 ? ' col-lg-8 text-lg-left' : ''}`}>
                    <h5 className="h3 mb-3 font-weight-bold text-primary">{author.name}</h5>
                    <p
                      className={`mb-0 text-justify${
                        authorsLength === 1 ? ' author__description mx-auto' : ''
                      }`}
                    >
                      {author.description}
                    </p>
                    {checkSocialMedia(author) && (
                    <div
                      className={`d-flex justify-content-center mt-3${
                        authorsLength > 1 ? ' justify-content-lg-start' : ''
                      }`}
                    >
                      {author.social_media.facebook && (
                      <div className="author__social-media-icon">
                        <a
                          className="d-block text-dark text-center"
                          href={author.social_media.facebook}
                          title="Profil na Facebook"
                        >
                          <FontAwesomeIcon icon={faFacebook} />
                          <span className="d-none">Facebook</span>
                        </a>
                      </div>
                      )}
                      {author.social_media.github && (
                      <div className="author__social-media-icon">
                        <a
                          className="d-block text-dark text-center"
                          href={author.social_media.github}
                          title="Profil na Github"
                        >
                          <FontAwesomeIcon icon={faGithub} />
                          <span className="d-none">Github</span>
                        </a>
                      </div>
                      )}
                      {author.social_media.instagram && (
                      <div className="author__social-media-icon">
                        <a
                          className="d-block text-dark text-center"
                          href={author.social_media.instagram}
                          title="Profil na Instagram"
                        >
                          <FontAwesomeIcon icon={faInstagram} />
                          <span className="d-none">Instagram</span>
                        </a>
                      </div>
                      )}
                      {author.social_media.twitter && (
                      <div className="author__social-media-icon">
                        <a
                          className="d-block text-dark text-center"
                          href={author.social_media.twitter}
                          title="Profil na Twitter"
                        >
                          <FontAwesomeIcon icon={faTwitter} />
                          <span className="d-none">Twitter</span>
                        </a>
                      </div>
                      )}
                    </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoadingAuthors && (
            <div className="text-center mb-5">
              <Spinner />
            </div>
            )}
          </>
        </article>
      </div>
    );
  }
}

export default Authors;
