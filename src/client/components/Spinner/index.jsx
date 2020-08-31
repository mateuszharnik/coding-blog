import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';

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
