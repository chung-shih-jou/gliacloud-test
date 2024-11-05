export function findSelectedClipInVideoDuration({ clips, video }) {
  return clips.find(
    (clip) =>
      video.currentTime >= clip.minutes * 60 + clip.seconds &&
      video.currentTime <= clip.minutes * 60 + clip.seconds + clip.duration
  );
}
