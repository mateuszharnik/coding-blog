import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { routes, aboutLinkNames } from '@client/helpers/constants';
import { toggleMenu, closeMenu } from '@client/store/NavBar/actions';
import logo from '@client/assets/images/logo.svg';

const NavBar = ({
  authorsLength, isOpen, isDisabled, isExpanded, handleToggleMenu, handleCloseMenu,
}) => {
  const aboutRoute = authorsLength > 1 ? routes.ABOUT_US : routes.ABOUT_ME;
  const aboutLink = authorsLength > 1 ? aboutLinkNames.ABOUT_US : aboutLinkNames.ABOUT_ME;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" title="Strona główna" to={routes.HOME} onClick={handleCloseMenu}>
        <img className="navbar-brand-img" src={logo} alt="Logo strony" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        title={isOpen ? 'Zamknij' : 'Otwórz'}
        disabled={isDisabled}
        aria-controls="navbarSupportedContent"
        aria-expanded={isExpanded}
        aria-label="Toggle navigation"
        onClick={handleToggleMenu}
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className={`navbar-collapse${isOpen ? '' : ' collapse'}`} id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto text-center">
          <li className="nav-item">
            <Link className="nav-link" to={routes.POSTS} onClick={handleCloseMenu}>Posty</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`${routes.POSTS}/123`} onClick={handleCloseMenu}>Post</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={aboutRoute} onClick={handleCloseMenu}>{aboutLink}</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={routes.CONTACT} onClick={handleCloseMenu}>Kontakt</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={routes.LOGIN} onClick={handleCloseMenu}>Zaloguj</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={routes.ADMIN} onClick={handleCloseMenu}>Panel administratora</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

NavBar.propTypes = {
  authorsLength: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  handleToggleMenu: PropTypes.func.isRequired,
  handleCloseMenu: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isOpen: state.navbar.isOpen,
  isExpanded: state.navbar.isExpanded,
  isDisabled: state.navbar.isDisabled,
  authorsLength: state.navbar.authorsLength,
});

const mapDispatchToProps = (dispatch) => ({
  handleToggleMenu: () => {
    dispatch(toggleMenu());
  },
  handleCloseMenu: () => {
    dispatch(closeMenu());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
