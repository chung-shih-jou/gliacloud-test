import { Wrapper } from './styled';

function Row({ children, align, gutter = [0, 0], ...props }) {
  return (
    <Wrapper className="row" align={align} gutter={gutter} {...props}>
      {children}
    </Wrapper>
  );
}
export default Row;
