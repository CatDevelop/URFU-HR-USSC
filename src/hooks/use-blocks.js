import {useSelector} from 'react-redux';

export function useBlocks() {
  return useSelector((state) => state.blocks);
}
