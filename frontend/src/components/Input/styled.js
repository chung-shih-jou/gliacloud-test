import styled from 'styled-components';
import palette from 'utils/palette';

export const Wrapper = styled.div`
  > .row {
    width: fit-content;
    background: white;
    padding: 4px;
    border-radius: 4px;
    border: 1px solid rgba(0, 0, 0, 0.02);
    &:hover,
    &:focus {
      border-color: ${palette.primary};
      box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
      outline: 0;
    }
  }
  input {
    border: 0;
    padding: 4px;
    background: transparent;
    &:hover,
    &:focus {
      border: 0;
    }
    &:focus-visible {
      outline: 0;
    }
  }
`;
