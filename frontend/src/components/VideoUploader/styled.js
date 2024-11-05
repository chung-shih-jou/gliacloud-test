import styled from 'styled-components';

import { Wrapper as Row } from 'components/Row/styled';
import palette from 'utils/palette';

export const Wrapper = styled.div`
  height: 100%;
  text-align: center;
  button[type='text'] {
    background: transparent;
    border: 0;
  }
  button {
    background: ${palette.header};
    border-radius: 4px;
    padding: 8px 16px;
    border: 0;
    cursor: pointer;
  }
  .reset-btn-wrapper {
    float: right;
  }
  #file-upload-btn {
    width: 50%;
    background: black;
    color: white;
    font-size: 20px;
  }
  .progress,
  .hide-progress {
    width: 100%;
    height: 20px;
    border-radius: 4px;
    position: relative;
    background-color: #e4e4e4;
  }
  .hide-progress {
    position: relative;
    background-color: transparent;
    top: -20px;
  }
  .left-border,
  .right-border {
    position: absolute;
    width: 4px;
    background: ${palette.primary};
    height: 110%;
    border-radius: 4px;
    top: -5%;
    z-index: 2;
    &:hover {
      cursor: pointer;
      scale: 1.4;
    }
  }
  .clip-text {
    position: relative;
    top: -60px;
    width: 100%;
    margin-bottom: -40px;
  }
  .edit-square {
    position: absolute;
    top: 0;
    background-color: ${palette.primary};
    opacity: 0.5;
    height: 100%;
  }
  .edit-square-selected {
    opacity: 0.8;
  }
`;

export const ControlBarStyle = styled(Row)`
  font-size: 24px;
  .time {
    font-size: 12px;
  }
  svg {
    cursor: pointer;
    &:hover {
      scale: 1.2;
    }
  }
`;
