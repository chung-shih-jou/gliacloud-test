import { useContext } from 'react';
import Context from './context';
export { default } from './provider';

export function useVideo() {
  return useContext(Context);
}
