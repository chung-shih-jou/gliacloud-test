import { basename } from 'envConfig';
import mainRoutes from './main';

export { default as mainRoutes } from './main';

function addBasename(r) {
  const path = r.path === '/' ? '' : r.path;
  if (r.children) return { ...r, path: basename + path, children: r.children.map((c) => addBasename(c)) };
  else return { ...r, path: basename + path };
}
export const routes = [...mainRoutes].reduce((arr, r) => {
  arr.push(addBasename(r));
  return arr;
}, []);
