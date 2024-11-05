import { useEffect, useMemo, useRef, useState } from 'react';

import Subtitle from './Subtitle';
import Column from 'components/Column';

import { useVideo } from 'provider/Video';

import { Wrapper, ControlBarStyle } from './styled';
import { DefaultVideoId, UpdateTypes, VideoControllerTypes } from './define';
import { BackwardSvg, ForwardSvg, PauseSvg, PlaySvg } from 'assets';
import { FillNum } from 'utils/method';
import { findSelectedClipInVideoDuration } from './method';
import { message } from 'components/Message';
import { useLoading } from 'provider/Loading';

let mouseDown = false;
function CustomControlBar({ clips, videoId = '' }) {
  const [videoInfo, setVideoInfo] = useState({ currentTime: 0, duration: 0 });
  const [choseClip, setChoseClip] = useState({});
  const [action, setAction] = useState(VideoControllerTypes.PAUSE);
  const { setSelectClip } = useVideo();
  const onPlayAndPause = () => {
    const video = document.querySelector('#' + videoId);
    if (action === VideoControllerTypes.PLAY) {
      video.pause();
      setAction('pause');
    } else {
      video.play();
      setAction('play');
    }
  };
  const onBackward = () => {
    const video = document.querySelector('#' + videoId);
    if (videoInfo.currentTime > 0) {
      video.currentTime -= 10;
      const selectedClip = findSelectedClipInVideoDuration({ clips, video }) || {};
      setSelectClip(selectedClip);
    }
  };
  const onForward = () => {
    const video = document.querySelector('#' + videoId);
    if (videoInfo.currentTime < videoInfo.duration) {
      video.currentTime += 10;
      const selectedClip = findSelectedClipInVideoDuration({ clips, video }) || {};
      setSelectClip(selectedClip);
    }
  };

  const init = (choseClip) => {
    const video = document.querySelector('#' + videoId);
    setVideoInfo({ duration: video.duration, currentTime: video.currentTime });
    const selectedClip = findSelectedClipInVideoDuration({ clips, video }) || {};
    if (selectedClip.id !== choseClip.id) {
      const clipCards = document.querySelectorAll('.clip-card');
      if (clipCards) clipCards.forEach((clip) => clip.classList.remove('clip-card-selected'));
      const clips = document.querySelectorAll('.edit-square');
      if (clips) clips.forEach((clip) => clip.classList.remove('edit-square-selected'));
      choseClip = selectedClip;
      setChoseClip(selectedClip);
      const clip = document.querySelector('#clip-' + choseClip.id + ' .edit-square');
      if (clip) clip.classList.add('edit-square-selected');
      const clipCard = document.querySelector('#clip-card-edit-' + choseClip.id + ' .clip-card');
      if (clipCard) clipCard.classList.add('clip-card-selected');
    }
    return choseClip;
  };
  useEffect(() => {
    if (!videoId) return;
    const video = document.querySelector('#' + videoId);
    let choseClip = {};
    video.ontimeupdate = () => {
      choseClip = init(choseClip);
    };
    choseClip = init(choseClip);
  }, [videoId, clips]);

  return (
    <ControlBarStyle align="center">
      <Subtitle choseClip={choseClip} />
      <Column span={6}>
        <BackwardSvg onClick={onBackward} />
      </Column>
      <Column span={6}>
        <PlaySvg className={action === VideoControllerTypes.PAUSE ? '' : 'hidden'} onClick={onPlayAndPause} />
        <PauseSvg className={action === VideoControllerTypes.PLAY ? '' : 'hidden'} onClick={onPlayAndPause} />
      </Column>
      <Column span={6}>
        <ForwardSvg onClick={onForward} />
      </Column>
      <Column span={6}>
        <div className="time">
          {FillNum(Math.floor(videoInfo.currentTime / 60), 2)}:{FillNum(Math.floor(videoInfo.currentTime % 60), 2)} /
          {FillNum(Math.floor(videoInfo.duration / 60), 2)}:{FillNum(Math.floor(videoInfo.duration % 60), 2)}
        </div>
      </Column>
    </ControlBarStyle>
  );
}
function CustomProgress({ onChangeClip, onChangeVideo, videoId, clips = [] }) {
  const [selectedClip, setSelectedClip] = useState(null);
  const { selectClip, setSelectClip } = useVideo();

  const getEditSquareStyle = ({ minutes, seconds, duration }) => {
    const video = document.querySelector('#' + videoId);
    const progress = document.querySelector('.progress');
    const left = ((minutes * 60 + seconds) / video.duration) * progress.offsetWidth;
    const right = ((minutes * 60 + seconds + duration) / video.duration) * progress.offsetWidth;
    return { left: left + 'px', width: Math.ceil(right - left) + 'px', right: right + 'px' };
  };

  const onScrub = (e) => {
    const video = document.querySelector('#' + videoId);
    const progress = document.querySelector('.progress');
    const scrubTime = ((e.pageX - e.target.offsetLeft) / progress.offsetWidth) * video.duration;

    onChangeVideo({ currentTime: scrubTime });
  };

  const updateClipWidth = (e, { type, ...clip }) => {
    const temp = { ...clip };
    const video = document.querySelector('#' + videoId);

    if (type === UpdateTypes.LEFT) {
      if (video.currentTime >= clip.minutes * 60 + clip.seconds + clip.duration) {
        message.error('左區間不可超過右區間');
        return;
      }
      const prevClipIdx = clips.findIndex((c) => c.id === clip.id) - 1;
      const prevClip = clips[prevClipIdx];
      const videoTime =
        prevClip && prevClip.minutes * 60 + prevClip.seconds > video.currentTime
          ? prevClip.minutes * 60 + prevClip.seconds + 2
          : video.currentTime;

      const diff = Math.ceil(clip.minutes * 60 + clip.seconds - videoTime);
      temp.duration = Math.ceil(diff + clip.duration);
      temp.minutes = Math.floor(videoTime / 60);
      temp.seconds = Math.floor(videoTime % 60);
    } else {
      if (video.currentTime <= clip.minutes * 60 + clip.seconds) {
        message.error('右區間不可小於左區間');
        return;
      }
      const nextClipIdx = clips.findIndex((c) => c.id === clip.id) + 1;
      const nextClip = clips[nextClipIdx];
      const videoTime =
        nextClip && nextClip.minutes * 60 + nextClip.seconds < video.currentTime
          ? nextClip.minutes * 60 + nextClip.seconds - 2
          : video.currentTime;
      temp.duration = Math.floor(videoTime - clip.minutes * 60 - clip.seconds);
    }
    onChangeClip(temp);
  };

  return (
    <>
      <div
        aria-hidden="true"
        className="hidden progress"
        onMouseDown={() => {
          mouseDown = true;
        }}
      >
        {clips.map((clip) => (
          <div key={clip.id} id={'clip-' + clip.id}>
            <div
              aria-hidden="true"
              onMouseDown={() => {
                setSelectedClip({ ...clip, type: UpdateTypes.LEFT });
                setSelectClip(clip);
              }}
              className="left-border"
              style={{ left: getEditSquareStyle(clip).left }}
            />
            <div
              className={'edit-square ' + (selectClip?.id === clip.id ? 'edit-square-selected' : '')}
              style={getEditSquareStyle(clip)}
            />
            <div
              aria-hidden="true"
              onMouseDown={() => {
                setSelectedClip({ ...clip, type: UpdateTypes.RIGHT });
                setSelectClip(clip);
              }}
              className="right-border"
              style={{ left: getEditSquareStyle(clip).right }}
            />
          </div>
        ))}
      </div>
      <div
        aria-hidden="true"
        className="hide-progress"
        onClick={onScrub}
        onMouseDown={() => {
          mouseDown = true;
        }}
        onMouseMove={(e) => {
          mouseDown && onScrub(e);
        }}
        onMouseUp={(e) => {
          mouseDown = false;
          if (selectedClip) updateClipWidth(e, selectedClip);
          setSelectedClip(null);
        }}
      />
    </>
  );
}
function VideoUploader({}) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { sections, showClips, updateClip, getAIVideo, selectClip, setSelectClip } = useVideo();
  const { startLoading } = useLoading();
  let ref = useRef(null);

  const handleVideo = (e) => {
    const videoSrc = document.querySelector('#video-source');
    const videoTag = document.querySelector('#video-tag');
    const progress = document.querySelector('.progress');
    const controlBar = document.querySelector('#control-bar');
    const uploadButton = document.querySelector('#file-upload-btn');

    const file = e.target.files[0];

    var reader = new FileReader(); // instance of the FileReader
    reader.onload = function (e) {
      startLoading();
      console.log('loaded');
      videoSrc.src = e.target.result;
      videoTag.classList.remove('hidden');
      uploadButton.classList.add('hidden');

      videoTag.load();
      progress.classList.remove('hidden');
      controlBar.classList.remove('hidden');

      setTimeout(() => {
        const video = document.querySelector('#video-tag');
        getAIVideo(video);
        setVideoLoaded(true);
      }, 1500);
    }.bind(this);
    reader.readAsDataURL(file); // read the local file
  };

  const onUpload = (e) => {
    e.preventDefault();
    document.querySelector('#upload-input').click();
  };

  const updateClipWidth = (clip) => {
    updateClip(clip);
  };

  const clips = useMemo(
    () =>
      sections
        .map(({ id: sectionId, clips = [] }) =>
          clips.filter(({ id }) => showClips.includes(id)).map(({ id, ...v }) => ({ id, ...v, sectionId }))
        )
        .flat(),
    [sections, showClips]
  );

  const onChangeVideo = ({ currentTime }) => {
    if (currentTime) {
      const video = document.querySelector('#' + DefaultVideoId);
      video.currentTime = currentTime;
      const selectedClip = findSelectedClipInVideoDuration({ clips, video }) || {};
      setSelectClip(selectedClip);
    }
  };

  useEffect(() => {
    if (selectClip.id) {
      const video = document.querySelector('#' + DefaultVideoId);
      if (video) video.currentTime = selectClip.minutes * 60 + selectClip.seconds;
    }
  }, [selectClip]);

  useEffect(() => {
    ref.current.style.height = ref.current.clientWidth + 'px';
  }, []);

  return (
    <Wrapper>
      <input className="hidden" type="file" id="upload-input" name="upload" accept="video/*" onChange={handleVideo} />
      <button ref={ref} id="file-upload-btn" onClick={onUpload}>
        Click and Upload Video
      </button>
      <video className="hidden" width="100%" id="video-tag">
        <track default kind="captions" srcLang="en" src="SUBTITLE_PATH" />
        <source src="splashVideo" id="video-source" />
        Your browser does not support HTML5 video.
      </video>
      <div id="control-bar" className="hidden">
        <CustomControlBar clips={clips} videoId={videoLoaded ? DefaultVideoId : ''} />
      </div>
      <div>
        <CustomProgress
          clips={clips}
          videoId={videoLoaded ? DefaultVideoId : ''}
          onChangeVideo={onChangeVideo}
          onChangeClip={updateClipWidth}
        />
      </div>
    </Wrapper>
  );
}
export default VideoUploader;
