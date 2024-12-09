import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_LINK,
});
export const DOMAIN = process.env.REACT_APP_BACKEND_LINK;

export default request;
