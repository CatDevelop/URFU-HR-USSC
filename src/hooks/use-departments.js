import {useSelector} from 'react-redux';

export function useDepartments() {
  return useSelector((state) => state.departments);
}
