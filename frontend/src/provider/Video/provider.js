import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Context from './context';
import { CloneDeep } from 'utils/method';
import { GetAIParseVideo } from 'api/ai-video';
import { useLoading } from 'provider/Loading';

const DefaultClip = { minutes: 0, seconds: 15, duration: 15, text: 'Hello' };
const DefaultSection = {
  title: 'Section Title',
  clips: { [uuidv4()]: CloneDeep(DefaultClip) }
};

function Provider({ children }) {
  const [sections, setSections] = useState([]);
  const [selectClip, setSelectClip] = useState({});
  const [showClips, setShowClips] = useState([]);
  const { withLoading } = useLoading();

  const addSection = () => {
    const temp = CloneDeep(sections);
    temp.push({ id: uuidv4(), ...CloneDeep(DefaultSection) });
    setSections(temp);
  };

  const updateSection = ({ id, ...value }) => {
    const temp = [...sections];
    const idx = temp.findIndex((t) => t.id === id);
    temp[idx] = { id, ...value };
    temp[idx].clips = sections[idx].clips;
    setSections(temp);
  };

  const deleteSection = (id) => {
    const temp = [...sections];
    setSections(temp.filter((t) => t.id !== id));
  };

  const addClip = (sectionId) => {
    const temp = [...sections];
    const sectionIdx = temp.findIndex((t) => t.id === sectionId);
    temp[sectionIdx].clips.push = { id: uuidv4(), ...DefaultClip };
    setSections(temp);
  };

  const updateClip = ({ sectionId, id, ...value }) => {
    const temp = [...sections];
    const sectionIdx = temp.findIndex((t) => t.id === sectionId);
    const clipIdx = temp[sectionIdx].clips.findIndex((t) => t.id === id);
    temp[sectionIdx].clips[clipIdx] = { ...temp[sectionIdx].clips[clipIdx], ...value };
    setSections(temp);
  };

  const deleteClip = ({ sectionId, id }) => {
    const temp = [...sections];
    const sectionIdx = temp.findIndex((t) => t.id === sectionId);
    temp[sectionIdx].clips = temp[sectionIdx].clips.filter((t) => t.id !== id);
    setSections(temp);
  };

  const getAIVideo = async (file) => {
    const result = await withLoading(GetAIParseVideo(file));
    setShowClips(result.sections.map(({ clips = [] }) => clips.map(({ id }) => id)).flat());
    setSections(result.sections);
  };

  const toggleShowClips = (id) => {
    const tmp = [...showClips];
    if (showClips.includes(id)) setShowClips(tmp.filter((item) => item !== id));
    else setShowClips([...tmp, id]);
  };

  const value = {
    setSelectClip,
    selectClip,
    toggleShowClips,
    showClips,
    getAIVideo,
    sections,
    addSection,
    updateSection,
    deleteSection,
    addClip,
    updateClip,
    deleteClip
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default Provider;
