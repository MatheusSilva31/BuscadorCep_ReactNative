import axios from "axios";
import { deflate } from "zlib";

const api = axios.create({
    baseURL:'http://viacep.com.br/ws'
});

export default api;