import styled from 'styled-components';

import { Wrapper as Row } from 'components/Row/styled';
import palette from 'utils/palette';

export const Wrapper = styled(Row)`
  background-color: #e4e4e4;

  h4 h2,
  h4 {
    margin: 0;
  }
  .card {
    box-shadow: none;
  }

  @media (min-width: 768px) {
    > .column > div > .card {
      height: calc(80vh);
      overflow: scroll;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
  > .column:first-child {
    > .card {
      background-color: #d4d4d4;
    }
  }
  > .column:nth-child(2) {
    background-color: #514e4e;
    color: white;
  }
`;

export const TranscriptDetailStyle = styled.div`
  .clip-times {
    font-size: 12px;
    color: ${palette.primary};
    font-weight: bold;
  }
  .clip-text {
    font-weight: bold;
  }
  .clip-card-wrapper + .clip-card-wrapper,
  .clip-card-wrapper + .add-clip-btn,
  .section-card + .add-section-btn {
    margin-top: 8px;
  }

  .clip-card.clip-card-selected,
  .clip-card.clip-card-selected .clip-times {
    background-color: ${palette.primary};
    color: white;
  }
  .clip-card {
    background-color: white;
  }
  .clip-card,
  .section-card {
    padding: 8px;
    box-shadow: none;
  }
  .section-card.card {
    padding: 0;
  }
  .edit-input:hover {
    cusor: pointer;
    font-size: 1.2em;
  }
`;
