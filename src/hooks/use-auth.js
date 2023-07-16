import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../store/slices/userSlice';

export function useAuth() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const localUser = {
        accessToken: localStorage.getItem('USSCHR-accessToken'),
        email: localStorage.getItem('USSCHR-email'),
        id: localStorage.getItem('USSCHR-userId'),
        role: localStorage.getItem('USSCHR-role'),
        departmentID: localStorage.getItem('USSCHR-departmentID'),
    };

    if (
        localUser.accessToken &&
        localUser.email &&
        localUser.id &&
        localUser.role &&
        localUser.departmentID &&
        !user.accessToken
    ) {
        dispatch(setUser(localUser));
    }

    return {
        isAuth: !!user.accessToken,
        ...user,
    };
}
