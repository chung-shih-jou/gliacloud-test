import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  min-width: 0;
  ${({ align }) => align && `align-items: ${align};`}
  ${({ gutter = [0, 0] }) =>
    gutter &&
    `
        margin-left: -${gutter[0] / 2}px;
        margin-right: -${gutter[1] / 2}px;
        gap: ${gutter[1] / 2}px 0; 
        .column{
            box-sizing: border-box;
            padding-left: ${gutter[0] / 2}px;
            padding-right: ${gutter[0] / 2}px;
            >div{
            padding: 8px ${gutter[1] / 2}px;
}
        }`}
`;
