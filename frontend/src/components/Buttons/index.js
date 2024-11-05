import PropTypes from 'prop-types';

import { BUTTON_SIZE_TYPES, ButtonTypes } from './define';
import { PrimaryButtonStyle } from './styled';
import palette from 'utils/palette';

export function PrimaryButton({
  icon,
  size = 'middle',
  onClick = () => {},
  type = ButtonTypes.PRIMARY,
  children,
  ...props
}) {
  const { primary, white, secondary } = palette;

  const bgColor = (() => {
    switch (type) {
      case ButtonTypes.NATURAL:
      case ButtonTypes.LIGHT_PRIMARY:
        return 'transparent';
      case ButtonTypes.SECONDARY:
        return secondary;
      case ButtonTypes.PRIMARY:
      default:
        return primary;
    }
  })();

  const fontColor = (() => {
    switch (type) {
      case ButtonTypes.NATURAL:
      case ButtonTypes.SECONDARY:
      case ButtonTypes.LIGHT_PRIMARY:
        return primary;
      case ButtonTypes.PRIMARY:
      default:
        return white;
    }
  })();

  return (
    <PrimaryButtonStyle
      onClick={onClick}
      fontcolor={fontColor}
      background={bgColor}
      borderColor={type.startsWith('light') ? fontColor : bgColor}
      icon={icon}
      size={size}
      {...props}
    >
      {children}
    </PrimaryButtonStyle>
  );
}

PrimaryButton.propTypes = {
  background: PropTypes.string,
  icon: PropTypes.element,
  size: PropTypes.oneOf(Object.values(BUTTON_SIZE_TYPES)),
  fontColor: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.values(ButtonTypes))
};
