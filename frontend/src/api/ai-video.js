import axios from 'axios';
import { apiHost } from 'envConfig';
import { getAiMockData } from 'mock/ai-video';
import { SaveJsonParse } from 'utils/method';

export const GetAIParseVideo = async (file) => {
  const duration = file.duration;
  if (!apiHost) {
    const res = new Promise((resolve) => {
      setTimeout(() => {
        resolve(getAiMockData(file));
      }),
        1000;
    });
    return SaveJsonParse(res.data);
  }
  const res = await axios.post(apiHost + '/ai-video', { file: { duration } });

  return res.data;
};
