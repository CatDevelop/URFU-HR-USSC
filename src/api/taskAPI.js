import { HOST } from './host';

export const GET_TASK_URL = `${HOST}/task/`;
export const GET_TASK_USER_URL = `${HOST}/user/`;
export const GET_TASK_HISTORY_URL = `${HOST}/history/`;
export const GET_ALL_TASKS_URL = `${HOST}/task/all/`;
export const CREATE_TASK_URL = `${HOST}/task`;
export const UPDATE_TASK_URL = `${HOST}/task`;
export const CHANGE_TASK_STATUS_URL = `${HOST}/task/change-status`;
export const SEND_TASK_TO_REVIEW_URL = `${HOST}/task/review`;
export const COMPLETE_TASK_URL = `${HOST}/task/complete`;
export const DOWNLOAD_TASKS_URL = `${HOST}/task/excel-file`;

const TASK_API = {
  GET_TASK_URL,
  CREATE_TASK_URL,
  GET_ALL_TASKS_URL,
  UPDATE_TASK_URL,
  GET_TASK_USER_URL,
  GET_TASK_HISTORY_URL,
  CHANGE_TASK_STATUS_URL,
  SEND_TASK_TO_REVIEW_URL,
  COMPLETE_TASK_URL,
  DOWNLOAD_TASKS_URL
};

export default TASK_API;
