import Card from 'components/Card';
import Input from 'components/Input';
import { useState } from 'react';
import { FillNum } from 'utils/method';
import { TranscriptDetailStyle } from './styled';
import { PrimaryButton } from 'components/Buttons';
import { useVideo } from 'provider/Video';
import Row from 'components/Row';
import Column from 'components/Column';
import { CheckboxSvg, UncheckboxSvg } from 'assets';

function ClipCard({ onDelete, sectionId, clips = [] }) {
  const { selectClip, setSelectClip, showClips, toggleShowClips } = useVideo();
  const onEdit = (e, clip) => {
    e.preventDefault();
    setSelectClip(clip);
  };

  const onToggleClips = (e, clipId) => {
    e.preventDefault();
    toggleShowClips(clipId);
  };

  return (
    <div>
      {clips.map((clip) => (
        <Row
          id={'clip-card-edit-' + clip.id}
          className={'clip-card-wrapper'}
          key={'clip-card-' + clip.id}
          aria-hidden="true"
          onClick={(e) => onEdit(e, clip)}
          align="center"
        >
          <Column aria-hidden="true" span={2} onClick={(e) => onToggleClips(e, clip.id)}>
            <CheckboxSvg className={showClips.includes(clip.id) ? '' : 'hidden'} />
            <UncheckboxSvg className={showClips.includes(clip.id) ? 'hidden' : ''} />
          </Column>
          <Column align="start" span={20}>
            <Card
              checkable={true}
              border={false}
              className={'clip-card ' + (selectClip.id === clip.id ? 'clip-card-selected' : '')}
            >
              <Row>
                <Column span={24}>
                  <span className="clip-times">
                    {FillNum(clip.minutes, 2)}:{FillNum(clip.seconds, 2)}-
                    {FillNum(Math.floor((clip.minutes * 60 + clip.seconds + clip.duration) / 60), 2)}:
                    {FillNum((clip.seconds + clip.duration) % 60, 2)}
                  </span>{' '}
                  <span className="clip-text">{clip.text}</span>
                </Column>
                {/* <Column md={4} smm={8} xs={12} align="end">
                  <PrimaryButton onClick={() => onDelete({ sectionId, id: clip.id })}>Delete</PrimaryButton>
                </Column> */}
              </Row>
            </Card>
          </Column>
        </Row>
      ))}
      {/* <PrimaryButton className="add-clip-btn" dashed block onClick={onAdd} type={ButtonTypes.LIGHT_PRIMARY}>
        + Add
      </PrimaryButton> */}
    </div>
  );
}

function SectionCard({ onDeleteClip, setTheSection, sections = [] }) {
  const [editSection, setEditSection] = useState({});
  const onEdit = (e, id) => {
    e.preventDefault();
    const section = sections.find((s) => s.id === id);
    if (section) setEditSection({ id, origin: section.title, text: section.title });
  };
  const onBlur = (e) => {
    e.preventDefault();
    setEditSection({});
    if (!!editSection.text) setTheSection({ id: editSection.id, title: editSection.text });
  };
  const onChange = (e) => {
    setEditSection({ ...editSection, text: e.target.value });
  };
  return sections.map(({ id, title, clips }) => (
    <Card
      className="section-card"
      border={false}
      key={'section-' + id}
      title={
        <div className="edit-input" aria-hidden="true" onClick={(e) => onEdit(e, id)}>
          {editSection.id === id ? <Input onBlur={onBlur} onChange={onChange} value={editSection.text} /> : title}
        </div>
      }
    >
      <ClipCard onDelete={onDeleteClip} sectionId={id} clips={clips} />
    </Card>
  ));
}
function TranscriptDetail({ onDeleteClip, sections, setTheSection }) {
  return (
    <TranscriptDetailStyle className="transcript-detail">
      <SectionCard onDeleteClip={onDeleteClip} sections={sections} setTheSection={setTheSection} />
    </TranscriptDetailStyle>
  );
}
export default TranscriptDetail;
