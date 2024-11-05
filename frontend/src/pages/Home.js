import { useState } from 'react';
import Column from 'components/Column';
import { Wrapper } from './styled';
import Card from 'components/Card';
import Config from './config';
import TranscriptDetail from './TranscriptDetail';
import VideoUploader from 'components/VideoUploader';
import VideoProvider, { useVideo } from 'provider/Video';

function HomeProvider() {
  return (
    <VideoProvider>
      <HomePage />
    </VideoProvider>
  );
}
function HomePage() {
  const [selectClip, setSelectedClip] = useState({});
  const { sections, addSection, updateSection, deleteClip } = useVideo();
  const onAdd = () => {
    addSection();
  };
  const onEdit = ({ id, ...value }) => {
    updateSection({ id, ...value });
  };

  const onDeleteClip = ({ sectionId, id }) => {
    deleteClip({ sectionId, id });
  };

  return (
    <Wrapper gutter={[16, 16]}>
      <Column md={12} sm={24} xs={24}>
        <Card title={<h2>{Config.leftColumn.title}</h2>}>
          {/* <PrimaryButton onClick={onAdd}>Add Section</PrimaryButton> */}
          <TranscriptDetail
            addTheSection={onAdd}
            selectClip={selectClip}
            setSelectedClip={setSelectedClip}
            sections={sections}
            setTheSection={onEdit}
            onDeleteClip={onDeleteClip}
          />
        </Card>
      </Column>
      <Column md={12} sm={24} xs={24}>
        <Card title={<h2>{Config.rightColumn.title}</h2>}>
          <VideoUploader selectClip={selectClip} />
        </Card>
      </Column>
    </Wrapper>
  );
}
export default HomeProvider;
