import { HOST } from './host';

export const GET_BLOCKS = `${HOST}/block/all`;
export const CREATE_BLOCK = `${HOST}/block/create`;
export const EDIT_BLOCK = `${HOST}/block/edit`;
export const DELETE_BLOCK = `${HOST}/block/`;

const BLOCKS_API = {
  GET_BLOCKS,
  CREATE_BLOCK,
  EDIT_BLOCK,
  DELETE_BLOCK
};

export default BLOCKS_API;
