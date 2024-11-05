## Introduce the product

- Upload Ur Video and Get Mock AI response of Transcript and highlight clips.
- Also you can edit ur Title of each sections when hover to it.
- Select which clips u want to display on video subtitle when u check the checkbox.
- Edit the highlight clip length on control bar under the video.
- When u see the video, the selected clip will be tracked and subtitle will display on video.

## Design pattern and Architecture

### Design pattern

- There are many components use clips like selected clip, show clip or not, update clip length, thus context is the choice. Not redux, cus context is simplified version of redux and the project size is small.
- React is the framework with styled-componented and css. There is only index.css for global components. Styled-componented is for customized components, it compile with complex class name for different components with same class name without interacting each other.
- eslint and prettier for part of clean code
- All components are made by self, like buttons, card, grid, loading, video-uploader.

### Architecture

- Components folder for common components.
- Pages for the routes, it only have one page, thus it doesn't have route folder for page.
- The customized components only under the pages and used Upper-Camel-Case.
- styled.js save components' style by styled-componenet
- config.js save page controller data, different between define.js which save literally.
- Provider folder save Loading and Video context, provider. If there has Menu, Autherize in the future, it can be extended.
- envConfig.js save enviroment data.

## Getting Started with Installing module

### `yarn install`

### add .env follow .env-example file

- If there is no apiHost, the mock api will call when upload video in local frontend.
