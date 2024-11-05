import { Icon, Status, color } from './status';
import './style.css';
export const message = {
  error: (text, duration) => Message({ text, status: Status.ERROR, duration }),
  info: (text, duration) => Message({ text, status: Status.INFO, duration }),
  warning: (text, duration) => Message({ text, status: Status.WARNING, duration }),
  success: (text, duration) => Message({ text, status: Status.SUCCESS, duration })
};

function Message({ text, status, duration = 3000 }) {
  const messageDom = document.createElement('div');
  messageDom.id = 'message';
  messageDom.className = `appear`;
  messageDom.style = `color: ${color[status]};`;
  messageDom.innerHTML = `
  <div><div>${Icon[status]}</div><div style="color: initial;">${text}<div/></div>
    `;

  document.getElementsByTagName('body')[0].appendChild(messageDom);
  setTimeout(() => {
    const messageDom = document.getElementById('message');
    messageDom.className = 'disappear';
    setTimeout(() => {
      document.getElementsByTagName('body')[0].removeChild(messageDom);
    }, 100);
  }, duration);
}
