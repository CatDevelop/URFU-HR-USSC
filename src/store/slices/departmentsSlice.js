import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';
import DEPARTMENTS_API from "../../api/departmentsAPI";
import {toast} from "react-toastify";


let createDepartmentNotify;

export const createDepartment = createAsyncThunk(
    'department/create',
    async function (payload, {rejectWithValue, dispatch}) {
        try {
            const accessToken = 'Bearer ' + localStorage.getItem('USSCHR-accessToken')
            let response = await fetch(DEPARTMENTS_API.CREATE_DEPARTMENT, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken
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

            response = await response.json();


            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getDepartments = createAsyncThunk(
    'departments/get',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            let response = await fetch(DEPARTMENTS_API.GET_DEPARTMENTS, {
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

            console.log(response)
            dispatch(setDepartments(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const initialState = {
    departments: [],
    isLoading: true,
};

const departmentsSlice = createSlice({
    name: 'departments',
    initialState: initialState,
    reducers: {
        setDepartments(state, action) {
            console.log(action)
            state.departments = action.payload;
            state.isLoading = false;
        },
        removeDepartments(state) {
            state.departaments = [];
            state.isLoading = true;
        },
    },
    extraReducers: {
        [createDepartment.pending]: (state, action) => {
            createDepartmentNotify = toast.loading("Добавляю отдел...")
        },
        [createDepartment.fulfilled]: (state, action) => {
            toast.update(createDepartmentNotify,
                {
                    render: "Отдел успешно добавлен!",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [createDepartment.rejected]: (state, action) => {
            toast.update(createDepartmentNotify,
                { render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
    },
});
debugger;
export const {setDepartments, removeDepartments} = departmentsSlice.actions;

export default departmentsSlice.reducer;
