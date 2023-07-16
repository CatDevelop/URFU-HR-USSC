import { HOST } from './host';

export const CREATE_RESULT_URL = `${HOST}/result/`;
export const DELETE_RESULT_URL = `${HOST}/result`;
export const GET_RESULTS_URL = `${HOST}/result/all`;
export const DOWNLOAD_RESULTS_URL = `${HOST}/result/download`;

const RESULT_API = {
  CREATE_RESULT_URL,
  GET_RESULTS_URL,
  DOWNLOAD_RESULTS_URL,
  DELETE_RESULT_URL
};

export default RESULT_API;
