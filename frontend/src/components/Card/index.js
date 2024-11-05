import Row from 'components/Row';
import { Wrapper } from './styled';
import Column from 'components/Column';

function Card({ className = '', title, children, border = true, extra }) {
  return (
    <Wrapper className={'card ' + className} border={border}>
      <Row>
        {title && (
          <Column span={16}>
            <h4>
              <b>{title}</b>
            </h4>
          </Column>
        )}
        {extra && (
          <Column align={'end'} span={8}>
            <span>{extra}</span>
          </Column>
        )}
      </Row>
      <span>{children}</span>
    </Wrapper>
  );
}
export default Card;
