import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import USER_API from '../../api/userAPI';
import 'react-toastify/dist/ReactToastify.css';

export const getUsers = createAsyncThunk(
    'users/get',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(USER_API.GET_USERS_URL, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.json();
            dispatch(setUsers(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    users: [],
    isLoading: true,
};

const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsers(state, action) {
            console.log(action)
            state.users = action.payload.users;
            state.isLoading = false;
        },
        removeUsers(state) {
            state.users = [];
            state.isLoading = true;
        },
    },
    extraReducers: {

    },
});
debugger;
export const {setUsers, removeUsers} = usersSlice.actions;

export default usersSlice.reducer;
