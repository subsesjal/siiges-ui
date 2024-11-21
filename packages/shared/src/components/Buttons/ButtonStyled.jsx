import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/buttons/ButtonStyle.css';
import ButtonSimple from './ButtonSimple';

export default function ButtonStyled({
  text,
  type,
  design,
  onClick,
  icon,
  align,
}) {
  const justifycontent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }[align];
  return (
    <ButtonSimple
      className={`buttonaction button${design}`}
      onClick={() => onClick()}
      type={type}
      align={justifycontent}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon && (
          <span className="icon" style={{ marginRight: '5px' }}>
            {icon}
          </span>
        )}
        <span className="text">{text}</span>
      </div>
    </ButtonSimple>
  );
}

ButtonStyled.defaultProps = {
  onClick: () => {},
  design: 'normal',
  type: 'button',
  align: 'left',
  icon: null,
};

ButtonStyled.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  type: PropTypes.string,
  align: PropTypes.string,
  design: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.element,
};
