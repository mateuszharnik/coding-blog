import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { closeMenu, toggleMenu } from '@client/store/NavBar/actions';
import { routes } from '@client/helpers/constants';
import logo from '@client/assets/images/logo.svg';

const NavBar = ({
  isOpen, isDisabled, isExpanded, handleToggleMenu, handleCloseMenu,
}) => (
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
          <Link className="nav-link" to={routes.ABOUT} onClick={handleCloseMenu}>O Blogu</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={routes.AUTHORS} onClick={handleCloseMenu}>Autorzy</Link>
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

NavBar.propTypes = {
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
