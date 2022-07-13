import React from 'react';
import PropTypes from 'prop-types';

const LinkButton = React.forwardRef(({ onClick, href, text }, ref) => (
  <a href={href} onClick={onClick} ref={ref}>
    {text}
  </a>
));

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
};

export default LinkButton;
