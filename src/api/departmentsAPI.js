import { HOST } from './host';

export const GET_DEPARTMENTS = `${HOST}/departament/all`;
export const CREATE_DEPARTMENT = `${HOST}/departament/with-boss-id`;

const DEPARTMENTS_API = {
  GET_DEPARTMENTS,
  CREATE_DEPARTMENT
};

export default DEPARTMENTS_API;
