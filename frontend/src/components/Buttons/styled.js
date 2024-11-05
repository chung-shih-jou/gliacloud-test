import styled from 'styled-components';
import { getBoxBorderCssStyle } from 'utils/method';

export const PrimaryButtonStyle = styled.button`
  cursor: pointer;
  padding: 4px;
  background: ${({ background }) => background};
  color: ${({ fontcolor }) => fontcolor};
  border-color: ${({ borderColor }) => borderColor};
  width: ${({ block }) => (block ? '100%' : 'auto')};
  border-radius: 20px;
  box-shadow: 0px 4px 4px 0px #00000040;
  border-style: ${({ dashed }) => (dashed ? 'dashed' : 'solid')};
  border-width: 1px;
  &:hover,
  &:focus {
    background: ${({ background }) => background};
    opacity: 0.8;
    color: ${({ fontcolor }) => fontcolor};
  }
  ${(props) => getBoxBorderCssStyle(props)}
`;
