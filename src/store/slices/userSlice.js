import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import USER_API from '../../api/userAPI';
import jwt from 'jwt-decode'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let loginNotify;
let registrationNotify;
let createUserNotify;
let deleteUserNotify;
let changePasswordNotify;


export const checkInvitation = createAsyncThunk(
    'user/checkInvitation',
    async function (userID, {rejectWithValue, dispatch}) {
        try {

            let response = await fetch(USER_API.CHECK_INVITATION_URL + userID, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                dispatch(setInviteStatus({isInvite: false}));
            }

            response = await response.json();

            console.log(response)
            dispatch(setInviteStatus(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signInUser = createAsyncThunk(
    'user/signIn',
    async function (user, {rejectWithValue, dispatch}) {
        try {

            let response = await fetch(USER_API.SIGN_IN_USER_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                if (response.status === 401)
                    throw new Error("Неверный логин или пароль");
                else
                    throw new Error("Ошибка сервера");
            }

            response = await response.json();

            console.log(response)
            dispatch(setUser({accessToken: response.accessToken, email: user.email}));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getUserName = createAsyncThunk(
    'user/get/name',
    async function (userID, {rejectWithValue, dispatch}) {
        try {

            let response = await fetch(USER_API.GET_USER_URL + "/" + userID, {
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

            dispatch(setUserName(response));
            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createUser = createAsyncThunk(
    'user/createUser',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
            let response = await fetch(USER_API.CREATE_USER_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken
                },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.text();
            console.log(response)

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/delete',
    async function (userID, {rejectWithValue, dispatch}) {
        try {
            const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
            let response = await fetch(USER_API.DELETE_USER_URL + userID, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken
                }
            });

            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const recoveryUserPassword = createAsyncThunk(
    'user/sendRecovery',
    async function (email, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(USER_API.SEND_RECOVERY_PASSWORD_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(email),
            });

            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const changeUserPassword = createAsyncThunk(
    'user/changePassword',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(USER_API.CHANGE_PASSWORD_URL + payload.userID, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signUpUser = createAsyncThunk(
    'user/signUp',
    async function (user, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(USER_API.SIGN_UP_USER_URL + '?userId=' + user.userId, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            debugger;
            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    id: null,
    email: null,
    accessToken: null,
    departmentID: null,
    role: null,
    name: null,
    surname: null,
    patronymic: null,

    inviteStatus: false,
    status: null,
    error: null,
    isLoading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            console.log(action)
            console.log(jwt(action.payload.accessToken))
            state.email = action.payload.email;
            state.accessToken = action.payload.accessToken;
            state.id = jwt(action.payload.accessToken).userId;
            state.role = jwt(action.payload.accessToken)["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"][0];
            state.departmentID = parseInt(jwt(action.payload.accessToken).DepartmentId);

            localStorage.setItem('USSCHR-accessToken', action.payload.accessToken);
            localStorage.setItem('USSCHR-userId', state.id);
            localStorage.setItem('USSCHR-email', action.payload.email);
            localStorage.setItem('USSCHR-departmentID', state.departmentID);
            localStorage.setItem('USSCHR-role', state.role);
            state.isLoading = false
        },
        setUserName(state, action) {
            state.name = action.payload.name;
            state.surname = action.payload.surname;
            state.patronymic = action.payload.patronymic;
        },
        setInviteStatus(state, action) {
            state.inviteStatus = action.payload.isInvite;
            state.isLoading = false
        },
        removeUser(state) {
            state.id = null;
            state.email = null;
            state.accessToken = null;
            state.departmentID = null;
            state.role = null;
            localStorage.removeItem('USSCHR-accessToken');
            localStorage.removeItem('USSCHR-userId');
            localStorage.removeItem('USSCHR-email');
            localStorage.removeItem('USSCHR-departmentID');
            localStorage.removeItem('USSCHR-role');
            state.isLoading = true
        },
    },
    extraReducers: {
        [signUpUser.pending]: (state, action) => {
            registrationNotify = toast.loading("Регистрирую пользователя...")
        },
        [signUpUser.fulfilled]: (state, action) => {
            toast.update(registrationNotify,
                {
                    render: "Вы успешно зарегистрировались!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [signUpUser.rejected]: (state, action) => {
            toast.update(registrationNotify,
                {
                    render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [createUser.pending]: (state, action) => {
            createUserNotify = toast.loading("Отправляю приглашение пользователю...")
        },
        [createUser.fulfilled]: (state, action) => {
            toast.update(createUserNotify,
                {
                    render: "Приглашение успешно отправлено!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [createUser.rejected]: (state, action) => {
            toast.update(createUserNotify,
                {
                    render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [signInUser.pending]: (state, action) => {
            loginNotify = toast.loading("Вхожу в систему...")
        },
        [signInUser.fulfilled]: (state, action) => {
            toast.update(loginNotify,
                {
                    render: "Вы успешно вошли в систему",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [signInUser.rejected]: (state, action) => {
            toast.update(loginNotify,
                {
                    render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },

        [deleteUser.pending]: (state, action) => {
            deleteUserNotify = toast.loading("Аннулирую приглашение...")
        },
        [deleteUser.fulfilled]: (state, action) => {
            toast.update(deleteUserNotify,
                {
                    render: "Приглашение успешно аннулировано!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [deleteUser.rejected]: (state, action) => {
            toast.update(deleteUserNotify,
                {
                    render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [changeUserPassword.pending]: (state, action) => {
            changePasswordNotify = toast.loading("Изменяю пароль...")
        },
        [changeUserPassword.fulfilled]: (state, action) => {
            toast.update(changePasswordNotify,
                {
                    render: "Пароль успешно изменён!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [changeUserPassword.rejected]: (state, action) => {
            toast.update(changePasswordNotify,
                {
                    render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
    },
});
debugger;
export const {setInviteStatus, setUser, removeUser, setUserName} = userSlice.actions;

export default userSlice.reducer;
