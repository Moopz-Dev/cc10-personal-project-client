import { ACCESS_TOKEN, ROLE_TOKEN } from "../config/data";

const getToken = () => localStorage.getItem(ACCESS_TOKEN);
const setToken = value => localStorage.setItem(ACCESS_TOKEN, value);
const clearToken = () => localStorage.removeItem(ACCESS_TOKEN);

const getRole = () => localStorage.getItem(ROLE_TOKEN);
const setRole = value => localStorage.setItem(ROLE_TOKEN, value);
const clearRole = () => localStorage.removeItem(ROLE_TOKEN);

export { getToken, setToken, clearToken, getRole, setRole, clearRole };
