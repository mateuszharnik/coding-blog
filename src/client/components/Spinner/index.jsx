import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const Spinner = ({ size, center }) => {
  const spinnerClass = center ? 'spinner center' : 'spinner';

  return (
    <div className={spinnerClass}>
      <FontAwesomeIcon icon={faCircleNotch} size={size} spin />
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.string,
  center: PropTypes.bool,
};

Spinner.defaultProps = {
  size: '3x',
  center: false,
};

export default Spinner;
