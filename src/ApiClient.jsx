import axios from "axios";
import config from "./config";

const instance = axios.create({
    baseURL: 'http://localhost:4000/user',
});

export default instance;