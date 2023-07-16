import { HOST } from './host';

export const SIGN_IN_USER_URL = `${HOST}/authorize/signin`;
export const CREATE_USER_URL = `${HOST}/authorize/createUser`;
export const DELETE_USER_URL = `${HOST}/user/`;
export const SIGN_UP_USER_URL = `${HOST}/authorize/register`;
export const GET_USER_URL = `${HOST}/user`;
export const GET_USERS_URL = `${HOST}/user/all`;
export const SEND_RECOVERY_PASSWORD_URL = `${HOST}/changepassword/start`;
export const CHECK_INVITATION_URL = `${HOST}/authorize/check-invite/`;
export const CHANGE_PASSWORD_URL = `${HOST}/changepassword/`;

const USER_API = {
  SIGN_IN_USER_URL,
  CREATE_USER_URL,
  SIGN_UP_USER_URL,
  GET_USER_URL,
  GET_USERS_URL,
  DELETE_USER_URL,
  SEND_RECOVERY_PASSWORD_URL,
  CHECK_INVITATION_URL,
  CHANGE_PASSWORD_URL
};

export default USER_API;
