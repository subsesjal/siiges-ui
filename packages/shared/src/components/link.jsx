import React from 'react';
import PropTypes from 'prop-types';
import Link from '@mui/material/Link';

const LinkButton = React.forwardRef(({ text, onClick, href }, ref) => (
  <Link href={href} onClick={onClick} ref={ref}>
    <b>{text}</b>
  </Link>
));

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.string.isRequired,
};

export default LinkButton;
