import {useSelector} from 'react-redux';

export function useTask() {
  return useSelector((state) => state.task);
}
