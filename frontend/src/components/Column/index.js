import { Wrapper } from './styled';

function Column({ children, align, span, xl, lg, md, sm, xs, ...props }) {
  return (
    <Wrapper className="column" {...{ span, xl, lg, md, sm, xs, align }} {...props}>
      <div>{children}</div>
    </Wrapper>
  );
}
export default Column;
