import Row from 'components/Row';
import { Wrapper } from './styled';

function Input({ suffix, ...props }) {
  return (
    <Wrapper>
      <Row align={'center'}>
        <input {...props} />
        {suffix}
      </Row>
    </Wrapper>
  );
}
export default Input;
