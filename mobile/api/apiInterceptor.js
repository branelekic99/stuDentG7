import api from "./api";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ASYNC_STORAGE_KEY = "stu_dent";

const interceptor = store =>{
    api.interceptors.request.use(config=>{
        const token = AsyncStorage.getItem(ASYNC_STORAGE_KEY);
        config.headers['x-access-token'] = token;
        return config;
    })
    api.interceptors.response.use(response => {
        return response;
    }, error => {

        // if (error.response && error.response.status === HttpResponseStatus.UNAUTHORIZED) {
        //   store.dispatch(handleUserNotAuthorized());
        // }
        return Promise.reject(error);
    });
};

export default {interceptor};