import Row from 'components/Row';
import Column from 'components/Column';

import { LogoSvg } from 'assets';
import { Wrapper } from './styled';

function Header() {
  // const { toggle } = useSideMenu();
  // const onClickMenu = () => {
  //     toggle(MenuTypes.SIDE_MENU);
  // };
  return (
    <Wrapper>
      <Row align={'center'} gutter={[64, 64]}>
        <Column md={4} sm={8} xs={8}>
          <LogoSvg />
        </Column>
        <Column md={20} sm={16} xs={16} align={'start'}>
          <h1>GliaCloud Frontend Test</h1>
        </Column>
      </Row>
    </Wrapper>
  );
}
export default Header;
