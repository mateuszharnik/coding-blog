import PropTypes from 'prop-types';
import React from 'react';
import { errors } from '@client/helpers/constants';

const ServerError = ({ message }) => (
  <div className="server-error position-relative">
    <div className="server-error__container center p-2">
      <p className="text-center mt-4">
        {message}
      </p>
    </div>
  </div>
);

ServerError.defaultProps = {
  message: errors.SERVER_CONNECTION,
};

ServerError.propTypes = {
  message: PropTypes.string,
};

export default ServerError;
