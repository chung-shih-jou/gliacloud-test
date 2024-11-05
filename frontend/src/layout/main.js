import Header from 'components/Header';
import { Wrapper } from './styled';

function MainLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}
export default MainLayout;
