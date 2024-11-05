# GliaCloud-test

GliaCloud-test is deploied on Firebase.

It's the AI tool to help user create highlight clips from uploaded videos and add transcsripts to these clips.

## 2. Key Features

### 2.1 Video Upload

- Users can upload video files

### 2.2 Mock AI Processing

- Use a mock API to simulate AI processing
- The mock API should return:
- Full video transcript
- Transcript split into sections
- Titles for each section
- Suggested highlight sentences
- All this data should be in JSON format

### 2.3 User Interface

#### 2.3.1 Layout

- Split screen design:
- Left side: Editing area
- Right side: Preview area

#### 2.3.2 Editing Area (Left)

- Shows the transcript with:
- Section titles
- Sentences and their timestamps
- Users can select or unselect sentences for the highlight clip
- Clickable timestamps for easy navigation
- Auto-scrolls to follow preview playback

#### 2.3.3 Preview Area (Right)

- Shows the edited highlight clip, not the original video
- Video player with standard controls (play, pause, seek)
- Displays selected transcript text overlaid on the video
- Timeline showing selected highlights
- Smooth transition between selected clips

#### 2.3.4 Synchronization

- Editing Area to Preview Area:
- Clicking a timestamp updates the preview timeline to that time
- Selecting/unselecting sentences updates the preview content
- Preview Area to Editing Area:
- During playback, the current sentence is highlighted in the editing area
- The editing area automatically scrolls to keep the current sentence visible

### 2.4 Transcript Overlay

- Selected sentences appear as text overlay on the video in the preview area
- Text timing matches the audio of the selected clip
