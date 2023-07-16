import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {toast} from "react-toastify";
import RESULT_API from "../../api/resultAPI";

let createResultToast;
let deleteResultToast;

function downloadBlob(blob, name = 'file.txt') {
    if (
        window.navigator &&
        window.navigator.msSaveOrOpenBlob
    ) return window.navigator.msSaveOrOpenBlob(blob);

    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = data;
    link.download = name;

    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    setTimeout(() => {
        window.URL.revokeObjectURL(data);
        link.remove();
    }, 100);
}


export const getResults = createAsyncThunk(
    'results/get',
    async function (_, {rejectWithValue, dispatch}) {
        try {
            const accessToken = 'Bearer ' + localStorage.getItem('USSCHR-accessToken')
            let response = await fetch(RESULT_API.GET_RESULTS_URL, {
                method: 'get',
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

            response = await response.json();
            dispatch(setResults(response));

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createResult = createAsyncThunk(
    'result/create',
    async function (result, {rejectWithValue, dispatch}) {
        try {
            const accessToken = 'Bearer ' + localStorage.getItem('USSCHR-accessToken')
            let response = await fetch(RESULT_API.CREATE_RESULT_URL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken
                },
                body: JSON.stringify(result),
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
            dispatch(getResults());

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteResult = createAsyncThunk(
    'result/delete',
    async function (resultID, {rejectWithValue, dispatch}) {
        try {
            const accessToken = 'Bearer ' + localStorage.getItem('USSCHR-accessToken')
            let response = await fetch(RESULT_API.DELETE_RESULT_URL + "?id=" + resultID, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: accessToken
                }
            });

            if (!response.ok) {
                //alert("Username or password is incorrect");
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            dispatch(getResults());

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const downloadResult = createAsyncThunk(
    'results/download',
    async function (filters, {rejectWithValue, dispatch}) {
        try {
            const accessToken = 'Bearer ' + localStorage.getItem('USSCHR-accessToken')
            let response = await fetch(
                RESULT_API.DOWNLOAD_RESULTS_URL + "?Year=" + filters.year + "&Quarters=" + filters.quarter + "&DepartmentsId=" + filters.department,
                {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    `${response.status}${
                        response.statusText ? ' ' + response.statusText : ''
                    }`
                );
            }

            response = await response.blob();
            downloadBlob(response, 'Итоги за ' + filters.year + ' год.xlsx')

            return response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    results: [],
    isLoading: true,
};

const resultsSlice = createSlice({
    name: 'results',
    initialState: initialState,
    reducers: {
        setResults(state, action) {
            state.results = action.payload;
            state.isLoading = false;
        },
        removeResults(state) {
            state.results = []
            state.isLoading = true;
        }
    },
    extraReducers: {
        [createResult.pending]: (state, action) => {
            createResultToast = toast.loading("Добавляю итог...")
        },
        [createResult.fulfilled]: (state, action) => {
            toast.update(createResultToast,
                {
                    render: "Итог успешно добавлен",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [createResult.rejected]: (state, action) => {
            toast.update(createResultToast,
                {
                    render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        },
        [deleteResult.pending]: (state, action) => {
            deleteResultToast = toast.loading("Удаляю итог...")
        },
        [deleteResult.fulfilled]: (state, action) => {
            toast.update(deleteResultToast,
                {
                    render: "Итог успешно удалён",
                    type: "success",
                    isLoading: false,
                    autoClose: 4000,
                    hideProgressBar: false
                });
        },
        [deleteResult.rejected]: (state, action) => {
            toast.update(deleteResultToast,
                {
                    render: action.payload,
                    type: "error",
                    isLoading: false,
                    autoClose: 10000,
                }
            );
        }
    },
});
debugger;
export const {setResults, removeResults} = resultsSlice.actions;

export default resultsSlice.reducer;
